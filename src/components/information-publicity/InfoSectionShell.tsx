'use client';

import type { ReactNode } from 'react';
import type { SectionLayout } from '@/data/portals';

const GROUND: Partial<Record<SectionLayout, string>> = {
  statement: 'bg-sand-100/60',
  'prose-columns': 'bg-sand-100/60',
  'data-band': 'bg-charcoal-900 text-white',
  'feature-word': 'bg-sand-200',
  'full-bleed': 'bg-charcoal-900 text-white',
  contact: 'bg-sand-100',
};

const INNER: Partial<Record<SectionLayout, string>> = {
  statement: 'max-w-[52rem] mx-auto',
  'numbered-list': 'max-w-[68rem]',
  'prose-columns': 'max-w-[72rem]',
  'editorial-index': 'max-w-[78rem]',
  'link-list': 'max-w-[68rem]',
  table: 'max-w-[78rem]',
  roll: 'max-w-[68rem]',
  catalogue: 'max-w-[74rem]',
  'feature-word': 'max-w-[44rem] mx-auto text-center',
  'category-grid': 'max-w-[78rem]',
  'media-grid': 'max-w-[80rem]',
  timeline: 'max-w-[78rem]',
};

export interface InfoSectionShellProps {
  readonly id: string;
  readonly title: string;
  readonly layout: SectionLayout;
  readonly index: number;
  readonly kicker?: string;
  readonly children?: ReactNode;
}

export function InfoSectionShell({
  id,
  title,
  layout,
  index,
  kicker,
  children,
}: InfoSectionShellProps) {
  const ground = GROUND[layout] ?? 'bg-white';
  const inner = INNER[layout] ?? 'max-w-[76rem]';
  const inverted = layout === 'data-band' || layout === 'full-bleed';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`px-4 sm:px-6 md:px-8 py-16 md:py-20 ${ground} border-b border-sand-200/80 transition-colors`}
    >
      <div className={`mx-auto ${inner}`}>
        {/* Newsroom Section Masthead / Header Rule */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-charcoal-900">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`font-mono text-xs uppercase tracking-widest font-bold ${
                  inverted ? 'text-yellow-400' : 'text-maroon-700'
                }`}
              >
                SEC · {String(index).padStart(2, '0')}
              </span>
              {kicker && (
                <>
                  <span className="text-sand-400 font-sans text-xs">/</span>
                  <span className="text-xs uppercase tracking-wider text-charcoal-500 font-medium">
                    {kicker}
                  </span>
                </>
              )}
            </div>
            <span className="text-xs text-charcoal-400 font-mono tracking-tight hidden sm:inline-block">
              TN DIPR OFFICIAL DISPATCH
            </span>
          </div>

          <h2
            id={`${id}-heading`}
            className={`mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight ${
              inverted ? 'text-white' : 'text-charcoal-900'
            }`}
          >
            {title}
          </h2>
        </div>

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
}
