import Image from 'next/image';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { MasterNavigation } from '@/components/navigation/MasterNavigation';
import { Navbar } from '@/components/navigation/Navbar';

export const metadata: Metadata = {
  title: 'Rajmohan Arumugam',
  description:
    'Entry to the School Education, Tamil Development, Information & Publicity, and Egmore constituency portals.',
  alternates: { canonical: '/' },
};

/**
 * MASTER NAVIGATION — route `/`
 *
 * The supplied photograph is the page. The four portals frame the central
 * subject (measured at x 38–63%) without touching him, and nothing is composited
 * over the image: no scrim, no gradient, no filter.
 *
 * Server component. Only the portal group is client-side, because only it needs
 * keyboard state.
 */
export default async function MasterNavigationPage() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>

      <main id="portals" className="relative min-h-dvh bg-sand-100">
        <Navbar />
        {/* `@container` establishes the query context the portals size against,
            so their type scales with the photograph rather than the viewport. */}
        <div className="@container relative mx-auto w-full max-w-[1920px]">
          {/* Below `md` the image is a fixed upper register cropped to keep the
              subject whole; at `md` and up it is the full 16:9 frame the portals
              are positioned against. */}
          <div className="relative h-[52dvh] w-full md:h-dvh md:max-h-[1080px]">
            <Image
              src="/images/navigation.jpeg"
              alt=""
              fill
              priority
              quality={82}
              sizes="100vw"
              placeholder="blur"
              // Sampled sky (#FFF6D9) as the placeholder, so the load-in is a
              // warm field resolving into the photograph, not a grey flash.
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNGRkY2RDkiLz48L3N2Zz4="
              className="object-cover object-[50%_22%] md:object-cover md:object-[50%_30%]"
            />
          </div>

          {/* One instance only — two landmarks would mean two competing
              tabindex groups. Below `md` it flows beneath the photograph as a
              stacked list; at `md`+ it becomes `absolute inset-0` over the
              image container above. */}
          <MasterNavigation />
        </div>
      </main>
    </NextIntlClientProvider>
  );
}
