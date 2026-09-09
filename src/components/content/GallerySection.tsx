import type { GalleryImage } from '@/lib/content/schema';
import type { Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';
import { GalleryGrid } from './GalleryGrid';

/**
 * Server-side wrapper for the gallery.
 *
 * `GalleryGrid` is a client component because the lightbox needs state and key
 * handling. Keeping the string table on the server means the whole `ui()` table
 * — every language, every section — never reaches the browser bundle; only the
 * six strings this gallery actually uses cross the boundary.
 */
export function GallerySection({
  images,
  locale,
  columns = 3,
}: {
  images: readonly GalleryImage[];
  locale: Locale;
  columns?: 2 | 3 | 4;
}) {
  const t = ui(locale);

  return (
    <GalleryGrid
      images={images}
      locale={locale}
      columns={columns}
      strings={{
        label: t.media.galleryLabel,
        close: t.common.close,
        previous: t.common.previous,
        next: t.common.next,
        position: t.a11y.galleryPosition,
      }}
    />
  );
}
