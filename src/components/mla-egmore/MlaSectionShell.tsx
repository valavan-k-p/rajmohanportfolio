'use client';

import type { ReactNode } from 'react';
import type { SectionLayout } from '@/data/portals';
import { cormorant } from './MlaTypography';
import { MlaTextReveal, MlaLineReveal, MlaStaggerItem } from './MlaMotion';

const GROUND: Partial<Record<SectionLayout, string>> = {
  statement: 'bg-slate-50',
  'prose-columns': 'bg-slate-50',
  'data-band': 'bg-slate-900 text-white',
  'feature-word': 'bg-slate-50',
  'full-bleed': 'bg-slate-900 text-white',
  contact: 'bg-slate-50',
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

export interface MlaSectionShellProps {
  readonly id: string;
  readonly title: string;
  readonly layout: SectionLayout;
  readonly index: number;
  readonly children?: ReactNode;
}

export function MlaSectionShell({ id, title, layout, index, children }: MlaSectionShellProps) {
  const ground = GROUND[layout] ?? 'bg-white';
  const inner = INNER[layout] ?? 'max-w-[72rem]';
  const inverted = layout === 'data-band' || layout === 'full-bleed';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`px-gutter py-section ${ground} ${cormorant.variable}`}
    >
      <div className={`mx-auto ${inner}`}>
        <div className="mb-8 flex items-baseline gap-4">
          <MlaStaggerItem y={10}>
            <span
              aria-hidden="true"
              className={`u-eyebrow ${inverted ? 'text-slate-50' : 'text-slate-900'}`}
            >
              {String(index).padStart(2, '0')}
            </span>
          </MlaStaggerItem>
          <MlaStaggerItem y={15} className="mt-8">
            <MlaTextReveal delay={0.2}>
              <h2
                id={`${id}-heading`}
                className={`font-display text-h2 ${inverted ? 'text-white' : 'text-slate-900'}`}
                style={{ 
                  fontFamily: 'var(--font-cormorant)',
                  textShadow: inverted ? '0 0 15px rgba(255,255,255,0.1)' : '0 0 15px rgba(138, 115, 163, 0.15)'
                }}
              >
                {title}
              </h2>
            </MlaTextReveal>
          </MlaStaggerItem>
        </div>

        <MlaLineReveal 
          className={`mb-10 h-px w-full ${inverted ? 'bg-white/25' : 'bg-slate-50'}`}
        />

        {children}
      </div>
    </section>
  );
}
