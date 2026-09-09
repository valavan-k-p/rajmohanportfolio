import Image from 'next/image';
import { IDENTITY } from '@/config/site';
import { media } from '@/content/media/generated';
import { href } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { ButtonLink } from '@/components/ui/Button';

/**
 * THE HERO
 *
 * A split, not an overlay. The photograph sits beside the type rather than
 * under it, which means no scrim, no gradient, no filter and no text competing
 * with a face — and it satisfies the brief's instruction not to crop the
 * subject badly, because the frame never has to make room for a headline.
 *
 * Source order is text then photograph, with no `order` classes. Below `lg`
 * that stacks the name first, which is what the brief's priority list asks for
 * — a phone opening on a photograph alone pushed the name 614px down, below
 * the fold. At `lg` the two-column grid puts the same source order side by
 * side, text left.
 *
 * The name and the designation are one lockup in one family (client note 1.2).
 * Nothing here animates.
 */
export function HomeHero({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const portrait = media('hero-office');

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid w-full max-w-page items-center gap-xl px-gutter py-2xl lg:grid-cols-[1.05fr_0.95fr] lg:gap-3xl lg:py-3xl">
        <div>
          <h1 className="font-display text-display font-semibold leading-[1.06] tracking-[-0.02em]">
            {IDENTITY.name[locale]}
          </h1>

          {/* Same family as the name — weight and size carry the hierarchy. */}
          <p className="mt-md max-w-[26ch] font-display text-lead leading-snug text-ink-muted">
            {IDENTITY.designation[locale]}
          </p>

          <p className="u-label mt-lg border-t border-border pt-md">
            {IDENTITY.constituency[locale]}
          </p>

          <p className="mt-lg max-w-text text-body text-ink-muted">
            {IDENTITY.positioning[locale]}
          </p>

          <div className="mt-xl">
            <ButtonLink href={href(locale, '/portals')}>{t.home.exploreOffice}</ButtonLink>
          </div>
        </div>

        <div>
          {/*
           * The portrait crop is right when the photograph sits BESIDE the
           * type. Below `lg` it sits above it, and on a portrait tablet a
           * full 4:5 frame came out 864px tall — it pushed the name, the
           * designation and the call to action entirely below the fold.
           *
           * The cap turns the frame into a landscape band at those widths.
           * On a phone the natural 4:5 height is already under the cap, so
           * nothing changes there.
           */}
          {/* `w-full` is load-bearing: with only `aspect-ratio` and
              `max-height` set, the browser derives the WIDTH from the clamped
              height and the frame collapses to 333px on a tablet. */}
          <div className="relative aspect-4/5 w-full max-h-[26rem] overflow-hidden bg-surface-sunken md:max-h-[20rem] lg:max-h-none">
            <Image
              src={portrait.src}
              alt={portrait.alt[locale]}
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              placeholder="blur"
              blurDataURL={portrait.blurDataURL}
              // Biased up while cropped, so the cap takes height off the desk
              // rather than off the subject's head.
              className="object-cover object-[50%_26%] lg:object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
