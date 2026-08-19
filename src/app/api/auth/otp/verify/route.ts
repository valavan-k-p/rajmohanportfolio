import { type NextRequest } from 'next/server';
import { verifyOtpSchema } from '@/lib/queries/schema';
import { clientIp, rateLimit, RULES } from '@/lib/security/rate-limit';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/config/env';
import { fail, failInternal, ok } from '@/lib/api/respond';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/otp/verify — exchange a code for a session.
 *
 * Rate limited per phone at 5 attempts / 15 min. A 6-digit code has a million
 * possibilities, so unlimited guessing would be brute-forceable in minutes;
 * this makes it impractical without locking a legitimate user out for long.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail('VALIDATION_FAILED');
  }

  const parsed = verifyOtpSchema.safeParse(body);
  if (!parsed.success) return fail('VALIDATION_FAILED');

  const { phone, code } = parsed.data;
  const ip = clientIp(request.headers);

  const attempts = await rateLimit(`otp:verify:${phone}`, RULES.otpVerifyPerPhone);
  if (!attempts.allowed) {
    return fail('OTP_TOO_MANY_ATTEMPTS', { retryAfterSeconds: attempts.retryAfterSeconds });
  }

  void ip;
  if (!isSupabaseConfigured) return fail('SERVICE_UNAVAILABLE');

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({ phone, token: code, type: 'sms' });

    if (error) {
      // Distinguish expiry from a wrong code: the citizen needs to know whether
      // to re-enter or request a new one. Neither reveals anything useful to an
      // attacker, who already knows the code they sent was wrong.
      const message = error.message.toLowerCase();
      if (message.includes('expired')) return fail('OTP_EXPIRED');
      return fail('OTP_INVALID');
    }

    if (!data.session) return fail('OTP_INVALID');

    // Ensure a citizen profile exists. Idempotent — verifying again is safe.
    const { error: profileError } = await supabase
      .from('citizen_profiles')
      .upsert({ id: data.session.user.id, phone }, { onConflict: 'id' });

    if (profileError) return failInternal('otp/verify:profile', profileError);

    return ok({ verified: true });
  } catch (cause) {
    return failInternal('otp/verify', cause);
  }
}
