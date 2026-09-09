'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/cn';
import type { Locale } from '@/lib/i18n/routing';

export interface NavLink {
  readonly href: string;
  readonly label: string;
}

export interface PortalLink {
  readonly href: string;
  readonly title: string;
  readonly facets: string;
  readonly accent: string;
}

export interface HeaderNavStrings {
  readonly menu: string;
  readonly close: string;
  readonly portals: string;
  readonly primaryNav: string;
  readonly search: string;
  readonly portalsHint: string;
  readonly home: string;
}

/**
 * The width at which the desktop row replaces the sheet.
 *
 * This MUST stay equal to `--breakpoint-xl` in globals.css, which is what the
 * `xl:` Tailwind classes below compile against. A test asserts the two agree,
 * because a drift between them reintroduces the bug documented on
 * `useCloseAtDesktop`.
 */
const DESKTOP_QUERY = '(min-width: 80rem)';

/**
 * Closes the sheet when the layout switches to the desktop row.
 *
 * The bug this exists to prevent: the sheet used to be hidden at `xl` with a
 * CSS class while Radix went on believing it was open. Radix's modal keeps
 * `pointer-events: none` on <body>, a scroll lock, and `aria-hidden` on the
 * rest of the page for as long as it thinks a dialog is showing. So widening
 * the window past 1280px with the menu open — rotating a foldable, dragging a
 * desktop window wider, un-zooming — hid the sheet and left the ENTIRE SITE
 * inert, with nothing on screen to dismiss and no way back except a reload.
 *
 * CSS cannot be the thing that closes a modal, because CSS cannot tell Radix
 * it closed. State closes it now, and the overlay and content no longer carry
 * a responsive `hidden` class at all.
 */
function useCloseAtDesktop(close: () => void): void {
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (query.matches) close();
    };
    // Run once on mount too: a reload at desktop width must not restore a
    // sheet that the layout has no room for.
    onChange();
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [close]);
}

/**
 * Restores the document if the dialog is ever torn down while open.
 *
 * Radix cleans up on close, but not when its own tree is unmounted underneath
 * it — a Fast Refresh in development, an error boundary, or a route change
 * that remounts the locale layout. The residue is the same brick as above:
 * `pointer-events: none` on <body> and `aria-hidden` over the page.
 *
 * This is belt-and-braces on top of `useCloseAtDesktop`, and it is worth the
 * few lines: the failure mode is a public information site that cannot be
 * clicked, and the recovery is a page reload the reader has no reason to guess.
 */
function useModalTeardownGuard(): void {
  useEffect(
    () => () => {
      const body = document.body;
      if (body.style.pointerEvents === 'none') body.style.removeProperty('pointer-events');
      body.removeAttribute('data-scroll-locked');
      for (const el of document.querySelectorAll('[data-aria-hidden]')) {
        el.removeAttribute('aria-hidden');
        el.removeAttribute('data-aria-hidden');
      }
    },
    [],
  );
}

/**
 * The header's interactive parts.
 *
 * The desktop row appears at `xl`, not `lg`. The seven nav labels in Tamil are
 * markedly wider than in English — at 1024px they ran 837px on their own and
 * pushed the lockup, search and language switcher 175px past the viewport. A
 * landscape tablet therefore gets the sheet, which fits both languages at any
 * width.
 *
 * Two disclosures and nothing else. Both are plain show/hide — a 160ms opacity
 * fade on the desktop panel, and Radix's dialog for the mobile sheet, which
 * brings the focus trap, scroll lock and Escape handling that a hand-rolled
 * sheet gets wrong.
 *
 * `Portals` is a disclosure rather than a nav item because the brief asks the
 * header to stay small: the four portals are the site's spine, but listing them
 * plus seven primary links in one row is the "giant navigation" it forbids.
 */
