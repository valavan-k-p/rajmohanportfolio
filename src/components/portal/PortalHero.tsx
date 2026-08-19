import Link from 'next/link';
import type { PortalId } from '@/config/portals';

/**
 * Per-portal hero.
 *
 * Each portal must "feel like a new website" (spec §41), so the hero is where
 * the four visual worlds diverge hardest — different ground, different type
 * treatment, different alignment. The shared structure underneath is only the
 * back-link, the h1 and the standfirst.
 */

interface HeroTreatment {
  readonly ground: string;
  readonly title: string;
  readonly standfirst: string;
  readonly align: string;
  readonly eyebrow: string;
}

const TREATMENTS: Record<PortalId, HeroTreatment> = {
  // White, grid-ordered, left-ranged. The "daylight" portal.
  'school-education': {
    ground: 'bg-white',
    title: 'text-charcoal-900',
    standfirst: 'text-charcoal-700',
    align: 'text-left items-start',
    eyebrow: 'text-maroon-700',
  },
  // Sand-dominant, centred, deepest maroon. Type IS the hero image here —
  // no photograph (design-system/pages/tamil-development.md §4).
  'tamil-development': {
    ground: 'bg-sand-200',
    title: 'text-maroon-800',
    standfirst: 'text-charcoal-700',
    align: 'text-center items-center',
    eyebrow: 'text-maroon-700',
  },
  // Newsroom: black-and-white foundation, dense, left-ranged.
  'information-publicity': {
    ground: 'bg-charcoal-900',
    title: 'text-white',
    standfirst: 'text-white/75',
    align: 'text-left items-start',
    eyebrow: 'text-yellow-400',
  },
  // Warmest, plainest ground. A public office, not a ministry.
  'mla-egmore': {
    ground: 'bg-sand-50',
    title: 'text-charcoal-900',
    standfirst: 'text-charcoal-700',
    align: 'text-left items-start',
    eyebrow: 'text-maroon-600',
  },
};

export interface PortalHeroProps {
  readonly portal: PortalId;
  readonly index: string;
  readonly title: string;
  readonly standfirst: string;
  readonly backLabel: string;
}

export function PortalHero({ portal, index, title, standfirst, backLabel }: PortalHeroProps) {
  const treatment = TREATMENTS[portal];
  const inverted = portal === 'information-publicity';

  return (
    <header className={`px-gutter pb-section pt-12 ${treatment.ground}`}>
      <div className={`mx-auto flex max-w-[76rem] flex-col gap-6 ${treatment.align}`}>
        <Link
          href="/"
          className={[
            'u-eyebrow inline-flex items-center gap-2 no-underline',
            'transition-opacity duration-[160ms] hover:opacity-70',
            inverted ? 'text-white/70' : 'text-charcoal-700',
          ].join(' ')}
        >
          <span aria-hidden="true">&larr;</span>
          {backLabel}
        </Link>

        <span aria-hidden="true" className={`u-eyebrow ${treatment.eyebrow}`}>
          {index}
        </span>

        <h1 className={`font-display text-display ${treatment.title}`}>{title}</h1>

        <p className={`u-measure text-lead ${treatment.standfirst}`}>{standfirst}</p>
      </div>
    </header>
  );
}
