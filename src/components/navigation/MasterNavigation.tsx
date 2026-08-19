'use client';

import { useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PORTALS, resolveArrowTarget } from '@/config/portals';
import { defaultLocale } from '@/lib/i18n/routing';

/**
 * The four navigation portals.
 *
 * Layout is two compositions, not one responsive one (pages/navigation.md §5):
 *
 *  - `<md`  a stacked editorial list BENEATH the photograph. The flanking
 *           columns do not exist at narrow widths, so overlaying there would
 *           cover the subject — which the spec forbids outright.
 *  - `≥md`  absolutely positioned in percentage units against the image, in
 *           the two regions measured to be empty (x 2–35%, x 65–98%).
 *
 * No scrim, no gradient, no filter is applied to the photograph. The upper
 * field measures luminance 8–9/9, so dark ink sits on it directly at 16.52:1
 * (charcoal) and 10.19:1 (maroon) — comfortably past the 7:1 floor.
 */
export function MasterNavigation() {
  const t = useTranslations('nav');
  const [focused, setFocused] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const move = useCallback((to: number) => {
    setFocused(to);
    itemRefs.current[to]?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (!event.key.startsWith('Arrow')) return;
      const target = resolveArrowTarget(index, event.key);
      if (target === null) return;
      event.preventDefault();
      move(target);
    },
    [move],
  );

  return (
    <nav
      aria-label={t('ariaLabel')}
      className="relative z-10 md:absolute md:inset-0 md:h-full md:w-full"
    >
      <h2 className="sr-only">{t('heading')}</h2>

      <ul className="contents">
        {PORTALS.map((portal, index) => {
          const isRecessive = active !== null && active !== index;
          const key = portal.messageKey;

          return (
            <li
              key={portal.id}
              className="border-b border-sand-300 last:border-b-0 md:absolute md:border-b-0"
              style={{
                // Percentage box against the image. Ignored below `md`, where
                // the list is a normal flow element.
                ['--portal-left' as string]: portal.position.left,
                ['--portal-top' as string]: portal.position.top,
                ['--portal-width' as string]: portal.position.width,
                left: 'var(--portal-left)',
                top: 'var(--portal-top)',
                width: 'var(--portal-width)',
              }}
            >
              <a
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                href={`/${defaultLocale}/${portal.slug}`}
                tabIndex={index === focused ? 0 : -1}
                aria-label={t('enterPortal', { portal: t(`portals.${key}.title`) })}
                onKeyDown={(event) => onKeyDown(event, index)}
                onFocus={() => {
                  setFocused(index);
                  setActive(index);
                }}
                onBlur={() => setActive(null)}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                className={[
                  'group block min-h-[44px] px-gutter py-6 no-underline',
                  'transition-[opacity,background-color] duration-[160ms] ease-[var(--ease-out-expo)]',
                  // At `md`+ every dimension is container-relative (cqw against
                  // the image), so the portal scales WITH the photograph. Fixed
                  // px here would overflow the measured safe band on smaller
                  // desktops — verified: a 138px box is 31% of image height at
                  // 800px wide, which collided with the facade.
                  'md:rounded-[2px] md:p-[clamp(0.375rem,0.7cqw,1rem)]',
                  'md:hover:bg-white/8 md:focus-visible:bg-white/8',
                  isRecessive ? 'md:opacity-55' : 'opacity-100',
                ].join(' ')}
              >
                {/* Hairline top rule. Grows from the left on hover/focus —
                    the only motion in the resting state. */}
                <span
                  aria-hidden="true"
                  className={[
                    'hidden h-px w-full origin-left bg-maroon-600 md:block',
                    'transition-transform duration-[160ms] ease-[var(--ease-out-expo)]',
                    'scale-x-100 group-hover:bg-maroon-700 group-focus-visible:bg-maroon-700',
                  ].join(' ')}
                />

                <span className="u-eyebrow mt-0 block text-maroon-700 md:mt-[clamp(0.25rem,0.5cqw,0.75rem)] md:text-[clamp(0.55rem,0.62cqw,0.75rem)]">
                  {t(`portals.${key}.index`)}
                </span>

                <span
                  className={[
                    'mt-1 block font-display text-h3 leading-tight text-charcoal-900',
                    'md:mt-[clamp(0.125rem,0.3cqw,0.5rem)] md:text-[clamp(0.95rem,1.45cqw,1.75rem)]',
                    'transition-colors duration-[160ms]',
                    'group-hover:text-maroon-700 group-focus-visible:text-maroon-700',
                  ].join(' ')}
                >
                  {t(`portals.${key}.title`)}
                </span>

                <span className="mt-1 flex items-center gap-2 text-meta text-charcoal-700 md:mt-[clamp(0.125rem,0.3cqw,0.5rem)] md:text-[clamp(0.65rem,0.8cqw,0.875rem)]">
                  {t(`portals.${key}.meta`)}
                  <span
                    aria-hidden="true"
                    className={[
                      'inline-block translate-x-0 opacity-0',
                      'transition-[transform,opacity] duration-[160ms] ease-[var(--ease-out-expo)]',
                      'group-hover:translate-x-1.5 group-hover:opacity-100',
                      'group-focus-visible:translate-x-1.5 group-focus-visible:opacity-100',
                    ].join(' ')}
                  >
                    &rarr;
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
