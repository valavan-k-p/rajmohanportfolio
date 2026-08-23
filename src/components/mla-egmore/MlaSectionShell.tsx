'use client';

import type { ReactNode } from 'react';
import type { SectionLayout } from '@/data/portals';
import { motion, useReducedMotion } from 'motion/react';

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

export interface MlaSectionShellProps {
  readonly id: string;
  readonly title: string;
  readonly layout: SectionLayout;
  readonly index: number;
  readonly children?: ReactNode;
}

const EASE = [0.16, 1, 0.3, 1];

export function MlaSectionShell({ id, title, layout, index, children }: MlaSectionShellProps) {
  const ground = GROUND[layout] ?? 'bg-white';
  const inner = INNER[layout] ?? 'max-w-[72rem]';
  const inverted = layout === 'data-band' || layout === 'full-bleed';
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`px-gutter py-section ${ground} overflow-hidden`}
    >
      <div className={`mx-auto ${inner}`}>
        <div className="mb-8 flex items-baseline gap-4">
          <motion.span
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-hidden="true"
            className={`u-eyebrow ${inverted ? 'text-yellow-400' : 'text-maroon-700'}`}
          >
            {String(index).padStart(2, '0')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            id={`${id}-heading`}
            className={`font-display text-h2 ${inverted ? 'text-white' : 'text-charcoal-900'}`}
          >
            {title}
          </motion.h2>
        </div>

        <motion.div
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          style={{ transformOrigin: 'left' }}
          aria-hidden="true"
          className={`mb-10 h-px w-full ${inverted ? 'bg-white/25' : 'bg-sand-300'}`}
        />

        {children}
      </div>
    </section>
  );
}
