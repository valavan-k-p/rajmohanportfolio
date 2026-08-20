'use client';

import { useCallback, useId, useRef, useState } from 'react';
import type { PortalId } from '@/config/portals';
import { ALLOWED_ATTACHMENT_TYPES, MAX_ATTACHMENT_BYTES } from '@/lib/queries/schema';

/**
 * Citizen query submission (spec §12).
 *
 * Flow: details -> attachments -> review -> submit -> reference.
 *
 * Authentication is deliberately NOT a step inside this form. A citizen signs
 * in first; posting unauthenticated returns UNAUTHORIZED and the form sends
 * them to sign-in with their draft intact. Burying an OTP challenge in the
 * middle of a form is where people abandon.
 *
 * §30 is treated as load-bearing: a submission is NEVER reported successful
 * without a server-confirmed reference number. If the request fails, the draft
 * is preserved and the failure is stated plainly.
 */

type Step = 'details' | 'attachments' | 'review' | 'done';

interface Category {
  readonly id: string;
  readonly name: string;
}

interface Copy {
  readonly en: string;
  readonly ta: string;
}

const T = {
  subject: { en: 'Subject', ta: 'தலைப்பு' },
  description: { en: 'Describe your concern', ta: 'உங்கள் கவலையை விவரிக்கவும்' },
  location: { en: 'Location (optional)', ta: 'இடம் (விருப்பத்தேர்வு)' },
  category: { en: 'Category', ta: 'வகை' },
  attachments: { en: 'Supporting files (optional)', ta: 'ஆதரவு கோப்புகள் (விருப்பத்தேர்வு)' },
  next: { en: 'Continue', ta: 'தொடரவும்' },
  back: { en: 'Back', ta: 'பின்செல்' },
  review: { en: 'Review your query', ta: 'உங்கள் கோரிக்கையைச் சரிபார்க்கவும்' },
  submit: { en: 'Submit query', ta: 'கோரிக்கையைச் சமர்ப்பிக்கவும்' },
  submitting: { en: 'Submitting…', ta: 'சமர்ப்பிக்கிறது…' },
  successTitle: { en: 'Query submitted', ta: 'கோரிக்கை சமர்ப்பிக்கப்பட்டது' },
  reference: { en: 'Your reference number', ta: 'உங்கள் குறிப்பு எண்' },
  keepReference: {
    en: 'Save this number. You can track your query with it at any time.',
    ta: 'இந்த எண்ணைச் சேமிக்கவும். இதைக் கொண்டு எப்போது வேண்டுமானாலும் கண்காணிக்கலாம்.',
  },
  fileTooLarge: { en: 'Each file must be 10 MB or smaller.', ta: 'ஒவ்வொரு கோப்பும் 10 MB ஆக இருக்க வேண்டும்.' },
  fileWrongType: {
    en: 'Only JPEG, PNG, WebP or PDF files are accepted.',
    ta: 'JPEG, PNG, WebP அல்லது PDF கோப்புகள் மட்டுமே ஏற்கப்படும்.',
  },
  needSignIn: {
    en: 'Please sign in with your mobile number to submit. Your draft is kept.',
    ta: 'சமர்ப்பிக்க உங்கள் கைபேசி எண்ணுடன் உள்நுழையவும். உங்கள் வரைவு சேமிக்கப்படும்.',
  },
  failed: {
    en: 'Your query was NOT submitted. Nothing has been lost — try again.',
    ta: 'உங்கள் கோரிக்கை சமர்ப்பிக்கப்படவில்லை. எதுவும் இழக்கப்படவில்லை — மீண்டும் முயற்சிக்கவும்.',
  },
  offline: {
    en: 'You appear to be offline. Your query was NOT submitted.',
    ta: 'நீங்கள் இணைப்பில் இல்லை. உங்கள் கோரிக்கை சமர்ப்பிக்கப்படவில்லை.',
  },
} satisfies Record<string, Copy>;

