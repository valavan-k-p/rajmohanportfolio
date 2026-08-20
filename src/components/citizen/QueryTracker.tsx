'use client';

import { useCallback, useState } from 'react';
import { STATUS_LABELS, type QueryStatus } from '@/lib/queries/status';
import { normaliseReference } from '@/lib/queries/reference';

/**
 * Public query tracker (pages/mla-egmore.md §11). Works WITHOUT login — the
 * people most likely to need it are the least likely to still have a session.
 *
 * Requires reference + last 4 digits of the filing mobile number. Reference
 * alone is enumerable, so it would let anyone walk the sequence and read
 * strangers' grievances.
 *
 * Status is returned and displayed as TEXT. Nothing here depends on colour.
 */

interface Result {
  readonly referenceNumber: string;
  readonly status: QueryStatus;
  readonly submittedAt: string;
  readonly updatedAt: string;
  readonly resolvedAt: string | null;
}

export function QueryTracker({ locale }: { readonly locale: 'en' | 'ta' }) {
  const ta = locale === 'ta';
  const [reference, setReference] = useState('');
  const [last4, setLast4] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const lookup = useCallback(async () => {
    setBusy(true);
    setError(null);
    setResult(null);

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setBusy(false);
      setError(ta ? 'நீங்கள் இணைப்பில் இல்லை.' : 'You appear to be offline.');
      return;
    }

    try {
      const response = await fetch('/api/queries/track', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ reference: normaliseReference(reference), phoneLast4: last4 }),
      });

      const json = (await response.json()) as
        | { ok: true; data: Result }
        | { ok: false; error: { code: string; retryAfterSeconds?: number } };

      setBusy(false);

      if (!json.ok) {
        if (json.error.code === 'RATE_LIMITED') {
          setError(
            ta
              ? 'அதிக முயற்சிகள். சிறிது நேரம் கழித்து முயற்சிக்கவும்.'
              : 'Too many attempts. Please wait and try again.',
          );
          return;
        }
        // Deliberately the same message for "no such reference" and "wrong
        // digits" — distinguishing them would confirm which references exist.
        setError(
          ta
            ? 'இந்த விவரங்களுடன் கோரிக்கை எதுவும் காணப்படவில்லை. சரிபார்த்து மீண்டும் முயற்சிக்கவும்.'
            : 'No query found with those details. Check them and try again.',
        );
        return;
      }

      setResult(json.data);
    } catch {
      setBusy(false);
      setError(ta ? 'ஏதோ தவறு நடந்தது.' : 'Something went wrong.');
    }
  }, [reference, last4, ta]);

  const label = 'mb-2 block text-meta font-medium text-charcoal-900';
  const field =
    'w-full min-h-[48px] rounded-[2px] border border-sand-300 bg-white px-4 py-3 text-body text-charcoal-900';

  return (
    <div className="flex w-full max-w-[36rem] flex-col gap-6">
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!busy) void lookup();
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
          <label htmlFor="track-reference" className={label}>
            {ta ? 'குறிப்பு எண்' : 'Reference number'}
          </label>
          <input
            id="track-reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="EDU-2026-000184"
            required
            className={`${field} u-tabular`}
          />
        </div>

        <div>
          <label htmlFor="track-last4" className={label}>
            {ta ? 'கைபேசி எண்ணின் கடைசி 4 இலக்கங்கள்' : 'Last 4 digits of your mobile number'}
          </label>
          <input
            id="track-last4"
            inputMode="numeric"
            maxLength={4}
            value={last4}
            onChange={(e) => setLast4(e.target.value.replace(/\D/g, ''))}
            required
            className={`${field} u-tabular`}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-[48px] w-fit items-center rounded-[2px] bg-maroon-700 px-6 py-3 text-meta font-medium text-white disabled:opacity-50"
        >
          {busy ? (ta ? 'தேடுகிறது…' : 'Checking…') : ta ? 'நிலையைக் காண்க' : 'Check status'}
        </button>
      </form>

      {result ? (
        <dl className="flex flex-col gap-4 border border-sand-300 bg-white p-6">
          <div>
            <dt className="u-eyebrow text-charcoal-700">{ta ? 'குறிப்பு' : 'Reference'}</dt>
            <dd className="u-tabular text-body text-charcoal-900">{result.referenceNumber}</dd>
          </div>
          <div>
            <dt className="u-eyebrow text-charcoal-700">{ta ? 'நிலை' : 'Status'}</dt>
            <dd className="font-display text-h3 text-maroon-800">
              {STATUS_LABELS[result.status][locale]}
            </dd>
          </div>
          <div>
            <dt className="u-eyebrow text-charcoal-700">
              {ta ? 'சமர்ப்பிக்கப்பட்டது' : 'Submitted'}
            </dt>
            <dd className="u-tabular text-body text-charcoal-900">
              {new Date(result.submittedAt).toLocaleDateString(ta ? 'ta-IN' : 'en-IN')}
            </dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}
