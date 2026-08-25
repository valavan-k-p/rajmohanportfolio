'use client';



import { type ReactNode } from 'react';
import type { SectionLayout } from '@/data/portals';
import clsx from 'clsx';
import { MlaTextReveal, MlaLineReveal, MlaStaggerItem } from './MlaMotion';

type BgVariant = 'paper' | 'cream' | 'maroon' | 'dark' | 'charcoal';

const LAYOUT_TO_BG: Record<SectionLayout, BgVariant> = {
  statement: 'cream',
  'numbered-list': 'paper',
  'asymmetric-left': 'paper',
  'full-bleed': 'maroon',
  'asymmetric-right': 'paper',
  'prose-columns': 'cream',
  'data-band': 'charcoal',
  staggered: 'paper',
  timeline: 'cream',
  'editorial-index': 'paper',
  'category-grid': 'paper',
  'media-grid': 'cream',
  'link-list': 'paper',
  'feature-word': 'cream',
  contact: 'cream',
  hero: 'paper',
  table: 'paper',
  roll: 'paper',
  catalogue: 'paper',
  query: 'paper',
  tracker: 'paper',
};

const BG_STYLES: Record<BgVariant, string> = {
  paper: 'bg-white text-charcoal-900 border-sand-300',
  cream: 'bg-sand-50 text-charcoal-900 border-sand-300',
  maroon: 'bg-maroon-700 text-white border-maroon-800',
  dark: 'bg-maroon-900 text-sand-50 border-maroon-950',
  charcoal: 'bg-charcoal-900 text-sand-50 border-charcoal-950',
};

export interface MlaSectionShellProps {
  readonly id: string;
  readonly title: string;
  readonly layout: SectionLayout;
  readonly index: number;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly innerClassName?: string;
}

export function MlaSectionShell({ id, title, layout, index, children, className, innerClassName }: MlaSectionShellProps) {
  const bgVariant = LAYOUT_TO_BG[layout] ?? 'paper';
  const ground = BG_STYLES[bgVariant];
  const inverted = bgVariant === 'maroon' || bgVariant === 'dark' || bgVariant === 'charcoal';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={clsx(
        'relative w-full py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden border-b',
        ground,
        className
      )}
    >
      <div className={clsx("mx-auto max-w-[80rem] relative z-10", innerClassName)}>
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6">
          <MlaStaggerItem y={10}>
            <span
              aria-hidden="true"
              className={clsx(
                'font-mono text-xs uppercase tracking-widest font-bold',
                inverted ? 'text-yellow-400' : 'text-maroon-700'
              )}
            >
              SEC · {String(index).padStart(2, '0')}
            </span>
          </MlaStaggerItem>
          
          <MlaStaggerItem y={15}>
            <MlaTextReveal delay={0.1}>
              <h2
                id={`${id}-heading`}
                className={clsx(
                  'font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight',
                  inverted ? 'text-white' : 'text-charcoal-900'
                )}
              >
                {title}
              </h2>
            </MlaTextReveal>
          </MlaStaggerItem>
        </div>

        <MlaLineReveal 
          className={clsx(
            'mb-12 h-px w-full',
            inverted ? 'bg-yellow-400/30' : 'bg-charcoal-900/15'
          )}
        />

        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  );
}
