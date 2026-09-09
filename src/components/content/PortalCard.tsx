import Image from 'next/image';
import Link from 'next/link';
import type { PortalDefinition } from '@/config/portals';
import { href } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';

/**
 * A portal entry.
 *
 * The client asked for the ordinal numerals to go and the arrangement to become
 * vertical (handwritten note 1.3: "NO Need Nos. — change to Vertical"). So there
 * is no "01 —", and the list stacks: each portal is a full-width row of image,
 * title, facets and standfirst, read top to bottom.
 *
 * A 2px rule in the portal's own colour is the only decoration, and the only
 * place that colour appears outside the portal itself.
 */
export function PortalCard({
  portal,
  locale,
  priority = false,
}: {
  portal: PortalDefinition;
  locale: Locale;
  priority?: boolean;
}) {
  const facets = portal.facets.map((facet) => facet[locale]).join(' · ');

  return (
    <article className="group relative grid items-start gap-lg border-t-2 pt-lg md:grid-cols-[minmax(0,22rem)_1fr] md:gap-xl" style={{ borderTopColor: portal.accentVar }}>
      <div className="relative aspect-16/9 overflow-hidden bg-surface-sunken">
        <Image
          src={portal.cover}
          alt=""
          fill
          sizes="(min-width: 768px) 22rem, 100vw"
          priority={priority}
          className="object-cover"
        />
      </div>

      <div className="md:pt-1">
        <h3 className="text-h2">
          <Link
            href={href(locale, `/${portal.slug}`)}
            className="u-stretch no-underline transition-colors duration-fast ease-standard group-hover:text-accent"
          >
            {portal.title[locale]}
          </Link>
        </h3>

        <p className="u-label mt-sm" style={{ color: portal.accentVar }}>
          {facets}
        </p>

        <p className="mt-md max-w-text text-ink-muted">{portal.standfirst[locale]}</p>
      </div>
    </article>
  );
}
