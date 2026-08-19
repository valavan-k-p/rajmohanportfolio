import { type NextRequest } from 'next/server';
import { requestOtpSchema } from '@/lib/queries/schema';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { clientIp, rateLimit, RULES } from '@/lib/security/rate-limit';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/config/env';
import { fail, failInternal, ok } from '@/lib/api/respond';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/otp/request — send a citizen an OTP.
 *
 * Order matters and is deliberate (spec §21):
 *   validate -> Turnstile -> rate limit -> Supabase
 *
 * Turnstile runs before rate limiting so bot traffic is rejected without
 * consuming a real user's budget, and both run before Supabase so neither an
 * SMS nor a database write is ever triggered by an unverified request.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail('VALIDATION_FAILED');
  }

  const parsed = requestOtpSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.') || 'form';
      fields[key] ??= issue.message;
    }
    return fail('VALIDATION_FAILED', { fields });
  }

  const { phone, turnstileToken } = parsed.data;
  const ip = clientIp(request.headers);

  const turnstile = await verifyTurnstile(turnstileToken, ip);
  if (!turnstile.success) return fail('TURNSTILE_FAILED');

  // Per-phone protects the phone's owner from being harassed with SMS.
  // Per-IP protects the SMS budget from a single abusive source.
  const perPhone = await rateLimit(`otp:req:phone:${phone}`, RULES.otpRequestPerPhone);
  if (!perPhone.allowed) {
    return fail('RATE_LIMITED', { retryAfterSeconds: perPhone.retryAfterSeconds });
  }

  const perIp = await rateLimit(`otp:req:ip:${ip}`, RULES.otpRequestPerIp);
  if (!perIp.allowed) {
    return fail('RATE_LIMITED', { retryAfterSeconds: perIp.retryAfterSeconds });
  }

  if (!isSupabaseConfigured) return fail('SERVICE_UNAVAILABLE');

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { shouldCreateUser: true },
    });

    if (error) {
      // The provider's message can reveal whether a number is registered.
      // Log it; return an opaque failure.
      return failInternal('otp/request', error);
    }

    // Deliberately does NOT confirm whether the number is new or returning —
    // that distinction is an account-enumeration oracle.
    return ok({ sent: true, expiresInSeconds: 300 });
  } catch (cause) {
    return failInternal('otp/request', cause);
  }
}
