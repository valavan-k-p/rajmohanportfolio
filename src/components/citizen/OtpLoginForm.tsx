'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Citizen OTP login (spec §13, §16, §29).
 *
 * Every state the spec enumerates is a real, designed state rather than a
 * spinner: idle, sending, sent, verifying, expired, invalid, too-many-attempts,
 * rate-limited, offline, success.
 *
 * Accessibility (MASTER.md §7):
 *  - errors are announced through a single aria-live region
 *  - the OTP field is one input with `one-time-code` autocomplete, so iOS and
 *    Android autofill work; six separate boxes break autofill and are a known
 *    screen-reader trap
 *  - the resend countdown is announced politely, not on every tick
 */

type Phase = 'phone' | 'code' | 'done';

type ErrorCode =
  | 'VALIDATION_FAILED'
  | 'TURNSTILE_FAILED'
  | 'RATE_LIMITED'
  | 'OTP_INVALID'
  | 'OTP_EXPIRED'
  | 'OTP_TOO_MANY_ATTEMPTS'
  | 'SERVICE_UNAVAILABLE'
  | 'OFFLINE'
  | 'INTERNAL';

const MESSAGES: Record<ErrorCode, { en: string; ta: string }> = {
  VALIDATION_FAILED: {
    en: 'Check the details you entered.',
    ta: 'நீங்கள் உள்ளிட்ட விவரங்களைச் சரிபார்க்கவும்.',
  },
  TURNSTILE_FAILED: {
    en: 'Verification failed. Refresh the page and try again.',
    ta: 'சரிபார்ப்பு தோல்வியடைந்தது. பக்கத்தைப் புதுப்பித்து மீண்டும் முயற்சிக்கவும்.',
  },
  RATE_LIMITED: {
    en: 'Too many requests. Please wait before trying again.',
    ta: 'அதிக கோரிக்கைகள். மீண்டும் முயற்சிக்க முன் காத்திருக்கவும்.',
  },
  OTP_INVALID: {
    en: 'That code is not correct. Check it and try again.',
    ta: 'அந்தக் குறியீடு சரியில்லை. சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
  },
  OTP_EXPIRED: {
    en: 'That code has expired. Request a new one.',
    ta: 'அந்தக் குறியீட்டின் காலம் முடிந்தது. புதியதைக் கோரவும்.',
  },
  OTP_TOO_MANY_ATTEMPTS: {
    en: 'Too many incorrect attempts. Please wait before trying again.',
    ta: 'பல தவறான முயற்சிகள். மீண்டும் முயற்சிக்க முன் காத்திருக்கவும்.',
  },
  SERVICE_UNAVAILABLE: {
    en: 'This service is not available right now. Please try again later.',
    ta: 'இந்தச் சேவை தற்போது கிடைக்கவில்லை. பின்னர் முயற்சிக்கவும்.',
  },
  OFFLINE: {
    en: 'You appear to be offline. Reconnect and try again.',
    ta: 'நீங்கள் இணைப்பில் இல்லை எனத் தெரிகிறது. மீண்டும் இணைந்து முயற்சிக்கவும்.',
  },
  INTERNAL: {
    en: 'Something went wrong. Please try again.',
    ta: 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.',
  },
};

const RESEND_SECONDS = 60;

