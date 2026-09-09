import { describe, expect, it } from 'vitest';
import { NEWS } from '@/content/news';
import { DOCUMENTS } from '@/content/documents';
import { GALLERY } from '@/content/gallery';
import {
  EGMORE_RESULT_METRICS,
  EGMORE_WARD_METRICS,
  HOME_METRICS,
  SCHOOL_EDUCATION_METRICS,
  TAMIL_DEVELOPMENT_METRICS,
} from '@/content/metrics';
import { hasRequiredSource, isPublishable } from '@/lib/content/types';
import { paginate, parseFilter, parsePage, publishable, yearsIn } from '@/lib/content/query';
import { locales } from '@/lib/i18n/routing';

const ALL_METRICS = [
  ...HOME_METRICS,
  ...SCHOOL_EDUCATION_METRICS,
  ...TAMIL_DEVELOPMENT_METRICS,
  ...EGMORE_RESULT_METRICS,
  ...EGMORE_WARD_METRICS,
];

describe('data honesty', () => {
  /**
   * The defect this whole content layer exists to prevent: the previous site
   * rendered `0` for figures it did not have.
   */
  it('never expresses a missing number as a zero', () => {
    for (const metric of ALL_METRICS) {
      if (metric.value === null) continue;
      expect(metric.value.trim(), metric.id).not.toMatch(/^(0|0\+|₹\s?0(\s|$))/);
    }
  });

  it('marks a metric with no value as unverified, and one with a value as sourced', () => {
    for (const metric of ALL_METRICS) {
      if (metric.value === null) {
        expect(metric.verification, metric.id).toBe('unverified');
      } else {
        expect(hasRequiredSource(metric), metric.id).toBe(true);
      }
    }
  });

  it('states what every figure measures', () => {
    for (const metric of ALL_METRICS) {
      for (const locale of locales) {
        expect(metric.measures[locale].trim(), `${metric.id}/${locale}`).not.toBe('');
      }
    }
  });
});

describe('provenance', () => {
  const records = [...NEWS, ...DOCUMENTS, ...GALLERY];

  it('gives every published record a named source in both languages', () => {
    for (const record of records) {
      expect(hasRequiredSource(record), record.id).toBe(true);
      for (const locale of locales) {
        expect(record.source.sourceName[locale].trim(), record.id).not.toBe('');
      }
    }
  });

  it('writes every conflict note in both languages', () => {
    // The note renders to the reader, so an English-only value would put an
    // English paragraph on a Tamil page.
    for (const record of records) {
      const note = record.source.conflictNote;
      if (!note) continue;
      for (const locale of locales) {
        expect(note[locale]?.trim(), `${record.id} conflictNote/${locale}`).toBeTruthy();
      }
    }
  });

  it('never marks a news-report source as verified', () => {
    // "Verified" on this site means a primary government source.
    for (const record of records) {
      if (record.source.sourceType === 'news-report') {
        expect(record.verification, record.id).not.toBe('verified');
      }
    }
  });

  it('withholds unverified records from production', () => {
    for (const record of records) {
      if (record.verification === 'unverified') {
        expect(isPublishable(record, 'production'), record.id).toBe(false);
      }
    }
  });
});

describe('bilingual completeness', () => {
  it('never leaves a Tamil field empty on a published record', () => {
    for (const item of NEWS) {
      expect(item.title.ta.trim(), item.id).not.toBe('');
      expect(item.summary.ta.trim(), item.id).not.toBe('');
    }
    for (const doc of DOCUMENTS) {
      expect(doc.title.ta.trim(), doc.id).not.toBe('');
      expect(doc.summary.ta.trim(), doc.id).not.toBe('');
    }
  });

  it('gives every photograph alt text in both languages', () => {
    for (const image of GALLERY) {
      for (const locale of locales) {
        expect(image.image.alt[locale].trim(), image.id).not.toBe('');
      }
    }
  });

  it('never reuses the English string as the Tamil one', () => {
    for (const item of NEWS) {
      expect(item.title.ta, item.id).not.toBe(item.title.en);
      expect(item.summary.ta, item.id).not.toBe(item.summary.en);
    }
  });
});

describe('query helpers', () => {
  it('drops unpublished records', () => {
    const base = NEWS[0]!;
    const mixed = [
      { ...base, id: 'a', published: true },
      { ...base, id: 'b', published: false },
      { ...base, id: 'c', published: true, verification: 'unverified' as const },
    ];
    // 'c' is publishable outside production, so this asserts the published flag
    // specifically, independent of NODE_ENV.
    expect(publishable(mixed).map((r) => r.id)).not.toContain('b');
    expect(publishable(mixed).map((r) => r.id)).toContain('a');
  });

  it('clamps an out-of-range page instead of returning nothing', () => {
    const items = Array.from({ length: 12 }, (_, i) => i);
    expect(paginate(items, 99, 5).page).toBe(3);
    expect(paginate(items, 99, 5).items).toHaveLength(2);
    expect(paginate(items, -4, 5).page).toBe(1);
    expect(paginate([], 1, 5).pageCount).toBe(1);
  });

  it('refuses a search param that is not a known filter', () => {
    expect(parseFilter('news', ['news', 'media'] as const)).toBe('news');
    expect(parseFilter('<script>', ['news', 'media'] as const)).toBeUndefined();
    expect(parsePage('abc')).toBe(1);
  });

  it('lists the years present, newest first', () => {
    expect(yearsIn([{ date: '2024-01-01' }, { date: '2026-05-05' }])).toEqual(['2026', '2024']);
  });
});
