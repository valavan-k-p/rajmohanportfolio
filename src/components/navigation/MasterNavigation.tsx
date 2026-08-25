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
                  'group block min-h-[44px] px-gutter py-6 md:py-3 no-underline relative',
                  'transition-all duration-[400ms] ease-[var(--ease-out-expo)]',
                  'md:rounded-2xl md:p-[clamp(0.5rem,0.75cqw,1rem)]',
                  'md:bg-maroon-700/90 md:backdrop-blur-xl md:border md:border-maroon-600 md:shadow-[0_8px_32px_rgba(0,0,0,0.2)]',
                  'md:hover:bg-maroon-700 md:hover:-translate-y-1 md:hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] md:hover:border-maroon-500 md:focus-visible:bg-maroon-700',
                  isRecessive ? 'md:opacity-40 md:scale-[0.98] md:blur-[2px]' : 'opacity-100 md:scale-100',
                ].join(' ')}
              >
                {/* Accent glow on hover */}
                <span className="absolute inset-0 bg-gradient-to-tr from-maroon-500/0 via-transparent to-yellow-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none md:rounded-2xl" />

                <span className="u-eyebrow mt-0 block text-white/60 md:mt-[clamp(0.2rem,0.4cqw,0.5rem)] md:text-[clamp(0.5rem,0.5cqw,0.65rem)]">
                  {t(`portals.${key}.index`)}
                </span>

                <span
                  className={[
                    'mt-1 block font-display text-h3 leading-tight text-yellow-400',
                    'md:mt-[clamp(0.125rem,0.25cqw,0.375rem)] md:text-[clamp(0.85rem,1.1cqw,1.35rem)]',
                    'transition-colors duration-[160ms]',
                    'group-hover:text-yellow-300 group-focus-visible:text-yellow-300',
                  ].join(' ')}
                >
                  {t(`portals.${key}.title`)}
                </span>

                <span className="mt-1 flex items-start gap-2 text-meta text-white/90 md:mt-[clamp(0.125rem,0.25cqw,0.375rem)] md:text-[clamp(0.55rem,0.65cqw,0.75rem)] leading-snug">
                  <span className="flex-1">{t(`portals.${key}.meta`)}</span>
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
