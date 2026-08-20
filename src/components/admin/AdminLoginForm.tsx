'use client';

import { useCallback, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

/**
 * Staff sign-in form.
 *
 * Uses the anon key only. Whether the account is staff at all is decided
 * server-side by `getAdminSession()` and, ultimately, by RLS — signing in here
 * grants a session, not authority. A citizen who signs in at this URL gets a
 * valid session and still sees nothing in admin.
 */
export function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    setBusy(true);
    setError(null);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      setBusy(false);

      if (authError) {
        // One message for both wrong-email and wrong-password: distinguishing
        // them confirms which staff addresses exist.
        setError('Those credentials were not accepted.');
        return;
      }

      window.location.assign('/admin/dashboard');
    } catch {
      setBusy(false);
      setError('Sign-in is unavailable right now.');
    }
  }, [email, password]);

  const label = 'mb-2 block text-meta font-medium text-charcoal-900';
  const field =
    'w-full min-h-[48px] rounded-[2px] border border-sand-300 bg-white px-4 py-3 text-body text-charcoal-900';

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (!busy) void submit();
      }}
      className="flex flex-col gap-6"
    >
      <div role="alert" aria-live="polite" className="min-h-[1.5rem]">
        {error ? (
          <p className="flex items-start gap-2 text-meta text-maroon-700">
            <span aria-hidden="true">&#9888;</span>
            <span>{error}</span>
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="admin-email" className={label}>
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className={label}>
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={field}
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-maroon-700 px-6 py-3 text-meta font-medium text-white disabled:opacity-50"
      >
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
