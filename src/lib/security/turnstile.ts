import 'server-only';
import { env } from '@/config/env';

/**
 * Cloudflare Turnstile server-side verification (spec §18, §21).
 *
 * The browser widget produces a token; it proves nothing until the SERVER
 * exchanges it with Cloudflare. Trusting the token's presence — a common
 * shortcut — is equivalent to having no bot protection at all, because an
 * attacker posting directly to the API simply sends any string.
 */

const VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export interface TurnstileResult {
  readonly success: boolean;
  readonly reason?: string;
}

export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<TurnstileResult> {
  if (!env.TURNSTILE_SECRET_KEY) {
    // Development without Turnstile configured. Never permitted in production —
    // assertRuntimeEnv() refuses to boot without the secret.
    if (process.env.NODE_ENV === 'production') {
      return { success: false, reason: 'turnstile-not-configured' };
    }
    return { success: true, reason: 'development-bypass' };
  }

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (remoteIp && remoteIp !== 'unknown') body.set('remoteip', remoteIp);

  try {
    const response = await fetch(VERIFY_ENDPOINT, {
      method: 'POST',
      body,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return { success: false, reason: 'turnstile-unreachable' };

    const data = (await response.json()) as {
      success: boolean;
      'error-codes'?: string[];
    };

    return data.success
      ? { success: true }
      : { success: false, reason: data['error-codes']?.join(',') ?? 'rejected' };
  } catch {
    // Fail CLOSED. An unreachable verifier must not become an open door.
    return { success: false, reason: 'turnstile-error' };
  }
}
