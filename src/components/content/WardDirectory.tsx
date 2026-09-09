import type { Ward } from '@/lib/content/schema';
import type { Locale } from '@/lib/i18n/routing';
import { EmptyState } from '@/components/ui/States';

/**
 * The ward and councillor directory for the constituency.
 *
 * A real table with column headers and a stacked mobile layout, ready for rows.
 * It has none: see `content/wards.ts` for why, and for what a row needs.
 *
 * The empty state names the missing source rather than saying "coming soon" —
 * a reader looking for their councillor deserves to know that this office does
 * not have the mapping, so they can go to the corporation instead of waiting.
 */
export function WardDirectory({
  wards,
  locale,
}: {
  wards: readonly Ward[];
  locale: Locale;
}) {
  if (wards.length === 0) {
    return (
      <EmptyState
        title={
          locale === 'ta'
            ? 'வார்டு அட்டவணை இன்னும் வெளியிடப்படவில்லை'
            : 'The ward directory is not published yet'
        }
        description={
          locale === 'ta'
            ? 'இந்தச் சட்டமன்றத் தொகுதிக்குள் வரும் பெருநகர சென்னை மாநகராட்சி வார்டுகளை உறுதிப்படுத்தும் அதிகாரப்பூர்வ ஆவணம் இவ்வலுவலகத்திடம் இல்லை. அது கிடைக்கும் வரை வார்டு எண்களோ உறுப்பினர் பெயர்களோ இங்கு வெளியிடப்படமாட்டா — தவறான ஒன்றை வெளியிடுவதை விட எதுவும் வெளியிடாதிருப்பதே சரி.'
            : 'This office does not hold the official document that maps Greater Chennai Corporation wards to this Assembly constituency. Until it does, no ward number or councillor name is published here — publishing the wrong one would be worse than publishing none.'
        }
        action={
          <a
            href="https://chennaicorporation.gov.in/"
            target="_blank"
            rel="noopener noreferrer external"
            className="u-tap text-small text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-current"
          >
            {locale === 'ta'
              ? 'பெருநகர சென்னை மாநகராட்சி'
              : 'Greater Chennai Corporation'}
            <span className="u-sr-only">
              {locale === 'ta' ? ' (புதிய தாவலில் திறக்கும்)' : ' (opens in a new tab)'}
            </span>
          </a>
        }
      />
    );
  }

  return (
    <>
      <div className="u-scroll-x hidden lg:block">
        <table className="min-w-[42rem] text-left">
          <caption className="u-sr-only">
            {locale === 'ta'
              ? 'தொகுதியின் வார்டுகளும் மன்ற உறுப்பினர்களும்'
              : 'Wards and councillors in the constituency'}
          </caption>
          <thead>
            <tr className="border-y border-border-strong">
              <th scope="col" className="u-label py-sm pr-lg">
                {locale === 'ta' ? 'வார்டு' : 'Ward'}
              </th>
              <th scope="col" className="u-label py-sm pr-lg">
                {locale === 'ta' ? 'மண்டலம்' : 'Zone'}
              </th>
              <th scope="col" className="u-label py-sm pr-lg">
                {locale === 'ta' ? 'பகுதிகள்' : 'Areas'}
              </th>
              <th scope="col" className="u-label py-sm">
                {locale === 'ta' ? 'மன்ற உறுப்பினர்' : 'Councillor'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {wards.map((ward) => (
              <tr key={ward.id} className="align-top">
                <th scope="row" className="py-md pr-lg text-small font-medium tabular-nums">
                  {ward.number}
                </th>
                <td className="py-md pr-lg text-caption text-ink-muted">
                  {ward.zone?.[locale] ?? '—'}
                </td>
                <td className="py-md pr-lg text-caption text-ink-muted">
                  {ward.areas.map((area) => area[locale]).join(', ')}
                </td>
                <td className="py-md text-small">{ward.councillor?.name[locale] ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-border border-y border-border lg:hidden">
        {wards.map((ward) => (
          <li key={ward.id} className="py-lg">
            <p className="u-label">
              {locale === 'ta' ? 'வார்டு' : 'Ward'} {ward.number}
            </p>
            <p className="mt-xs text-body">{ward.councillor?.name[locale] ?? '—'}</p>
            <p className="u-meta mt-xs">{ward.areas.map((area) => area[locale]).join(', ')}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
