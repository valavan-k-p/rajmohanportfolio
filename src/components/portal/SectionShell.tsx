import type { ReactNode } from 'react';
import type { SectionLayout } from '@/data/portals';

/**
 * Per-layout ground and rhythm.
 *
 * MASTER.md §8 forbids "a section that looks like the section above it", and
 * forbids the card grid as a default answer. Each layout therefore gets its own
 * ground, measure and internal structure — the variation is defined once here
 * rather than improvised per page.
 */
const GROUND: Partial<Record<SectionLayout, string>> = {
  statement: 'bg-sand-100',
  'prose-columns': 'bg-sand-100',
  'data-band': 'bg-charcoal-900 text-white',
  'feature-word': 'bg-sand-200',
  'full-bleed': 'bg-charcoal-900 text-white',
  contact: 'bg-sand-200',
};

const INNER: Partial<Record<SectionLayout, string>> = {
  statement: 'max-w-[46rem] mx-auto text-center',
  'numbered-list': 'max-w-[62rem]',
  'prose-columns': 'max-w-[68rem] md:columns-2 md:gap-16',
  'editorial-index': 'max-w-[76rem]',
  'link-list': 'max-w-[62rem]',
  table: 'max-w-[76rem]',
  roll: 'max-w-[62rem]',
  catalogue: 'max-w-[70rem]',
  'feature-word': 'max-w-[40rem] mx-auto text-center',
  'category-grid': 'max-w-[76rem]',
  'media-grid': 'max-w-[80rem]',
  tracker: 'max-w-[46rem]',
  contact: 'max-w-[62rem]',
  timeline: 'max-w-[80rem]',
  'data-band': 'max-w-[76rem]',
};

export interface SectionShellProps {
  readonly id: string;
  readonly title: string;
  readonly layout: SectionLayout;
  readonly index: number;
  readonly children?: ReactNode;
}

export function SectionShell({ id, title, layout, index, children }: SectionShellProps) {
  const ground = GROUND[layout] ?? 'bg-white';
  const inner = INNER[layout] ?? 'max-w-[72rem]';
  const inverted = layout === 'data-band' || layout === 'full-bleed';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`px-gutter py-section ${ground}`}
    >
      <div className={`mx-auto ${inner}`}>
        <div className="mb-8 flex items-baseline gap-4">
          <span
            aria-hidden="true"
            className={`u-eyebrow ${inverted ? 'text-yellow-400' : 'text-maroon-700'}`}
          >
            {String(index).padStart(2, '0')}
          </span>
          <h2
            id={`${id}-heading`}
            className={`font-display text-h2 ${inverted ? 'text-white' : 'text-charcoal-900'}`}
          >
            {title}
          </h2>
        </div>

        {/* Hairline under the heading — the recurring structural mark that ties
            the four portals together without making them look alike. */}
        <div
          aria-hidden="true"
          className={`mb-10 h-px w-full ${inverted ? 'bg-white/25' : 'bg-sand-300'}`}
        />

        {children}
      </div>
    </section>
  );
}
