import 'server-only';

/**
 * Rate limiting for public endpoints (spec §18, §21).
 *
 * Cloudflare provides the first tier at the edge. This is the origin-level
 * backstop that survives a direct-to-origin request, and it is what enforces
 * the per-phone OTP limits that Cloudflare cannot see.
 *
 * Storage is in-memory. That is correct for a single instance and INSUFFICIENT
 * for the three-instance EC2 fleet in PDF §13 — each instance would keep its
 * own counters, tripling the effective limit. The interface is deliberately
 * async so a shared store can replace the map without touching call sites.
 * Tracked in docs/PHASE-19-QA.md.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Evict expired buckets so the map cannot grow without bound. */
function sweep(now: number): void {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitRule {
  readonly limit: number;
  readonly windowMs: number;
}

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly retryAfterSeconds: number;
}

export const RULES = {
  /** Sending an OTP costs money and can be used to harass a phone owner. */
  otpRequestPerPhone: { limit: 3, windowMs: 15 * 60 * 1000 },
  otpRequestPerIp: { limit: 10, windowMs: 15 * 60 * 1000 },
  /** Guessing a 6-digit code must be impractical. */
  otpVerifyPerPhone: { limit: 5, windowMs: 15 * 60 * 1000 },
  querySubmitPerUser: { limit: 10, windowMs: 60 * 60 * 1000 },
  /** The tracker is unauthenticated, so it is the easiest thing to enumerate. */
  trackPerIp: { limit: 20, windowMs: 15 * 60 * 1000 },
} as const satisfies Record<string, RateLimitRule>;

export async function rateLimit(
  key: string,
  rule: RateLimitRule,
  now: number = Date.now(),
): Promise<RateLimitResult> {
  sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + rule.windowMs });
    return { allowed: true, remaining: rule.limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= rule.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: rule.limit - existing.count,
    retryAfterSeconds: 0,
  };
}

/** Test seam — never call from request paths. */
export function __resetRateLimits(): void {
  buckets.clear();
}

/**
 * Client IP behind Cloudflare then ALB. CF-Connecting-IP is the only header
 * of these that Cloudflare guarantees it overwrites, so it is preferred;
 * x-forwarded-for is a fallback and its LAST entry is the one added by the
 * closest trusted proxy.
 */
export function clientIp(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf;

  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',').map((p) => p.trim()).filter(Boolean);
    return parts[parts.length - 1] ?? 'unknown';
  }

  return 'unknown';
}
