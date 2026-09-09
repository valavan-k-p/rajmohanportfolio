import type { Ward } from '@/lib/content/schema';

/**
 * EGMORE WARD DIRECTORY
 *
 * Empty, on purpose.
 *
 * The client asked for the ward list and the total councillor count
 * (handwritten note 3: "Total count / Ward"). The directory UI is built — the
 * table, the search, the responsive stacking, the empty state — but no rows are
 * in it, because no official source has been located that maps Greater Chennai
 * Corporation wards to Assembly Constituency 16.
 *
 * Guessing here would be the worst kind of error this site could make: a wrong
 * ward number sends a resident to the wrong councillor, and a wrong councillor
 * name on a minister's site is a defamatory-adjacent mistake. So the array
 * stays empty until the corporation's own ward delimitation notification, or a
 * Delimitation Commission order, is supplied.
 *
 * To populate: add a `Ward` per row with `verification: 'verified'` and a
 * `source` pointing at that notification. Everything downstream — the count on
 * the portal page, the search, the table — picks it up with no code change.
 */
export const EGMORE_WARDS: readonly Ward[] = [];

/** True while the directory is awaiting its source document. */
export const WARD_DIRECTORY_PENDING = EGMORE_WARDS.length === 0;
