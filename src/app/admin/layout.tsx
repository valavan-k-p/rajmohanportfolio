import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s · Admin' },
  // The whole admin surface is excluded from indexing.
  robots: { index: false, follow: false, nocache: true },
};

// Admin is never statically generated or edge-cached (spec §20).
export const dynamic = 'force-dynamic';

/**
 * Admin is "a separate application experience" (spec §16), so it deliberately
 * does not inherit the public portals' editorial chrome: denser, plainer, and
 * built for people who use it all day rather than visit once.
 */
const NAV = [
  { href: '/admin/dashboard', label: 'Overview' },
  { href: '/admin/queries', label: 'Queries' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/departments', label: 'Departments' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/users', label: 'Citizens' },
  { href: '/admin/settings', label: 'Settings' },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-maroon-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[16rem_1fr]">
        <aside className="border-b border-sand-300 bg-sand-50 px-6 py-6 md:border-b-0 md:border-r">
          <Link href="/admin/dashboard" className="u-eyebrow text-maroon-700 no-underline">
            Rajmohan · Admin
          </Link>

          <nav aria-label="Admin sections" className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:gap-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-meta text-charcoal-700 no-underline hover:text-maroon-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main id="admin-main" className="px-6 py-8 md:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
