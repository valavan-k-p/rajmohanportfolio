import { STATUS_LABELS, type QueryStatus } from '@/lib/queries/status';

/**
 * Status is carried by TEXT. Colour is a secondary cue only — MASTER.md §7
 * forbids colour as the sole carrier of meaning, and pages/mla-egmore.md §6
 * raises that to an explicit requirement because of who uses that portal.
 */
const TONE: Record<QueryStatus, string> = {
  SUBMITTED: 'border-border-strong text-ink-muted',
  RECEIVED: 'border-border-strong text-ink-muted',
  UNDER_REVIEW: 'border-accent text-accent',
  ASSIGNED: 'border-accent text-accent',
  IN_PROGRESS: 'border-accent text-accent',
  RESOLVED: 'border-accent-hover bg-accent-hover text-white',
  NEEDS_INFORMATION: 'border-status-pending text-ink',
  REJECTED: 'border-border-strong text-ink-muted',
  CLOSED: 'border-border-strong text-ink-faint',
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
      className={`inline-flex items-center rounded-[2px] border px-3 py-1 text-small ${TONE[status]}`}
    >
      {STATUS_LABELS[status][locale]}
    </span>
  );
}
