import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Instrument_Serif, Noto_Sans_Tamil, Noto_Serif_Tamil } from 'next/font/google';
import '@/styles/globals.css';

/**
 * Fonts are self-hosted by next/font at build time — no runtime request to
 * Google, no layout shift, no third-party connection on first paint.
 * Tamil is a parallel first-class stack (MASTER.md §2), not a fallback.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ['tamil'],
  variable: '--font-noto-serif-tamil',
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-noto-sans-tamil',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Rajmohan Arumugam',
    template: '%s · Rajmohan Arumugam',
  },
  description:
    'Public-service platform for School Education, Tamil Development, Information & Publicity, and the Egmore constituency.',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FFF6D9',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    instrumentSerif.variable,
    instrumentSans.variable,
    notoSerifTamil.variable,
    notoSansTamil.variable,
  ].join(' ');

  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
