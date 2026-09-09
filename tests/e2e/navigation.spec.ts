import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * End-to-end gates for the redesign.
 *
 * These assert the promises the brief treats as non-negotiable — bilingual
 * parity, no fabricated zeros, no horizontal overflow, minimal motion,
 * accessibility — rather than cosmetics. Anything asserted here is something
 * that would be a defect if it regressed, not a preference.
 */

const PORTALS = [
  { slug: 'school-education', en: 'School Education' },
  { slug: 'tamil-development', en: 'Tamil Development' },
  { slug: 'information-publicity', en: 'Information & Publicity' },
  { slug: 'egmore', en: 'MLA · Egmore' },
] as const;

const KEY_ROUTES = [
  '/en',
  '/ta',
  '/en/about',
  '/en/news',
  '/en/documents',
  '/en/media',
  '/en/search',
  ...PORTALS.map((p) => `/en/${p.slug}`),
];

test.describe('entry', () => {
  test('the root forwards into a locale', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/(en|ta)$/);
  });

  test('the homepage leads with the name and the designation', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Rajmohan Arumugam/);
    // Scoped to the hero: the designation legitimately also appears in the
    // header lockup and in the footer, and an unscoped match is ambiguous.
    await expect(
      page
        .locator('#main')
        .getByText(/Minister for School Education, Tamil Development and Information/)
        .first(),
    ).toBeVisible();
  });

  test('the name and the designation share one type family', async ({ page }) => {
    // Client handwritten note 1.2. Different size and weight are expected;
    // a different family is the defect.
    await page.goto('/en');
    const families = await page.evaluate(() => {
      const h1 = document.querySelector('h1')!;
      const designation = h1.nextElementSibling!;
      const family = (el: Element) => getComputedStyle(el).fontFamily;
      return { name: family(h1), designation: family(designation) };
    });
    expect(families.designation).toBe(families.name);
  });

  test('lists the four portals without ordinal numerals', async ({ page }) => {
    // Client handwritten note 1.3: "NO Need Nos."
    await page.goto('/en');
    for (const portal of PORTALS) {
      await expect(
        page.getByRole('link', { name: new RegExp(escapeRe(portal.en), 'i') }).first(),
      ).toBeVisible();
    }

    const numerals = await page.evaluate(() =>
      [...document.querySelectorAll('h3')].filter((h) => /^0[1-4]\b/.test(h.textContent ?? ''))
        .length,
    );
    expect(numerals).toBe(0);
  });
});

test.describe('portals', () => {
  for (const portal of PORTALS) {
    test(`${portal.slug} renders in English and Tamil`, async ({ page }) => {
      await page.goto(`/en/${portal.slug}`);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        new RegExp(escapeRe(portal.en), 'i'),
      );

      await page.goto(`/ta/${portal.slug}`);
      const tamil = await page.evaluate(
        () => (document.body.innerText.match(/[஀-௿]/g) ?? []).length,
      );
      expect(tamil, 'Tamil page fell back to Latin script').toBeGreaterThan(200);
    });
  }

  test('every portal has one h1 and no skipped heading levels', async ({ page }) => {
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

  test('gives each portal its own cover photograph', async ({ page }) => {
    const covers = new Set<string>();
    for (const portal of PORTALS) {
      await page.goto(`/en/${portal.slug}`);
      const src = await page.locator('header img').first().getAttribute('src');
      expect(src, `${portal.slug} has no cover`).toBeTruthy();
      covers.add(new URL(src!, 'http://x').searchParams.get('url') ?? src!);
    }
    expect(covers.size, 'a cover photograph is reused between portals').toBe(PORTALS.length);
  });
});

test.describe('data honesty', () => {
  test('never renders a placeholder zero in a key figure', async ({ page }) => {
    for (const route of ['/en', '/en/school-education', '/en/egmore']) {
      await page.goto(route);
      const values = await page.evaluate(() =>
        [...document.querySelectorAll('dd')].map((dd) => dd.textContent?.trim() ?? ''),
      );
      for (const value of values) {
        expect(value, `placeholder zero on ${route}`).not.toMatch(/^(0|0\+|₹\s?0(\s|$))/);
      }
    }
  });

  test('shows a dash and an explanation where a figure is missing', async ({ page }) => {
    await page.goto('/en/egmore');
    await expect(page.getByText('Awaiting verified source').first()).toBeVisible();
  });

  test('attributes every news item to a named source', async ({ page }) => {
    await page.goto('/en/news');
    const articles = page.locator('article');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      await expect(articles.nth(i).getByText(/^Source:/)).toBeVisible();
    }
  });
});

