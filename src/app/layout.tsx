import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Tamil, Noto_Serif_Tamil, Source_Serif_4 } from 'next/font/google';
import '@/styles/globals.css';

/**
 * Two families, each with a Tamil companion.
 *
 * Source Serif 4 / Noto Serif Tamil carry every heading, the name, the
 * designation and editorial prose. Inter / Noto Sans Tamil carry the interface:
 * navigation, metadata, tables, forms.
 *
 * The Tamil faces are declared inside the SAME `font-family` stacks in
 * globals.css rather than behind a `.font-tamil` class. A Tamil proper noun
 * inside an English sentence therefore renders in the matching companion
 * automatically — which is the common case on this site, not the exception.
 *
 * Self-hosted by next/font at build time: no runtime request to Google, no
 * third-party connection on first paint, no layout shift.
 */
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ['tamil'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif-tamil',
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500', '600'],
  variable: '--font-noto-sans-tamil',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rajmohan-mu.vercel.app'),
  title: {
    default: 'Rajmohan Arumugam',
    template: '%s · Rajmohan Arumugam',
  },
  description:
    'Public information from the office of Rajmohan Arumugam — School Education, Tamil Development, Information & Publicity, and the Egmore constituency.',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FCFBF8',
  colorScheme: 'light',
};

const fontVariables = [
  sourceSerif.variable,
  inter.variable,
  notoSerifTamil.variable,
  notoSansTamil.variable,
].join(' ');

/**
 * The locale layout at `src/app/[locale]/layout.tsx` owns `lang`, so this
 * shell only carries the font variables. `suppressHydrationWarning` is not
 * used: nothing here differs between server and client.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `data-scroll-behavior` tells Next.js this page opts into smooth
    // scrolling deliberately, so it suppresses it during route transitions
    // instead of warning. Without it, a route change animates a long scroll.
    <html lang="en" data-scroll-behavior="smooth" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
