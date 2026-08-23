'use client';

import Link from 'next/link';
import type { PortalId } from '@/config/portals';
import { motion, useReducedMotion } from 'motion/react';

// Using the mla-egmore treatment exactly as defined in PortalHero.tsx
const treatment = {
  ground: 'bg-sand-50',
  title: 'text-charcoal-900',
  standfirst: 'text-charcoal-700',
  align: 'text-left items-start',
  eyebrow: 'text-maroon-600',
};

export interface MlaHeroProps {
  readonly portal: PortalId; // expected to be 'mla-egmore'
  readonly index: string;
  readonly title: string;
  readonly standfirst: string;
  readonly backLabel: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function MlaHero({ index, title, standfirst, backLabel }: MlaHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className={`px-gutter pb-section pt-12 ${treatment.ground}`}>
      <div className={`mx-auto flex max-w-[76rem] flex-col gap-6 ${treatment.align}`}>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            href="/"
            className={[
              'u-eyebrow inline-flex items-center gap-2 no-underline group',
              'transition-opacity duration-[160ms] hover:opacity-70',
              'text-charcoal-700',
            ].join(' ')}
          >
            <motion.span
              aria-hidden="true"
              whileHover={prefersReducedMotion ? {} : { x: -4 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="inline-block"
            >
              &larr;
            </motion.span>
            <motion.span
              whileHover={prefersReducedMotion ? {} : { x: 2 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="inline-block"
            >
              {backLabel}
            </motion.span>
          </Link>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          aria-hidden="true"
          className={`u-eyebrow ${treatment.eyebrow}`}
        >
          {index}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          className={`font-display text-display ${treatment.title}`}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className={`u-measure text-lead ${treatment.standfirst}`}
        >
          {standfirst}
        </motion.p>
      </div>
    </header>
  );
}