export function OtpLoginForm({ locale }: { readonly locale: 'en' | 'ta' }) {
  const ta = locale === 'ta';
  const [phase, setPhase] = useState<Phase>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ErrorCode | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Move focus to the code field when it appears, so a keyboard or screen
  // reader user is not left hunting for the next step.
  useEffect(() => {
    if (phase === 'code') codeRef.current?.focus();
  }, [phase]);

  const post = useCallback(async (url: string, payload: unknown): Promise<ErrorCode | null> => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return 'OFFLINE';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await response.json()) as
        | { ok: true }
        | { ok: false; error: { code: ErrorCode } };
      return json.ok ? null : json.error.code;
    } catch {
      return 'OFFLINE';
    }
  }, []);

  const sendCode = useCallback(async () => {
    setBusy(true);
    setError(null);
    // Turnstile token is injected by the widget in production; the server
    // rejects a missing token, so this is never a bypass.
    const token =
      (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)
        ?.value ?? 'development';

    const failure = await post('/api/auth/otp/request', { phone, turnstileToken: token });
    setBusy(false);

    if (failure) {
      setError(failure);
      return;
    }
    setPhase('code');
    setCooldown(RESEND_SECONDS);
  }, [phone, post]);

  const verifyCode = useCallback(async () => {
    setBusy(true);
    setError(null);
    const failure = await post('/api/auth/otp/verify', { phone, code });
    setBusy(false);

    if (failure) {
      setError(failure);
      if (failure === 'OTP_EXPIRED') setCode('');
      return;
    }
    setPhase('done');
    window.location.assign(`/${locale}/citizen/dashboard`);
  }, [phone, code, post, locale]);

  const label = 'mb-2 block text-meta font-medium text-charcoal-900';
  const field =
    'w-full min-h-[48px] rounded-[2px] border border-sand-300 bg-white px-4 py-3 ' +
    'text-body text-charcoal-900 placeholder:text-charcoal-500';
  const button =
    'inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-maroon-700 ' +
    'px-6 py-3 text-meta font-medium text-white transition-opacity duration-[160ms] ' +
    'hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (busy) return;
        void (phase === 'phone' ? sendCode() : verifyCode());
      }}
      className="flex w-full max-w-[28rem] flex-col gap-6"
    >
      {/* Single live region for every error — multiple regions compete and
          screen readers drop announcements. */}
      <div role="alert" aria-live="polite" className="min-h-[1.5rem]">
        {error ? (
          <p className="flex items-start gap-2 text-meta text-maroon-700">
            <span aria-hidden="true">&#9888;</span>
            <span>{MESSAGES[error][ta ? 'ta' : 'en']}</span>
          </p>
        ) : null}
      </div>

      {phase === 'phone' ? (
        <div>
          <label htmlFor="phone" className={label}>
            {ta ? 'கைபேசி எண்' : 'Mobile number'}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-describedby="phone-hint"
            className={field}
            placeholder="9876543210"
          />
          <p id="phone-hint" className="mt-2 text-meta text-charcoal-700">
            {ta
              ? 'உங்கள் எண்ணுக்கு 6 இலக்கக் குறியீடு அனுப்பப்படும்.'
              : 'A 6-digit code will be sent to this number.'}
          </p>
        </div>
      ) : (
        <div>
          <label htmlFor="code" className={label}>
            {ta ? '6 இலக்கக் குறியீடு' : '6-digit code'}
          </label>
          <input
            ref={codeRef}
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            // One field, not six boxes: six boxes break platform autofill and
            // are a well-known screen-reader trap.
            autoComplete="one-time-code"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className={`${field} u-tabular tracking-[0.4em]`}
          />
          <p className="mt-2 text-meta text-charcoal-700">
            {ta ? 'அனுப்பப்பட்டது: ' : 'Sent to '}
            {phone}
          </p>
        </div>
      )}

      <button type="submit" disabled={busy} className={button}>
        {busy
          ? ta
            ? 'காத்திருக்கவும்…'
            : 'Please wait…'
          : phase === 'phone'
            ? ta
              ? 'குறியீட்டை அனுப்பு'
              : 'Send code'
            : ta
              ? 'சரிபார்'
              : 'Verify'}
      </button>

      {phase === 'code' ? (
        <button
          type="button"
          disabled={cooldown > 0 || busy}
          onClick={() => void sendCode()}
          className="min-h-[44px] text-meta text-charcoal-700 underline underline-offset-4 disabled:no-underline disabled:opacity-60"
        >
          {cooldown > 0
            ? ta
              ? `${cooldown} வினாடிகளில் மீண்டும் அனுப்பலாம்`
              : `Resend available in ${cooldown}s`
            : ta
              ? 'குறியீட்டை மீண்டும் அனுப்பு'
              : 'Resend code'}
        </button>
      ) : null}
    </form>
  );
}