test.describe('language switching', () => {
  test('keeps the reader on the same page, at any depth', async ({ page }) => {
    await page.goto('/en/school-education/budget');
    await page.getByRole('link', { name: /தமிழ்/ }).first().click();
    await expect(page).toHaveURL(/\/ta\/school-education\/budget/);

    await page.getByRole('link', { name: /English/i }).first().click();
    await expect(page).toHaveURL(/\/en\/school-education\/budget/);
  });

  test('every key route exists in both languages', async ({ page }) => {
    for (const route of KEY_ROUTES) {
      const ta = route.replace('/en', '/ta');
      const response = await page.goto(ta);
      expect(response?.status(), `${ta} is missing`).toBeLessThan(400);
    }
  });
});

test.describe('layout', () => {
  test('never scrolls horizontally, at any breakpoint', async ({ page }) => {
    for (const size of [
      { width: 1920, height: 1080 },
      { width: 1280, height: 720 },
      { width: 768, height: 1024 },
      { width: 375, height: 812 },
    ]) {
      await page.setViewportSize(size);
      for (const route of ['/ta', '/ta/documents', '/ta/school-education', '/ta/media']) {
        await page.goto(route);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${route} overflows at ${size.width}px`).toBeLessThanOrEqual(1);
      }
    }
  });
});

test.describe('motion', () => {
  test('honours prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');

    const longest = await page.evaluate(() => {
      const parse = (value: string) =>
        Math.max(
          0,
          ...value.split(',').map((v) => {
            const trimmed = v.trim();
            const n = Number.parseFloat(trimmed);
            return trimmed.endsWith('ms') ? n : n * 1000;
          }),
        );
      return Math.max(
        0,
        ...[...document.querySelectorAll('body *')].map((el) => {
          const cs = getComputedStyle(el);
          return Math.max(parse(cs.transitionDuration), parse(cs.animationDuration));
        }),
      );
    });

    expect(longest, 'a transition survives prefers-reduced-motion').toBeLessThan(1);
  });

  test('keeps transitions inside the motion budget', async ({ page }) => {
    await page.goto('/en');
    const longest = await page.evaluate(() =>
      Math.max(
        0,
        ...[...document.querySelectorAll('body *')].flatMap((el) =>
          getComputedStyle(el)
            .transitionDuration.split(',')
            .map((v) => {
              const trimmed = v.trim();
              const n = Number.parseFloat(trimmed);
              return trimmed.endsWith('ms') ? n : n * 1000;
            }),
        ),
      ),
    );
    // The brief caps usability transitions at 200ms.
    expect(longest).toBeLessThanOrEqual(200);
  });
});

test.describe('accessibility', () => {
  const ROUTES = [
    '/en',
    '/ta',
    '/en/school-education',
    '/ta/tamil-development',
    '/en/egmore',
    '/en/documents',
    '/en/news',
    '/en/media',
  ];

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

  test('the skip link reaches the main landmark', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('href'));
    expect(focused).toBe('#main');
    await expect(page.locator('#main')).toHaveCount(1);
  });
});

test.describe('health', () => {
  test('reports a status the load balancer can act on', async ({ request }) => {
    const response = await request.get('/api/health');

    const body = (await response.json()) as {
      status: string;
      supabase: string;
      uptimeSeconds: number;
    };

    // The contract is the STATUS/CODE pairing, not a fixed 200. Reporting 503
    // when the backend is unconfigured is the point: the balancer drains the
    // instance instead of routing citizens to a broken page. This suite runs
    // deliberately unconfigured, so 503 is the correct answer here.
    if (body.supabase === 'configured') {
      expect(response.status()).toBe(200);
      expect(body.status).toBe('ok');
    } else {
      expect(response.status()).toBe(503);
      expect(body.status).toBe('degraded');
    }

    expect(typeof body.uptimeSeconds).toBe('number');
    expect(response.headers()['cache-control']).toContain('no-store');
  });
});

function escapeRe(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
