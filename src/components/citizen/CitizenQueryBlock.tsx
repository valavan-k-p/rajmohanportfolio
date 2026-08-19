import Link from 'next/link';
import type { PortalId } from '@/config/portals';

/**
 * The shared entry point into the ONE Citizen Service Engine.
 *
 * Every portal mounts this same component with its own department — spec §11
 * is explicit that four separate query systems must not be built. The label
 * differs per portal because the specs name each one; the destination, the
 * validation and the backend are identical.
 *
 * The form itself lands in Phase 9. This block is the routing surface and the
 * per-portal framing, which the portals need now.
 */

const LABELS: Record<PortalId, { readonly en: string; readonly ta: string }> = {
  'school-education': {
    en: 'Raise an Education Concern',
    ta: 'கல்விக் கவலையைத் தெரிவிக்கவும்',
  },
  'tamil-development': {
    en: 'Share a Tamil Development Concern',
    ta: 'தமிழ் வளர்ச்சிக் கவலையைப் பகிரவும்',
  },
  'information-publicity': {
    en: 'Submit an Information Request',
    ta: 'தகவல் கோரிக்கையைச் சமர்ப்பிக்கவும்',
  },
  'mla-egmore': {
    en: 'Raise a Constituency Concern',
    ta: 'தொகுதிக் கவலையைத் தெரிவிக்கவும்',
  },
};

export interface CitizenQueryBlockProps {
  readonly department: PortalId;
  readonly locale: 'en' | 'ta';
}

export function CitizenQueryBlock({ department, locale }: CitizenQueryBlockProps) {
  const label = LABELS[department][locale];

  return (
    <section
      id="citizen-query"
      aria-labelledby="citizen-query-heading"
      className="bg-maroon-800 px-gutter py-section text-white"
    >
      <div className="mx-auto flex max-w-[62rem] flex-col items-start gap-6">
        <span aria-hidden="true" className="u-eyebrow text-yellow-400">
          {locale === 'ta' ? 'குடிமக்கள் சேவை' : 'Citizen Service'}
        </span>

        <h2 id="citizen-query-heading" className="font-display text-h2 text-white">
          {label}
        </h2>

        <p className="u-measure text-lead text-white/80">
          {locale === 'ta'
            ? 'உங்கள் கோரிக்கை ஒரு தனிப்பட்ட குறிப்பு எண்ணைப் பெறும். அதன் நிலையை நீங்கள் கண்காணிக்கலாம்.'
            : 'Your query receives a unique reference number. You can track its progress at any time.'}
        </p>

        <Link
          href={`/${locale}/${department}#citizen-query`}
          className={[
            'inline-flex min-h-[44px] items-center rounded-[2px] bg-yellow-400 px-6 py-3',
            'font-sans text-meta font-medium text-charcoal-900 no-underline',
            'transition-opacity duration-[160ms] hover:opacity-90',
          ].join(' ')}
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