export interface QuerySubmissionFormProps {
  readonly department: PortalId;
  readonly locale: 'en' | 'ta';
  readonly categories?: readonly Category[];
}

export function QuerySubmissionForm({
  department,
  locale,
  categories = [],
}: QuerySubmissionFormProps) {
  const t = (key: keyof typeof T) => T[key][locale];
  const formId = useId();

  const [step, setStep] = useState<Step>('details');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const goTo = useCallback((next: Step) => {
    setStep(next);
    setMessage(null);
    // Move focus to the new step's heading so keyboard and screen-reader users
    // are not silently left at the bottom of the previous step.
    requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const accepted: File[] = [];
      for (const file of Array.from(incoming)) {
        if (!(ALLOWED_ATTACHMENT_TYPES as readonly string[]).includes(file.type)) {
          setMessage(t('fileWrongType'));
          continue;
        }
        if (file.size > MAX_ATTACHMENT_BYTES) {
          setMessage(t('fileTooLarge'));
          continue;
        }
        accepted.push(file);
      }
      setFiles((current) => [...current, ...accepted].slice(0, 5));
    },
    [locale], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const submit = useCallback(async () => {
    setBusy(true);
    setMessage(null);

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setBusy(false);
      setMessage(t('offline'));
      return;
    }

    const token =
      (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)
        ?.value ?? 'development';

    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          department,
          categoryId: categoryId || undefined,
          subject,
          description,
          location: location || undefined,
          attachments: files.map((f) => ({
            fileName: f.name,
            mimeType: f.type,
            sizeBytes: f.size,
          })),
          turnstileToken: token,
        }),
      });

      const json = (await response.json()) as
        | { ok: true; data: { referenceNumber: string } }
        | { ok: false; error: { code: string } };

      setBusy(false);

      if (!json.ok) {
        if (json.error.code === 'UNAUTHORIZED') {
          setMessage(t('needSignIn'));
          return;
        }
        setMessage(t('failed'));
        return;
      }

      // Only now is the submission reported as successful — §30.
      setReference(json.data.referenceNumber);
      goTo('done');
    } catch {
      setBusy(false);
      setMessage(t('failed'));
    }
  }, [department, categoryId, subject, description, location, files, goTo, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  const detailsValid = subject.trim().length >= 3 && description.trim().length >= 10;

  const label = 'mb-2 block text-meta font-medium text-charcoal-900';
  const field =
    'w-full min-h-[48px] rounded-[2px] border border-sand-300 bg-white px-4 py-3 ' +
    'text-body text-charcoal-900';
  const primary =
    'inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-maroon-700 ' +
    'px-6 py-3 text-meta font-medium text-white transition-opacity duration-[160ms] ' +
    'hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50';
  const secondary =
    'inline-flex min-h-[48px] items-center justify-center rounded-[2px] border ' +
    'border-maroon-600 px-6 py-3 text-meta text-maroon-700';

  if (step === 'done' && reference) {
    return (
      <div className="flex max-w-[36rem] flex-col gap-4 border border-sand-300 bg-white p-8">
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-h2 text-charcoal-900 outline-none"
        >
          {t('successTitle')}
        </h3>
        <p className="u-eyebrow text-maroon-700">{t('reference')}</p>
        <p className="u-tabular text-h2 font-display text-maroon-800">{reference}</p>
        <p className="u-measure text-body text-charcoal-700">{t('keepReference')}</p>
        <a
          href={`/${locale}/citizen/dashboard`}
          className={`${primary} w-fit no-underline`}
        >
          {locale === 'ta' ? 'எனது கோரிக்கைகள்' : 'My queries'}
        </a>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (busy) return;
        if (step === 'details' && detailsValid) goTo('attachments');
        else if (step === 'attachments') goTo('review');
        else if (step === 'review') void submit();
      }}
      className="flex w-full max-w-[36rem] flex-col gap-6"
    >
      {/* Progress is announced as text, never by colour alone. */}
      <p className="u-eyebrow text-charcoal-700">
        {locale === 'ta' ? 'படி' : 'Step'}{' '}
        {step === 'details' ? 1 : step === 'attachments' ? 2 : 3} / 3
      </p>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-h3 text-charcoal-900 outline-none"
      >
        {step === 'details'
          ? t('description')
          : step === 'attachments'
            ? t('attachments')
            : t('review')}
      </h3>

      <div role="alert" aria-live="polite" className="min-h-[1.5rem]">
        {message ? (
          <p className="flex items-start gap-2 text-meta text-maroon-700">
            <span aria-hidden="true">&#9888;</span>
            <span>{message}</span>
          </p>
        ) : null}
      </div>

      {step === 'details' ? (
        <>
          {categories.length > 0 ? (
            <div>
              <label htmlFor={`${formId}-category`} className={label}>
                {t('category')}
              </label>
              <select
                id={`${formId}-category`}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={field}
              >
                <option value="">—</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div>
            <label htmlFor={`${formId}-subject`} className={label}>
              {t('subject')}
            </label>
            <input
              id={`${formId}-subject`}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={200}
              required
              className={field}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-description`} className={label}>
              {t('description')}
            </label>
            <textarea
              id={`${formId}-description`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={5000}
              rows={6}
              required
              className={`${field} min-h-[9rem]`}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-location`} className={label}>
              {t('location')}
            </label>
            <input
              id={`${formId}-location`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={300}
              className={field}
            />
          </div>
        </>
      ) : null}

      {step === 'attachments' ? (
        <>
          <div>
            <label htmlFor={`${formId}-files`} className={label}>
              {t('attachments')}
            </label>
            <input
              id={`${formId}-files`}
              type="file"
              multiple
              accept={ALLOWED_ATTACHMENT_TYPES.join(',')}
              onChange={(e) => addFiles(e.target.files)}
              className={field}
            />
            <p className="mt-2 text-meta text-charcoal-700">
              JPEG, PNG, WebP, PDF · max 10 MB · up to 5
            </p>
          </div>

          {files.length > 0 ? (
            <ul className="flex flex-col border-t border-sand-300">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-4 border-b border-sand-300 py-3"
                >
                  <span className="text-meta text-charcoal-900">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles((c) => c.filter((_, i) => i !== index))}
                    className="min-h-[44px] text-meta text-maroon-700 underline underline-offset-4"
                  >
                    {locale === 'ta' ? 'நீக்கு' : 'Remove'}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}

      {step === 'review' ? (
        <dl className="flex flex-col gap-4 border border-sand-300 bg-white p-6">
          <div>
            <dt className="u-eyebrow text-charcoal-700">{t('subject')}</dt>
            <dd className="text-body text-charcoal-900">{subject}</dd>
          </div>
          <div>
            <dt className="u-eyebrow text-charcoal-700">{t('description')}</dt>
            <dd className="u-measure whitespace-pre-wrap text-body text-charcoal-900">
              {description}
            </dd>
          </div>
          {location ? (
            <div>
              <dt className="u-eyebrow text-charcoal-700">{t('location')}</dt>
              <dd className="text-body text-charcoal-900">{location}</dd>
            </div>
          ) : null}
          {files.length > 0 ? (
            <div>
              <dt className="u-eyebrow text-charcoal-700">{t('attachments')}</dt>
              <dd className="text-body text-charcoal-900">
                {files.map((f) => f.name).join(', ')}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <div className="flex flex-wrap gap-4">
        {step !== 'details' ? (
          <button
            type="button"
            onClick={() => goTo(step === 'review' ? 'attachments' : 'details')}
            className={secondary}
          >
            {t('back')}
          </button>
        ) : null}

        <button
          type="submit"
          disabled={busy || (step === 'details' && !detailsValid)}
          className={primary}
        >
          {busy ? t('submitting') : step === 'review' ? t('submit') : t('next')}
        </button>
      </div>
    </form>
  );
}
