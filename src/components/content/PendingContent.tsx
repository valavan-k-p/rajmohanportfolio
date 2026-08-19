import { getTranslations } from 'next-intl/server';

/**
 * Rendered in place of a section's body when no verified content exists.
 *
 * This is the visible half of the content-governance rule
 * (docs/PHASE-0-AUDIT.md §H-7). It is deliberately plain and unmistakable: it
 * must never be confused with real content by an author, a reviewer, or a
 * member of the public who reaches a staging URL.
 *
 * In production these blocks are not rendered at all — `isPublishable` filters
 * them upstream — so this component only ever appears in development and
 * staging.
 */
export async function PendingContent({ inverted = false }: { readonly inverted?: boolean }) {
  const t = await getTranslations('content');

  return (
    <div
      role="note"
      className={[
        'flex flex-col gap-2 border border-dashed p-6',
        inverted ? 'border-white/30 text-white/80' : 'border-sand-300 text-charcoal-700',
      ].join(' ')}
    >
      <span
        className={[
          'u-eyebrow',
          inverted ? 'text-yellow-400' : 'text-maroon-700',
        ].join(' ')}
      >
        {t('unverifiedNotice')}
      </span>
      <p className="u-measure text-meta">{t('unverifiedDescription')}</p>
    </div>
  );
}
