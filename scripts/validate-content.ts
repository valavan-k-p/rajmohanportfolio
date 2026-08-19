#!/usr/bin/env tsx
/**
 * Content governance gate (spec §36, audit §H-7). Runs in CI.
 *
 * Two failures are non-negotiable on an official portal:
 *   1. A record claiming `verified` or `reported` without a source. That is an
 *      unsourced factual claim wearing a badge that says it was checked.
 *   2. Unverified content reaching a production build.
 *
 * Unverified content in a NON-production build is expected and reported as
 * information, not failure — it is how the team sees what still needs filling.
 */
import { PORTAL_CONTENT } from '../src/data/portals';
import { hasRequiredSource, isPublishable } from '../src/lib/content/types';

interface Problem {
  readonly where: string;
  readonly what: string;
}

const errors: Problem[] = [];
const pending: Problem[] = [];

const isProductionCheck = process.env.NODE_ENV === 'production' || process.env.CI_PRODUCTION === '1';

for (const [portalId, portal] of Object.entries(PORTAL_CONTENT)) {
  for (const locale of ['en', 'ta'] as const) {
    if (!portal.title[locale]?.trim()) {
      errors.push({ where: portalId, what: `missing title for locale "${locale}"` });
    }
    if (!portal.standfirst[locale]?.trim()) {
      errors.push({ where: portalId, what: `missing standfirst for locale "${locale}"` });
    }
  }

  for (const section of portal.sections) {
    const where = `${portalId}/${section.id}`;

    // Both locales must exist. A half-translated portal is worse than none.
    for (const locale of ['en', 'ta'] as const) {
      if (!section.title[locale]?.trim()) {
        errors.push({ where, what: `missing title for locale "${locale}"` });
      }
    }

    if (!hasRequiredSource(section)) {
      errors.push({
        where,
        what: `marked "${section.verification}" but carries no source`,
      });
    }

    if (section.verification === 'unverified') {
      pending.push({ where, what: 'awaiting verified content' });

      if (isProductionCheck && isPublishable(section, 'production')) {
        errors.push({ where, what: 'unverified content would render in production' });
      }
    }
  }
}

for (const problem of errors) {
  console.error(`ERROR  ${problem.where}: ${problem.what}`);
}

if (pending.length > 0) {
  console.log(`\n${pending.length} section(s) awaiting verified content:`);
  for (const problem of pending) console.log(`  pending  ${problem.where}`);
  console.log(
    '\nThese render as marked structure in development and staging, and are\n' +
      'withheld from production. No factual claim has been authored for them.',
  );
}

if (errors.length > 0) {
  console.error(`\n${errors.length} content governance error(s).`);
  process.exit(1);
}

console.log('\nContent governance: OK');
