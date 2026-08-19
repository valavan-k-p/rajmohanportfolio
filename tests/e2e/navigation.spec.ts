import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * E2E coverage for the flows spec §34 names.
 *
 * The navigation assertions are not cosmetic: "the four portals must be usable
 * without a mouse" and "the subject must never be obscured" are release gates
 * in both specifications, so they are asserted rather than eyeballed.
 */

const PORTALS = [
  { slug: 'school-education', en: 'School Education' },
  { slug: 'tamil-development', en: 'Tamil Development' },
  { slug: 'information-publicity', en: 'Information & Publicity' },
  { slug: 'mla-egmore', en: 'MLA · Egmore' },
] as const;

test.describe('master navigation', () => {
  test('renders the supplied photograph with no overlay applied to it', async ({ page }) => {
    await page.goto('/');

    const image = page.locator('img').first();
    await expect(image).toBeVisible();

    // The photograph is a supplied asset: no scrim, filter or opacity change.
    const styles = await image.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { filter: cs.filter, opacity: cs.opacity };
    });
    expect(styles.filter).toBe('none');
    expect(styles.opacity).toBe('1');

    // Decorative — must not be announced.
    await expect(image).toHaveAttribute('alt', '');
  });

  test('exposes all four portals with descriptive accessible names', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: /portal/i });

    for (const portal of PORTALS) {
      await expect(nav.getByRole('link', { name: new RegExp(portal.en, 'i') })).toBeVisible();
    }
  });

  test('is fully operable by keyboard alone', async ({ page }) => {
    test.skip(test.info().project.name === 'mobile', 'Keyboard nav is a desktop gate.');

    await page.goto('/');

    // Exactly one portal is in the tab order (roving tabindex).
    const tabbable = page.locator('nav[aria-label] a[tabindex="0"]');
    await expect(tabbable).toHaveCount(1);

    await tabbable.focus();
    await expect(tabbable).toBeFocused();

    // Arrow keys move within the group and reach a different portal.
    const firstName = await tabbable.getAttribute('aria-label');
    await page.keyboard.press('ArrowDown');
    const focusedName = await page.evaluate(() =>
      document.activeElement?.getAttribute('aria-label'),
    );
    expect(focusedName).not.toBe(firstName);

    // Enter activates.
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/en\/(school-education|tamil-development)/);
  });

  test('never covers the central subject at any breakpoint', async ({ page }) => {
    for (const size of [
      { width: 1920, height: 1080 },
      { width: 1280, height: 720 },
      { width: 900, height: 600 },
      { width: 375, height: 812 },
    ]) {
      await page.setViewportSize(size);
      await page.goto('/');

      const overlaps = await page.evaluate(() => {
        const img = document.querySelector('img');
        if (!img) return 'no-image';
        const box = img.getBoundingClientRect();
        const isDesktop = window.innerWidth >= 768;

        return [...document.querySelectorAll('nav[aria-label] li')].some((li) => {
          const r = li.getBoundingClientRect();
          if (!isDesktop) {
            // Below md the portals must sit entirely BELOW the photograph.
            return r.top < box.bottom - 1;
          }
          // Above md they may overlay the image, but never the subject band
          // measured at x 38-63% (docs/PHASE-0-AUDIT.md §F).
          const x0 = (100 * (r.left - box.left)) / box.width;
          const x1 = (100 * (r.right - box.left)) / box.width;
          return x1 > 38 && x0 < 63;
        });
      });

      expect(overlaps, `subject obscured at ${size.width}x${size.height}`).toBe(false);
    }
  });
});

test.describe('portals', () => {
  for (const portal of PORTALS) {
    test(`${portal.slug} renders in English and Tamil`, async ({ page }) => {
      await page.goto(`/en/${portal.slug}`);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        new RegExp(portal.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
      );

      await page.goto(`/ta/${portal.slug}`);
      // Tamil pages must actually contain Tamil script, not fall back to Latin.
      const tamil = await page.evaluate(
        () => (document.body.innerText.match(/[஀-௿]/g) ?? []).length,
      );
      expect(tamil).toBeGreaterThan(50);
      await expect(page.locator('[lang="ta"]').first()).toBeVisible();
    });
  }

  test('every portal has exactly one h1 and no skipped heading levels', async ({ page }) => {
    for (const portal of PORTALS) {
      await page.goto(`/en/${portal.slug}`);

      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

      const skips = await page.evaluate(() => {
        const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
          Number(h.tagName[1]),
        );
        let count = 0;
        for (let i = 1; i < levels.length; i += 1) {
          if (levels[i]! - levels[i - 1]! > 1) count += 1;
        }
        return count;
      });
      expect(skips, `${portal.slug} skips a heading level`).toBe(0);
    }
  });
});

test.describe('language switching', () => {
  test('keeps the reader on the same page', async ({ page }) => {
    await page.goto('/en/tamil-development');
    await page.getByRole('link', { name: 'தமிழ்' }).first().click();
    // Must land on the Tamil version of THIS page, not a language home page.
    await expect(page).toHaveURL(/\/ta\/tamil-development/);
  });
});

test.describe('accessibility', () => {
  const ROUTES = ['/', '/en/school-education', '/ta/tamil-development', '/en/mla-egmore'];

  for (const route of ROUTES) {
    test(`${route} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );

      expect(
        blocking.map((v) => `${v.id}: ${v.help}`),
        `axe violations on ${route}`,
      ).toEqual([]);
    });
  }
});

test.describe('health', () => {
  test('exposes an ALB health endpoint', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { status: string };
    expect(body.status).toBe('ok');
  });
});
