#!/usr/bin/env tsx
/**
 * Content governance gate. Runs in CI.
 *
 * Three failures are non-negotiable on a public information site:
 *
 *   1. A record claiming `verified` or `reported` without a named source —
 *      an unsourced factual claim wearing a badge that says it was checked.
 *   2. A record missing one of its two languages, which would put an English
 *      paragraph on a Tamil page.
 *   3. Unverified content reaching a production build.
 *
 * A `verified` record whose source is only a news report is also an error:
 * "verified" on this site means a primary government source, and the type
 * system cannot express that distinction on its own.
 *
 * Unverified content in a NON-production build is expected, and is reported as
 * information rather than failure — it is how the team sees what still needs
 * filling in.
 */
import { NEWS } from '../src/content/news';
import { DOCUMENTS } from '../src/content/documents';
import { GALLERY } from '../src/content/gallery';
import {
  EGMORE_RESULT_METRICS,
  EGMORE_WARD_METRICS,
  HOME_METRICS,
  SCHOOL_EDUCATION_METRICS,
  TAMIL_DEVELOPMENT_METRICS,
} from '../src/content/metrics';
import { SOCIAL_LINKS } from '../src/config/site';
import { PORTALS } from '../src/config/portals';
import { hasRequiredSource, isPublishable, type Bilingual } from '../src/lib/content/types';
import type { SourceType } from '../src/lib/content/source';

interface Problem {
  readonly where: string;
  readonly what: string;
}

const errors: Problem[] = [];
const pending: Problem[] = [];
const notes: Problem[] = [];

const isProductionCheck =
  process.env.NODE_ENV === 'production' || process.env.CI_PRODUCTION === '1';

/** Source tiers that justify the word "verified" on this site. */
const PRIMARY_TIERS: readonly SourceType[] = [
  'government-website',
  'government-portal',
  'government-order',
  'assembly-record',
  'official-press-release',
];

function checkBilingual(where: string, field: string, value: Bilingual | undefined): void {
  if (!value) {
    errors.push({ where, what: `missing "${field}"` });
    return;
  }
  for (const locale of ['en', 'ta'] as const) {
    if (!value[locale]?.trim()) {
      errors.push({ where, what: `"${field}" has no ${locale} text` });
    }
  }
}

type Checkable = {
  readonly id: string;
  readonly verification: Parameters<typeof isPublishable>[0]['verification'];
  readonly source?: { readonly sourceName: Bilingual; readonly sourceType?: SourceType };
  readonly published?: boolean;
};

function checkRecord(collection: string, record: Checkable, fields: Record<string, Bilingual>) {
  const where = `${collection}/${record.id}`;

  for (const [name, value] of Object.entries(fields)) {
    checkBilingual(where, name, value);
  }

  if (!hasRequiredSource(record)) {
    errors.push({ where, what: `marked "${record.verification}" but carries no named source` });
  }

  // A conflict note is rendered to the reader in the metadata block, so an
  // English-only value puts an English paragraph on a Tamil page.
  const note = (record.source as { conflictNote?: Bilingual } | undefined)?.conflictNote;
  if (note) checkBilingual(where, 'source.conflictNote', note);

  if (
    record.verification === 'verified' &&
    record.source?.sourceType &&
    !PRIMARY_TIERS.includes(record.source.sourceType)
  ) {
    errors.push({
      where,
      what: `marked "verified" but its source is "${record.source.sourceType}" — downgrade to "reported"`,
    });
  }

  if (record.verification === 'unverified') {
    pending.push({ where, what: 'awaiting verified content' });

    if (isProductionCheck && record.published !== false && isPublishable(record, 'production')) {
      errors.push({ where, what: 'unverified content would render in production' });
    }
  }
}

/* -------------------------------------------------------------------------- */

for (const portal of PORTALS) {
  checkBilingual(`portal/${portal.id}`, 'title', portal.title);
  checkBilingual(`portal/${portal.id}`, 'standfirst', portal.standfirst);
  for (const [index, facet] of portal.facets.entries()) {
    checkBilingual(`portal/${portal.id}`, `facets[${index}]`, facet);
  }
}

for (const item of NEWS) {
  checkRecord('news', item, { title: item.title, summary: item.summary });
  if (item.image) checkBilingual(`news/${item.id}`, 'image.alt', item.image.alt);
}

for (const doc of DOCUMENTS) {
  checkRecord('document', doc, { title: doc.title, summary: doc.summary });

  // A document row must not offer View/Download for a file that is not there.
  if (doc.documentUrl && !/^(https?:)?\//.test(doc.documentUrl)) {
    errors.push({ where: `document/${doc.id}`, what: 'documentUrl is not a URL or a path' });
  }
}

for (const image of GALLERY) {
  checkRecord('gallery', image, { title: image.title });
  checkBilingual(`gallery/${image.id}`, 'image.alt', image.image.alt);
}

const metricGroups = {
  home: HOME_METRICS,
  'school-education': SCHOOL_EDUCATION_METRICS,
  'tamil-development': TAMIL_DEVELOPMENT_METRICS,
  'egmore-result': EGMORE_RESULT_METRICS,
  'egmore-wards': EGMORE_WARD_METRICS,
};

for (const [group, metrics] of Object.entries(metricGroups)) {
  for (const metric of metrics) {
    checkRecord(`metric:${group}`, metric, { label: metric.label, measures: metric.measures });

    // The rule the brief states twice: never show a zero for a missing number.
    if (metric.value !== null && /^(0|0\+|₹0(\s|$))/.test(metric.value.trim())) {
      errors.push({
        where: `metric:${group}/${metric.id}`,
        what: `value "${metric.value}" looks like a placeholder zero — use null instead`,
      });
    }

    if (metric.value !== null && metric.verification === 'unverified') {
      errors.push({
        where: `metric:${group}/${metric.id}`,
        what: 'has a value but is marked unverified',
      });
    }
  }
}

for (const link of SOCIAL_LINKS) {
  const where = `social/${link.id}`;
  checkBilingual(where, 'label', link.label);

  if (link.verified && !link.verificationDate) {
    errors.push({ where, what: 'marked verified without a verification date' });
  }

  // A share/redirect URL is not a canonical account page and must never be
  // published as an official channel.
  if (link.verified && /facebook\.com\/share\//.test(link.url)) {
    errors.push({ where, what: 'a /share/ redirect cannot be published as an official account' });
  }

  if (!link.verified) {
    notes.push({ where, what: link.note ?? 'unverified — withheld from the site' });
  }
}

/* -------------------------------------------------------------------------- */

for (const problem of errors) {
  console.error(`ERROR  ${problem.where}: ${problem.what}`);
}

if (pending.length > 0) {
  console.log(`\n${pending.length} record(s) awaiting verified content:`);
  for (const problem of pending) console.log(`  pending  ${problem.where}`);
}

if (notes.length > 0) {
  console.log(`\n${notes.length} record(s) deliberately withheld:`);
  for (const problem of notes) console.log(`  held     ${problem.where}: ${problem.what}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} content governance error(s).`);
  process.exit(1);
}

console.log('\nContent governance: OK');
