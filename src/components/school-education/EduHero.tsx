'use client';

import Link from 'next/link';
import type { PortalId } from '@/config/portals';
import { motion, useReducedMotion } from 'motion/react';
import type { Locale } from '@/lib/i18n/routing';

export interface EduHeroProps {
  readonly portal: PortalId;
  readonly index: string;
  readonly title: string;
  readonly standfirst: string;
  readonly backLabel: string;
  readonly locale: Locale;
}

const EASE = [0.16, 1, 0.3, 1];

export function EduHero({ index, title, standfirst, backLabel, locale }: EduHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const keyPillars = {
    en: [
      'Foundational Learning (Classes 1–3)',
      'TN SPARK · Emerging Tech & AI',
      'Tamil Nadu Two-Language Policy',
      '₹44,527 Cr Education Budget',
    ],
    ta: [
      'அடிப்படை கற்றல் (வகுப்புகள் 1–3)',
      'டி.என் ஸ்பார்க் · நவீன தொழில்நுட்பம் & AI',
      'இருமொழிக் கொள்கை (தமிழ் & ஆங்கிலம்)',
      '₹44,527 கோடி கல்வி நிதி ஒதுக்கீடு',
    ],
  }[locale];

  return (
    <header className="bg-white px-gutter pt-12 pb-section border-b border-sand-300">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-6 text-left items-start">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
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
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              &larr;
            </motion.span>
            <span>{backLabel}</span>
          </Link>
        </motion.div>

        {/* Index Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
          aria-hidden="true"
          className="u-eyebrow text-maroon-700 font-semibold tracking-widest"
        >
          {index} · {locale === 'ta' ? 'அமைச்சரவை பொறுப்பு' : 'CABINET PORTFOLIO'}
        </motion.span>

        {/* Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="font-display text-display text-charcoal-900 leading-[1.05]"
        >
          {title}
        </motion.h1>

        {/* Standfirst */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          className="u-measure text-lead text-charcoal-700 font-sans leading-relaxed max-w-[54rem]"
        >
          {standfirst}
        </motion.p>

        {/* Policy Pillars Badges */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26, ease: EASE }}
          className="flex flex-wrap gap-2.5 pt-2"
        >
          {keyPillars.map((pillar, i) => (
            <span
              key={i}
              className="inline-flex items-center px-3.5 py-1.5 rounded-none bg-sand-100 border border-sand-300 text-xs text-charcoal-900 font-medium tracking-wide uppercase"
            >
              {pillar}
            </span>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
