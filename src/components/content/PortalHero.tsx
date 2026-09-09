import Image from 'next/image';
import type { PortalDefinition } from '@/config/portals';
import type { Locale } from '@/lib/i18n/routing';
import { ui } from '@/lib/i18n/ui';

/**
 * A portal's opening.
 *
 * The cover photograph is a full-width band with the type beneath it, not over
 * it — the same decision as the homepage hero, for the same reason. The 2px
 * rule in the portal's own colour is what tells a reader which of the four they
 * are in, and it is the only place that colour appears.
 */
export function PortalHero({
  portal,
  locale,
}: {
  portal: PortalDefinition;
  locale: Locale;
}) {
  const t = ui(locale);
  const facets = portal.facets.map((facet) => facet[locale]).join(' · ');

  return (
    <header className="border-b border-border">
      <div className="relative aspect-16/9 w-full bg-surface-sunken sm:aspect-[21/8]">
        <Image
          src={portal.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        className="mx-auto w-full max-w-page border-t-2 px-gutter pb-2xl pt-lg"
        style={{ borderTopColor: portal.accentVar }}
      >
        <p className="u-label" style={{ color: portal.accentVar }}>
          {facets}
        </p>

        <h1 className="mt-sm text-h1">{portal.title[locale]}</h1>

        <p className="mt-md max-w-text text-lead text-ink-muted">{portal.standfirst[locale]}</p>

        {portal.officialSite ? (
          <p className="mt-lg">
            <a
              href={portal.officialSite}
              target="_blank"
              rel="noopener noreferrer external"
              className="u-tap text-small text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-fast hover:decoration-current"
            >
              {t.common.officialSite}: {new URL(portal.officialSite).hostname}
              <span className="u-sr-only"> ({t.common.newTab})</span>
            </a>
          </p>
        ) : null}
      </div>
    </header>
  );
}
