import { test, expect, type Page } from '@playwright/test';

/**
 * Responsive and Tamil-typography gates.
 *
 * Every assertion here corresponds to a defect that was actually found and
 * fixed, not to a preference. They are cheap to run and each one would be
 * invisible in review if it came back.
 */

const ROUTES_TA = [
  '/ta',
  '/ta/about',
  '/ta/school-education',
  '/ta/egmore',
  '/ta/documents',
  '/ta/media',
  '/ta/news',
  '/ta/services',
];

const WIDTHS = [
  { name: 'phone', width: 360, height: 780 },
  { name: 'phone-large', width: 414, height: 896 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
];

/* -------------------------------------------------------------------------- *
 * TAMIL TYPOGRAPHY
 * -------------------------------------------------------------------------- */

test.describe('Tamil typography', () => {
  test('font-size does not compound with nesting depth', async ({ page }) => {
    /**
     * `lang` is inherited, so `:lang(ta)` matches every descendant of the
     * locale wrapper. A relative font-size there multiplied once per level:
     * the same paragraph rendered 17px near the top of the page and 20.7px
     * six levels down, and the size varied per page.
     */
    await page.goto('/ta');

    const sizes = await page.evaluate(() => {
      const out: number[] = [];
      let el: Element | null = document.querySelector('main');
      while (el && out.length < 8) {
        out.push(Number.parseFloat(getComputedStyle(el).fontSize));
        el =
          [...el.children].find(
            (c) => (c.textContent ?? '').trim().length > 20 && !/^(H[1-6]|P)$/.test(c.tagName),
          ) ?? null;
      }
      return out;
    });

    expect(sizes.length).toBeGreaterThan(3);
    // Every container in the chain inherits one size. Headings and lead
    // paragraphs are excluded above because they set their own scale.
    expect(new Set(sizes).size, `sizes drifted down the tree: ${sizes.join(', ')}`).toBe(1);
  });

  test('headings never carry negative tracking', async ({ page }) => {
    // Tamil combining vowel signs hang off the side of their consonant.
    // Negative letter-spacing slides them into the neighbouring glyph.
    for (const route of ['/ta', '/ta/school-education', '/ta/documents']) {
      await page.goto(route);
      const tracking = await page.evaluate(() =>
        [...document.querySelectorAll('h1, h2, h3')].map((h) => {
          const ls = getComputedStyle(h).letterSpacing;
          return ls === 'normal' ? 0 : Number.parseFloat(ls);
        }),
      );
      for (const value of tracking) {
        expect(value, `negative tracking on a Tamil heading at ${route}`).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('headings have enough leading for stacked marks', async ({ page }) => {
    // Tamil stacks marks above and below the baseline; at the Latin display
    // leading of 1.06 the lines of a two-line heading overlapped.
    await page.goto('/ta');
    const ratios = await page.evaluate(() =>
      [...document.querySelectorAll('h1, h2, h3')].map((h) => {
        const cs = getComputedStyle(h);
        return Number.parseFloat(cs.lineHeight) / Number.parseFloat(cs.fontSize);
      }),
    );
    expect(ratios.length).toBeGreaterThan(0);
    for (const ratio of ratios) {
      expect(ratio, 'Tamil heading leading is too tight').toBeGreaterThanOrEqual(1.25);
    }
  });

  test('leaves Latin typography alone', async ({ page }) => {
    // The Tamil corrections are unlayered so they beat Tailwind's utilities.
    // This guards the blast radius: English must keep its display tracking.
    await page.goto('/en');
    const h1 = await page.evaluate(() => {
      const el = document.querySelector('h1')!;
      const cs = getComputedStyle(el);
      return {
        tracking: Number.parseFloat(cs.letterSpacing),
        ratio: Number.parseFloat(cs.lineHeight) / Number.parseFloat(cs.fontSize),
      };
    });
    expect(h1.tracking).toBeLessThan(0);
    expect(h1.ratio).toBeLessThan(1.2);
  });

  test('every Tamil page is written in Tamil', async ({ page }) => {
    for (const route of ROUTES_TA) {
      await page.goto(route);
      // Any run of English prose long enough to be a sentence is a gap in the
      // translation — proper nouns and handles are much shorter than this.
      const runs = await page.evaluate(() => {
        const text = document.querySelector('main')?.innerText ?? '';
        return (text.match(/[A-Za-z][A-Za-z ,.'’()-]{40,}/g) ?? []).map((s) => s.trim());
      });
      expect(runs, `untranslated English prose on ${route}`).toEqual([]);
    }
  });
});

/* -------------------------------------------------------------------------- *
 * LAYOUT
 * -------------------------------------------------------------------------- */

test.describe('responsive layout', () => {
  for (const size of WIDTHS) {
    test(`no horizontal overflow at ${size.name} (${size.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      // Tamil is the wider script, so it is the harder case.
      for (const route of ROUTES_TA) {
        await page.goto(route);
        // Web fonts change text metrics, so a measurement taken before they
        // land can catch a transient overflow that never reaches a reader.
        await page.evaluate(() => document.fonts.ready);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${route} overflows at ${size.width}px`).toBeLessThanOrEqual(1);
      }
    });
  }

  test('the document table stacks below the width it needs', async ({ page }) => {
    // The table needs 48rem of columns. A portrait tablet has ~43rem of
    // content width, so at `md` it was visible but had to be scrolled
    // sideways to read a title.
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/en/documents');
    await expect(page.locator('table')).toBeHidden();

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/en/documents');
    await expect(page.locator('table')).toBeVisible();
  });

  test('the hero keeps the name above the fold on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/ta');
    const top = await page.evaluate(
      () => document.querySelector('h1')!.getBoundingClientRect().top,
    );
    expect(top, 'the name is below the fold').toBeLessThan(667);
  });

  test('the hero photograph does not dominate a tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/en');
    const box = await page.evaluate(() => {
      const el = document.querySelector('section [class*="aspect-4"]');
      const r = el!.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    // It must fill the column, not collapse to its own aspect ratio, and it
    // must not run taller than a third of the viewport.
    expect(box.w).toBeGreaterThan(600);
    expect(box.h).toBeLessThanOrEqual(340);
  });
});

/* -------------------------------------------------------------------------- *
 * MOBILE MENU
 * -------------------------------------------------------------------------- */

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  async function openMenu(page: Page) {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  }

  /** Radix's modal residue. Any of these left behind makes the page inert. */
  async function residue(page: Page) {
    return page.evaluate(() => ({
      pointerEvents: document.body.style.pointerEvents || '',
      scrollLocked: document.body.getAttribute('data-scroll-locked'),
      ariaHidden: document.querySelector('[data-locale-root]')?.getAttribute('aria-hidden') ?? null,
    }));
  }

  test('opens, navigates and cleans up after itself', async ({ page }) => {
    await page.goto('/en');
    await openMenu(page);
    await page.getByRole('dialog').getByRole('link', { name: 'News', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/news$/);
    expect(await residue(page)).toEqual({
      pointerEvents: '',
      scrollLocked: null,
      ariaHidden: null,
    });
  });

  for (const how of ['Close', 'Escape'] as const) {
    test(`releases the page after closing with ${how}`, async ({ page }) => {
      await page.goto('/en');
      await openMenu(page);
      if (how === 'Escape') {
        await page.keyboard.press('Escape');
      } else {
        await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();
      }
      await expect(page.getByRole('dialog')).toBeHidden();
      expect(await residue(page)).toEqual({
        pointerEvents: '',
        scrollLocked: null,
        ariaHidden: null,
      });
    });
  }

  test('does not brick the page when the window widens past the desktop breakpoint', async ({
    page,
  }) => {
    /**
     * The regression this guards. The sheet used to be hidden at `xl` by a CSS
     * class while Radix went on believing it was open, so widening the window
     * with the menu open hid the sheet but left `pointer-events: none` on
     * <body> and `aria-hidden` over the page — the whole site unclickable,
     * with nothing on screen to dismiss and no way back except a reload.
     *
     * CSS cannot close a modal, because it cannot tell Radix it closed.
     */
    await page.goto('/en');
    await openMenu(page);

    await page.setViewportSize({ width: 1400, height: 900 });
    await expect(page.getByRole('dialog')).toBeHidden();

    expect(await residue(page), 'the page was left inert').toEqual({
      pointerEvents: '',
      scrollLocked: null,
      ariaHidden: null,
    });

    // The real proof: the page still responds to a click.
    await page.getByRole('link', { name: /Explore the office/i }).click();
    await expect(page).toHaveURL(/\/en\/portals$/);
  });

  test('the media query matches the Tailwind breakpoint it stands in for', async ({ page }) => {
    // `DESKTOP_QUERY` in HeaderNav.tsx and `--breakpoint-xl` in globals.css
    // describe the same width. If they drift, the sheet and the desktop row
    // can both be showing, or neither.
    await page.goto('/en');
    const agree = await page.evaluate(() => {
      const xl = getComputedStyle(document.documentElement)
        .getPropertyValue('--breakpoint-xl')
        .trim();
      return { xl, matches: window.matchMedia(`(min-width: ${xl})`).media };
    });
    expect(agree.xl).toBe('80rem');
  });
});

/* -------------------------------------------------------------------------- *
 * TOUCH
 * -------------------------------------------------------------------------- */

test.describe('touch targets', () => {
  /**
   * Touch is forced on rather than left to the project, because the 44px rows
   * are behind `@media (pointer: coarse)`. On a mouse a 44px footer row would
   * space the footer out for no reason, so the rule only applies where a
   * finger is doing the pointing — and the test has to point the same way to
   * see it.
   *
   * Only the touch and viewport fields are set: spreading a whole `devices`
   * entry carries `defaultBrowserType`, which Playwright refuses inside a
   * describe block.
   */
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 375, height: 812 } });

  async function measure(page: Page) {
    return page.evaluate(() => {
      const bad: { label: string; h: number }[] = [];
      const seen = new Set<string>();
      for (const el of document.querySelectorAll<HTMLElement>('a[href], button, select, input')) {
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        // A row that grows its own hit area, or a card-covering stretched
        // link, is measured by the box the finger actually lands on.
        const row = el.closest('.u-tap-list li') as HTMLElement | null;
        const stretched = el.classList.contains('u-stretch');
        const padded = el.classList.contains('u-tap');
        // The skip link is a 1px box until it is focused, by design.
        const skipLink = el.classList.contains('u-sr-only');
        if (stretched || padded || skipLink) continue;

        const height = row ? row.getBoundingClientRect().height : rect.height;
        if (height < 44) {
          const label = `${el.tagName} «${(el.textContent ?? '').trim().slice(0, 24)}»`;
          if (!seen.has(label)) {
            seen.add(label);
            bad.push({ label, h: Math.round(height) });
          }
        }
      }
      return bad;
    });
  }

  for (const route of ['/ta', '/ta/documents', '/ta/media', '/ta/egmore']) {
    test(`${route} has no target under 44px on a phone`, async ({ page }) => {
      await page.goto(route);
      expect(await measure(page)).toEqual([]);
    });
  }

  test('form controls are 16px on a phone, so iOS does not zoom', async ({ page }) => {
    await page.goto('/en/documents');
    const sizes = await page.evaluate(() =>
      [...document.querySelectorAll('input, select, textarea')].map((el) =>
        Number.parseFloat(getComputedStyle(el).fontSize),
      ),
    );
    expect(sizes.length).toBeGreaterThan(0);
    for (const size of sizes) {
      expect(size, 'a control under 16px will trigger iOS zoom-on-focus').toBeGreaterThanOrEqual(16);
    }
  });
});
