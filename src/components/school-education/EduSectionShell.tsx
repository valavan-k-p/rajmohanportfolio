'use client';

import type { ReactNode } from 'react';
import type { SectionLayout } from '@/data/portals';
import { motion, useReducedMotion } from 'motion/react';

const GROUND: Partial<Record<SectionLayout, string>> = {
  statement: 'bg-sand-100',
  'numbered-list': 'bg-white',
  'asymmetric-left': 'bg-white',
  'full-bleed': 'bg-sand-100',
  'asymmetric-right': 'bg-white',
  'prose-columns': 'bg-sand-100',
  'data-band': 'bg-charcoal-900 text-white',
  staggered: 'bg-white',
  timeline: 'bg-sand-100',
  'editorial-index': 'bg-white',
  'link-list': 'bg-sand-50',
};

const INNER: Partial<Record<SectionLayout, string>> = {
  statement: 'max-w-[50rem] mx-auto',
  'numbered-list': 'max-w-[68rem]',
  'asymmetric-left': 'max-w-[76rem]',
  'full-bleed': 'max-w-[76rem]',
  'asymmetric-right': 'max-w-[76rem]',
  'prose-columns': 'max-w-[72rem]',
  'data-band': 'max-w-[76rem]',
  staggered: 'max-w-[76rem]',
  timeline: 'max-w-[76rem]',
  'editorial-index': 'max-w-[76rem]',
  'link-list': 'max-w-[68rem]',
};

export interface EduSectionShellProps {
  readonly id: string;
  readonly title: string;
  readonly layout: SectionLayout;
  readonly index: number;
  readonly children?: ReactNode;
}

const EASE = [0.16, 1, 0.3, 1];

export function EduSectionShell({
  id,
  title,
  layout,
  index,
  children,
}: EduSectionShellProps) {
  const ground = GROUND[layout] ?? 'bg-white';
  const inner = INNER[layout] ?? 'max-w-[72rem]';
  const inverted = layout === 'data-band';
  const prefersReducedMotion = useReducedMotion();

  const formattedIndex = String(index).padStart(2, '0');

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`px-gutter py-section ${ground} border-b border-sand-300 relative overflow-hidden`}
    >
      <div className={`mx-auto ${inner}`}>
        {/* Section Header */}
        <div className="mb-10">
          <motion.h2
            id={`${id}-heading`}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={`font-display text-h2 mb-4 ${
              inverted ? 'text-white' : 'text-charcoal-900'
            }`}
          >
            {title}
          </motion.h2>

          {/* Full grid width hairline */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ transformOrigin: 'left' }}
            className={`h-[1px] w-full ${
              inverted ? 'bg-charcoal-700' : 'bg-sand-300'
            }`}
          />
        </div>

        {/* Section Body */}
        {children}
      </div>
    </section>
  );
}
