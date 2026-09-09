import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { NewsItem } from '@/lib/content/schema';
import { getPortal } from '@/config/portals';
import { formatDateShort } from '@/lib/i18n/bilingual';
import { href } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';
import { SourceBadge } from '@/components/ui/SourceBadge';

/**
 * The unified news feed.
 *
 * A list of rules, not a grid of cards. Each row carries the date, the portal
 * it belongs to, the headline, a summary and the attribution — which is what
 * makes the feed readable at a glance and keeps the homepage from becoming the
 * "wall of cards" the brief warns against.
 */
export function NewsList({
  items,
  locale,
  showImages = true,
  className,
}: {
  items: readonly NewsItem[];
  locale: Locale;
  showImages?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn('divide-y divide-border border-y border-border', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <NewsRow item={item} locale={locale} showImage={showImages} />
        </li>
      ))}
    </ul>
  );
}

function NewsRow({
  item,
  locale,
  showImage,
}: {
  item: NewsItem;
  locale: Locale;
  showImage: boolean;
}) {
  const portal = getPortal(item.department);
  const withImage = showImage && item.image;

  return (
    <article
      className={cn(
        'group relative grid gap-md py-lg',
        withImage ? 'sm:grid-cols-[1fr_minmax(0,11rem)] sm:gap-xl' : undefined,
      )}
    >
      <div className="min-w-0">
        <p className="u-meta flex flex-wrap items-center gap-x-sm gap-y-1">
          <time dateTime={item.date}>{formatDateShort(item.date, locale)}</time>
          <span aria-hidden="true" className="text-border-strong">
            ·
          </span>
          <span style={{ color: portal.accentVar }}>{portal.title[locale]}</span>
        </p>

        <h3 className="mt-xs text-h3">
          <Link
            href={href(locale, `/news/${item.slug}`)}
            className="u-stretch no-underline transition-colors duration-fast ease-standard group-hover:text-accent"
          >
            {item.title[locale]}
          </Link>
        </h3>

        <p className="mt-sm max-w-text text-small text-ink-muted">{item.summary[locale]}</p>

        <SourceBadge source={item.source} locale={locale} className="mt-sm" />
      </div>

      {withImage && item.image ? (
        <div className="relative order-first aspect-3/2 overflow-hidden bg-surface-sunken sm:order-last">
          <Image
            src={item.image.src}
            alt=""
            fill
            sizes="(min-width: 640px) 11rem, 100vw"
            placeholder="blur"
            blurDataURL={item.image.blurDataURL}
            className="object-cover"
          />
        </div>
      ) : null}
    </article>
  );
}
