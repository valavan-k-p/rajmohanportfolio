import { STATUS_LABELS, type QueryStatus } from '@/lib/queries/status';

/**
 * Status is carried by TEXT. Colour is a secondary cue only — MASTER.md §7
 * forbids colour as the sole carrier of meaning, and pages/mla-egmore.md §6
 * raises that to an explicit requirement because of who uses that portal.
 */
const TONE: Record<QueryStatus, string> = {
  SUBMITTED: 'border-charcoal-500 text-charcoal-700',
  RECEIVED: 'border-charcoal-500 text-charcoal-700',
  UNDER_REVIEW: 'border-maroon-600 text-maroon-700',
  ASSIGNED: 'border-maroon-600 text-maroon-700',
  IN_PROGRESS: 'border-maroon-600 text-maroon-700',
  RESOLVED: 'border-maroon-800 bg-maroon-800 text-white',
  NEEDS_INFORMATION: 'border-yellow-600 text-charcoal-900',
  REJECTED: 'border-charcoal-700 text-charcoal-700',
  CLOSED: 'border-charcoal-500 text-charcoal-500',
};

export function QueryStatusBadge({
  status,
  locale,
}: {
  readonly status: QueryStatus;
  readonly locale: 'en' | 'ta';
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[2px] border px-3 py-1 text-meta ${TONE[status]}`}
    >
      {STATUS_LABELS[status][locale]}
    </span>
  );
}
