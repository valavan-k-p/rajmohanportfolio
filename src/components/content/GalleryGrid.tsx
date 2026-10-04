'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/cn';
import type { GalleryImage } from '@/lib/content/schema';
import { formatDateShort } from '@/lib/i18n/bilingual';
import type { Locale } from '@/lib/i18n/routing';

export interface GalleryStrings {
  readonly label: string;
  readonly close: string;
  readonly previous: string;
  readonly next: string;
  /** Template with {index} and {total} placeholders. */
  readonly position: string;
}

/**
 * A gallery grid with a lightbox.
 *
 * There is no carousel and nothing advances on its own. The lightbox opens on
 * click or Enter, moves with the arrow keys, closes on Escape, and returns
 * focus to the thumbnail that opened it — Radix's dialog handles the trap and
 * the focus return; the arrow keys are wired here.
 *
 * The counter is announced politely rather than assertively, so paging through
 * a dozen photographs does not interrupt a screen-reader user mid-sentence.
 */
export function GalleryGrid({
  images,
  locale,
  strings,
  columns = 3,
}: {
  images: readonly GalleryImage[];
  locale: Locale;
  strings: GalleryStrings;
  columns?: 2 | 3 | 4;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = images.length;

  const move = useCallback(
    (delta: number) => {
      setOpenIndex((current) => (current === null ? null : (current + delta + total) % total));
    },
    [total],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        move(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        move(-1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openIndex, move]);

  const active = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul
        aria-label={strings.label}
        className={cn(
          'grid gap-md',
          columns === 2 && 'sm:grid-cols-2',
          columns === 3 && 'sm:grid-cols-2 md:grid-cols-3',
          columns === 4 && 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
        )}
      >
        {images.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-3/2 overflow-hidden bg-surface-sunken">
                <Image
                  src={item.image.src}
                  alt={item.image.alt[locale]}
                  fill
                  sizes="(min-width: 768px) 31vw, (min-width: 640px) 46vw, 92vw"
                  placeholder="blur"
                  blurDataURL={item.image.blurDataURL}
                  className="object-cover transition-opacity duration-base ease-standard group-hover:opacity-90"
                />
              </span>
              <span className="mt-sm block text-small text-ink group-hover:text-accent">
                {item.title[locale]}
              </span>
              {item.date || item.location ? (
                <span className="u-meta mt-0.5 block">
                  {[item.location?.[locale], item.date ? formatDateShort(item.date, locale) : null]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root
        open={openIndex !== null}
        onOpenChange={(next: boolean) => {
          if (!next) setOpenIndex(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-ink-ground/92" />
          <Dialog.Content className="fixed inset-0 z-50 flex flex-col" data-ground="ink">
            {active ? (
              <>
                <div className="flex items-center justify-between gap-md px-gutter py-md text-ink-inverse">
                  <Dialog.Title className="text-small">{active.title[locale]}</Dialog.Title>
                  <Dialog.Close
                    className="rounded-sm border border-ink-inverse-muted/50 px-sm py-1.5 text-caption transition-colors duration-fast hover:border-ink-inverse"
                    aria-label={strings.close}
                  >
                    {strings.close}
                  </Dialog.Close>
                </div>

                <div className="relative min-h-0 flex-1">
                  <Image
                    key={active.id}
                    src={active.image.src}
                    alt={active.image.alt[locale]}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                <div className="flex items-center justify-between gap-md px-gutter py-md">
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    className={lightboxButton}
                    disabled={total < 2}
                  >
                    {strings.previous}
                  </button>

                  <p
                    aria-live="polite"
                    className="text-caption text-ink-inverse-muted tabular-nums"
                  >
                    {strings.position
                      .replace('{index}', String((openIndex ?? 0) + 1))
                      .replace('{total}', String(total))}
                  </p>

                  <button
                    type="button"
                    onClick={() => move(1)}
                    className={lightboxButton}
                    disabled={total < 2}
                  >
                    {strings.next}
                  </button>
                </div>

                <p className="border-t border-ink-inverse-muted/25 px-gutter py-sm text-caption text-ink-inverse-muted">
                  {active.image.alt[locale]}
                </p>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

const lightboxButton =
  'rounded-sm border border-ink-inverse-muted/50 px-md py-2 text-caption text-ink-inverse ' +
  'transition-colors duration-fast ease-standard hover:border-ink-inverse disabled:opacity-40';