export function HeaderNav({
  locale,
  links,
  portals,
  strings,
}: {
  locale: Locale;
  links: readonly NavLink[];
  portals: readonly PortalLink[];
  strings: HeaderNavStrings;
}) {
  const pathname = usePathname();

  return (
    <>
      <DesktopNav
        pathname={pathname}
        links={links}
        portals={portals}
        strings={strings}
        locale={locale}
      />
      <MobileNav
        pathname={pathname}
        links={links}
        portals={portals}
        strings={strings}
        locale={locale}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function DesktopNav({
  pathname,
  links,
  portals,
  strings,
  locale,
}: {
  pathname: string;
  links: readonly NavLink[];
  portals: readonly PortalLink[];
  strings: HeaderNavStrings;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on route change: the panel must not survive the navigation it caused.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="hidden xl:block">
      <nav aria-label={strings.primaryNav}>
        <ul className="flex items-center gap-1">
          <li>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
              className={cn(
                navItemClass,
                'inline-flex items-center gap-1.5',
                open && 'text-ink after:scale-x-100',
              )}
            >
              {strings.portals}
              <Chevron open={open} />
            </button>
          </li>

          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                className={cn(navItemClass, isActive(pathname, link.href) && activeClass)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Anchored to the header's bottom edge, spanning the full width so the
          four portals get real editorial room instead of a cramped dropdown. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-border bg-paper"
      >
        <div className="mx-auto w-full max-w-page px-gutter py-xl">
          <p className="u-label mb-lg">{strings.portalsHint}</p>
          <ul className="grid gap-px bg-border xl:grid-cols-4">
            {portals.map((portal) => (
              <li key={portal.href} className="bg-paper">
                <Link
                  href={portal.href}
                  className="group block h-full border-t-2 px-lg py-lg no-underline transition-colors duration-fast ease-standard hover:bg-surface-sunken"
                  style={{ borderTopColor: portal.accent }}
                >
                  <span className="block font-display text-h3 text-ink group-hover:text-accent">
                    {portal.title}
                  </span>
                  <span className="u-meta mt-xs block" lang={locale}>
                    {portal.facets}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function MobileNav({
  pathname,
  links,
  portals,
  strings,
  locale,
}: {
  pathname: string;
  links: readonly NavLink[];
  portals: readonly PortalLink[];
  strings: HeaderNavStrings;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => setOpen(false), []);
  useCloseAtDesktop(close);
  useModalTeardownGuard();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="u-tap-box inline-flex items-center justify-center gap-2 rounded-sm border border-border px-md text-caption text-ink transition-colors duration-fast hover:border-ink xl:hidden"
        aria-label={strings.menu}
      >
        <MenuIcon />
        {/* The word is dropped on the narrowest phones, where it pushed the
            header row past the viewport. `aria-label` names the control at
            every width. */}
        <span className="hidden sm:inline">{strings.menu}</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink-ground/40" />
        <Dialog.Content
          aria-label={strings.primaryNav}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sheet flex-col overflow-y-auto bg-paper shadow-sheet"
        >
          <div className="flex items-center justify-between border-b border-border px-gutter py-md">
            <div>
              <Dialog.Title className="u-label">{strings.primaryNav}</Dialog.Title>
              <Dialog.Description className="u-sr-only">Navigation menu</Dialog.Description>
            </div>
            <Dialog.Close
              className="u-tap-box inline-flex items-center rounded-sm border border-border px-md text-caption transition-colors duration-fast hover:border-ink"
              aria-label={strings.close}
            >
              {strings.close}
            </Dialog.Close>
          </div>

          <nav className="px-gutter py-lg">
            <p className="u-label mb-sm">{strings.portals}</p>
            <ul className="mb-xl border-t border-border">
              {portals.map((portal) => (
                <li key={portal.href} className="border-b border-border">
                  <Link
                    href={portal.href}
                    onClick={() => setOpen(false)}
                    className="flex flex-col gap-0.5 py-md no-underline"
                    style={{ boxShadow: `inset 3px 0 0 -1px ${portal.accent}` }}
                  >
                    <span className="pl-md font-display text-h3">{portal.title}</span>
                    <span className="u-meta pl-md" lang={locale}>
                      {portal.facets}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="border-t border-border">
              {links.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                    className={cn(
                      'flex min-h-11 items-center py-md text-body no-underline',
                      isActive(pathname, link.href) && 'font-medium text-accent',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* -------------------------------------------------------------------------- */

const navItemClass =
  'relative inline-block px-sm py-2 text-small text-ink-muted no-underline ' +
  'transition-colors duration-fast ease-standard hover:text-ink ' +
  "after:absolute after:inset-x-sm after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 " +
  'after:bg-accent after:transition-transform after:duration-fast hover:after:scale-x-100';

const activeClass = 'text-ink after:scale-x-100';

/**
 * A link is current when the path matches it exactly, or sits beneath it.
 * `/en` would otherwise match every page, so the locale root is exact-only.
 */
function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  const segments = href.split('/').filter(Boolean);
  if (segments.length <= 1) return false;
  return pathname.startsWith(`${href}/`);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
      className={cn(
        'transition-transform duration-fast ease-standard',
        open && '-scale-y-100',
      )}
    >
      <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
      <path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
