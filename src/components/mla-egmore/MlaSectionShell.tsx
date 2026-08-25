'use client';

import type { ReactNode } from 'react';
import type { SectionLayout } from '@/data/portals';
import { MlaTextReveal, MlaLineReveal, MlaStaggerItem } from './MlaMotion';

const GROUND: Partial<Record<SectionLayout, string>> = {
  statement: 'bg-sand-100',
  'numbered-list': 'bg-white',
  'asymmetric-left': 'bg-white',
  'full-bleed': 'bg-maroon-700 text-white',
  'asymmetric-right': 'bg-white',
  'prose-columns': 'bg-sand-100',
  'data-band': 'bg-charcoal-900 text-white',
  staggered: 'bg-white',
  timeline: 'bg-sand-100',
  'editorial-index': 'bg-white',
  'category-grid': 'bg-sand-50',
  'media-grid': 'bg-sand-100',
  'link-list': 'bg-sand-50',
  'feature-word': 'bg-sand-200',
  contact: 'bg-sand-100',
};

const INNER: Partial<Record<SectionLayout, string>> = {
  statement: 'max-w-[50rem] mx-auto text-center',
  'numbered-list': 'max-w-[68rem]',
  'prose-columns': 'max-w-[72rem] md:columns-2 md:gap-16',
  'editorial-index': 'max-w-[76rem]',
  'link-list': 'max-w-[68rem]',
  table: 'max-w-[76rem]',
  roll: 'max-w-[68rem]',
  catalogue: 'max-w-[72rem]',
  'feature-word': 'max-w-[44rem] mx-auto text-center',
  'category-grid': 'max-w-[76rem]',
  'media-grid': 'max-w-[80rem]',
  tracker: 'max-w-[50rem]',
  contact: 'max-w-[68rem]',
  timeline: 'max-w-[80rem]',
  'data-band': 'max-w-[76rem]',
};

export interface MlaSectionShellProps {
  readonly id: string;
  readonly title: string;
  readonly layout: SectionLayout;
  readonly index: number;
  readonly children?: ReactNode;
}

export function MlaSectionShell({ id, title, layout, index, children }: MlaSectionShellProps) {
  const ground = GROUND[layout] ?? 'bg-white';
  const inner = INNER[layout] ?? 'max-w-[76rem]';
  const inverted = layout === 'data-band' || layout === 'full-bleed';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`px-gutter py-section ${ground} border-b border-sand-300 relative overflow-hidden`}
    >
      <div className={`mx-auto ${inner}`}>
        <div className="mb-8 flex items-baseline gap-4">
          <MlaStaggerItem y={10}>
            <span
              aria-hidden="true"
              className={`font-mono text-xs uppercase tracking-widest font-bold ${
                inverted ? 'text-yellow-400' : 'text-maroon-700'
              }`}
            >
              SEC · {String(index).padStart(2, '0')}
            </span>
          </MlaStaggerItem>
          <MlaStaggerItem y={15} className="mt-8">
            <MlaTextReveal delay={0.2}>
              <h2
                id={`${id}-heading`}
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight leading-[1.08] ${
                  inverted ? 'text-white' : 'text-charcoal-900'
                }`}
              >
                {title}
              </h2>
            </MlaTextReveal>
          </MlaStaggerItem>
        </div>

        <MlaLineReveal 
          className={`mb-10 h-px w-full ${inverted ? 'bg-yellow-400/40' : 'bg-charcoal-900/20'}`}
        />

        {children}
      </div>
    </section>
  );
}
