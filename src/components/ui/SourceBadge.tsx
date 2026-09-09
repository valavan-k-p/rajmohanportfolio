import { cn } from '@/lib/cn';
import type { Source } from '@/lib/content/source';
import { SOURCE_TYPE_LABEL } from '@/lib/content/source';
import type { Locale } from '@/lib/i18n/routing';
import { formatDateShort } from '@/lib/i18n/bilingual';

/**
 * Attribution, rendered small.
 *
 * The brief is explicit that a large source box on every card would be clutter,
 * so `inline` is the default: one line of caption type. `block` is the fuller
 * treatment used once, in a document's or an article's metadata area.
 *
 * `editorial` sources are framing written by this office and carry no factual
 * claim, so they are not labelled "Source:" — labelling office copy as a source
 * would be exactly the false-authority problem the brief warns about.
 */
export function SourceBadge({
  source,
  locale,
  variant = 'inline',
  className,
}: {
  source: Source;
  locale: Locale;
  variant?: 'inline' | 'block';
  className?: string;
}) {
  const typeLabel = SOURCE_TYPE_LABEL[source.sourceType][locale];
  const name = source.sourceName[locale];
  const isEditorial = source.sourceType === 'editorial';

  const label = locale === 'ta' ? 'ஆதாரம்' : 'Source';
  const viewLabel = locale === 'ta' ? 'ஆதாரத்தைப் பார்' : 'View source';

  if (variant === 'inline') {
    return (
      <p className={cn('u-meta', className)}>
        {isEditorial ? (
          <span>{name}</span>
        ) : (
          <>
            <span className="text-ink-faint">{label}: </span>
            <span className="text-ink-muted">{name}</span>
          </>
        )}
      </p>
    );
  }

  return (
    <div className={cn('border-t border-border pt-md', className)}>
      <p className="u-label mb-xs">{isEditorial ? typeLabel : label}</p>
      <p className="text-small text-ink">{name}</p>
      {!isEditorial ? <p className="u-meta mt-1">{typeLabel}</p> : null}

      <dl className="mt-sm grid gap-x-lg gap-y-1 text-caption text-ink-faint sm:grid-cols-2">
        {source.documentDate ? (
          <div className="flex gap-2">
            <dt>{locale === 'ta' ? 'ஆவண நாள்' : 'Document date'}</dt>
            <dd className="text-ink-muted">{formatDateShort(source.documentDate, locale)}</dd>
          </div>
        ) : null}
        {source.publicationDate ? (
          <div className="flex gap-2">
            <dt>{locale === 'ta' ? 'வெளியிட்ட நாள்' : 'Published'}</dt>
            <dd className="text-ink-muted">{formatDateShort(source.publicationDate, locale)}</dd>
          </div>
        ) : null}
        {source.verificationDate ? (
          <div className="flex gap-2">
            <dt>{locale === 'ta' ? 'சரிபார்த்த நாள்' : 'Checked'}</dt>
            <dd className="text-ink-muted">{formatDateShort(source.verificationDate, locale)}</dd>
          </div>
        ) : null}
      </dl>

      {source.sourceUrl ? (
        <a
          href={source.sourceUrl}
          rel="noopener noreferrer external"
          target="_blank"
          className="u-tap mt-sm inline-block text-small text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-current"
        >
          {viewLabel}
          <span className="u-sr-only"> ({locale === 'ta' ? 'புதிய தாவலில்' : 'opens in a new tab'})</span>
        </a>
      ) : null}

      {source.conflictNote ? (
        <p className="mt-sm border-l-2 border-status-pending pl-sm text-caption text-ink-muted">
          {source.conflictNote[locale]}
        </p>
      ) : null}
    </div>
  );
}
