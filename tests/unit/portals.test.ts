import { describe, expect, it } from 'vitest';
import { PORTALS, PORTAL_IDS, getPortal, getPortalBySlug } from '@/config/portals';
import { PRIMARY_NAV, SOCIAL_LINKS, verifiedSocialLinks } from '@/config/site';
import { href, swapLocale, withParams } from '@/lib/i18n/href';
import { locales } from '@/lib/i18n/routing';

describe('portals', () => {
  it('defines exactly the four portals, with unique slugs', () => {
    expect(PORTALS).toHaveLength(4);
    expect(new Set(PORTALS.map((p) => p.slug)).size).toBe(4);
    expect(PORTALS.map((p) => p.id)).toEqual([...PORTAL_IDS]);
  });

  it('gives every portal its own cover image', () => {
    // The brief forbids reusing one photograph across the portals.
    expect(new Set(PORTALS.map((p) => p.cover)).size).toBe(PORTALS.length);
  });

  it('gives every portal its own accent, and no portal borrows another', () => {
    expect(new Set(PORTALS.map((p) => p.accentVar)).size).toBe(PORTALS.length);
  });

  it('resolves by id and by slug', () => {
    for (const portal of PORTALS) {
      expect(getPortal(portal.id)).toBe(portal);
      expect(getPortalBySlug(portal.slug)).toBe(portal);
    }
    expect(getPortalBySlug('not-a-portal')).toBeUndefined();
  });

  it('carries both languages for every label', () => {
    for (const portal of PORTALS) {
      for (const locale of locales) {
        expect(portal.title[locale].trim()).not.toBe('');
        expect(portal.standfirst[locale].trim()).not.toBe('');
        for (const facet of portal.facets) {
          expect(facet[locale].trim()).not.toBe('');
        }
      }
    }
  });
});

describe('navigation', () => {
  it('keeps the primary navigation small', () => {
    // "Keep header minimal. No giant navigation." — brief §11.
    expect(PRIMARY_NAV.length).toBeLessThanOrEqual(7);
  });
});

describe('locale-prefixed hrefs', () => {
  it('prefixes every path', () => {
    expect(href('en', '/news')).toBe('/en/news');
    expect(href('ta', 'news')).toBe('/ta/news');
    expect(href('ta')).toBe('/ta');
    expect(href('en', '/')).toBe('/en');
  });

  it('swaps only the locale segment, keeping the reader in place', () => {
    expect(swapLocale('/en/school-education/go', 'ta')).toBe('/ta/school-education/go');
    expect(swapLocale('/ta', 'en')).toBe('/en');
    expect(swapLocale('/', 'ta')).toBe('/ta');
  });

  it('drops empty params so URLs stay clean', () => {
    expect(withParams('/en/news', { category: undefined, page: '2' })).toBe('/en/news?page=2');
    expect(withParams('/en/news', { category: undefined })).toBe('/en/news');
  });
});

describe('official social accounts', () => {
  it('never publishes a facebook /share/ redirect as an official account', () => {
    for (const link of verifiedSocialLinks()) {
      expect(link.url).not.toMatch(/facebook\.com\/share\//);
    }
  });

  it('requires a verification date on every published account', () => {
    for (const link of verifiedSocialLinks()) {
      expect(link.verificationDate, `${link.id} is published without a check date`).toBeTruthy();
    }
  });

  it('withholds every account that could not be confirmed', () => {
    const withheld = SOCIAL_LINKS.filter((link) => !link.verified);
    expect(withheld.length).toBeGreaterThan(0);
    for (const link of withheld) {
      expect(verifiedSocialLinks()).not.toContain(link);
      // An editor needs to know why something is being held back.
      expect(link.note?.trim()).toBeTruthy();
    }
  });
});
