'use client';

import type { ReactNode } from 'react';
import type { SectionLayout } from '@/data/portals';
import { motion, useReducedMotion } from 'motion/react';
import {
  InfoHeadingMask,
  InfoHorizontalLine,
  InfoScrollProgressBar,
  CINEMATIC_EASE,
  VIEWPORT_CONFIG,
} from './InfoMotion';

const GROUND: Partial<Record<SectionLayout, string>> = {
  statement: 'bg-sand-100/60',
  'prose-columns': 'bg-sand-100/60',
  'data-band': 'bg-charcoal-900 text-white',
  'feature-word': 'bg-sand-200',
  'full-bleed': 'bg-charcoal-900 text-white',
  contact: 'bg-sand-100',
};

const INNER: Partial<Record<SectionLayout, string>> = {
  statement: 'max-w-[54rem] mx-auto',
  'numbered-list': 'max-w-[72rem]',
  'prose-columns': 'max-w-[74rem]',
  'editorial-index': 'max-w-[80rem]',
  'link-list': 'max-w-[72rem]',
  table: 'max-w-[80rem]',
  roll: 'max-w-[72rem]',
  catalogue: 'max-w-[76rem]',
  'feature-word': 'max-w-[46rem] mx-auto text-center',
  'category-grid': 'max-w-[80rem]',
  'media-grid': 'max-w-[82rem]',
  timeline: 'max-w-[80rem]',
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
  const inner = INNER[layout] ?? 'max-w-[78rem]';
  const inverted = layout === 'data-band' || layout === 'full-bleed';
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative px-4 sm:px-6 md:px-8 py-16 md:py-24 ${ground} border-b border-sand-200/80 transition-colors overflow-hidden`}
    >
      {/* Global Scroll Progress Bar on first section */}
      {index === 1 && <InfoScrollProgressBar />}

      <div className={`mx-auto ${inner}`}>
        {/* Newsroom Section Masthead / Header Rule */}
        <div className="mb-12">
          {/* Top Divider with Drawing Animation */}
          <div className="pb-3 flex flex-wrap items-center justify-between gap-2">
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
              className="flex items-center gap-3"
            >
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
            </motion.div>

            <motion.span
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
              className="text-xs text-charcoal-400 font-mono tracking-tight hidden sm:inline-block"
            >
              TN DIPR OFFICIAL DISPATCH
            </motion.span>
          </div>

          {/* Heavy Editorial Masthead Line */}
          <InfoHorizontalLine
            color={inverted ? 'bg-yellow-400/80' : 'bg-charcoal-900'}
            thickness="h-[2px]"
            duration={0.8}
          />

          {/* Large Editorial Headline Mask */}
          <div className="mt-5">
            <InfoHeadingMask delay={0.1}>
              <h2
                id={`${id}-heading`}
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight leading-[1.08] ${
                  inverted ? 'text-white' : 'text-charcoal-900'
                }`}
              >
                {title}
              </h2>
            </InfoHeadingMask>
          </div>
        </div>

        {/* Section Content with Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.75, delay: 0.2, ease: CINEMATIC_EASE }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
