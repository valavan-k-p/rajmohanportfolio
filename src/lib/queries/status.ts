/**
 * Query lifecycle (spec §14, §17, PDF §8).
 *
 * The transition table is data, not scattered `if` statements, so the same
 * rules govern the API route, the admin UI and the tests. Every transition
 * writes history — enforced by trigger in 0001_init.sql, so it cannot be
 * skipped by any code path.
 */

export const QUERY_STATUSES = [
  'SUBMITTED',
  'RECEIVED',
  'UNDER_REVIEW',
  'ASSIGNED',
  'IN_PROGRESS',
  'RESOLVED',
  'NEEDS_INFORMATION',
  'REJECTED',
  'CLOSED',
] as const;

export type QueryStatus = (typeof QUERY_STATUSES)[number];

/** The happy path the specs define as the default lifecycle. */
export const DEFAULT_LIFECYCLE: readonly QueryStatus[] = [
  'SUBMITTED',
  'RECEIVED',
  'UNDER_REVIEW',
  'ASSIGNED',
  'IN_PROGRESS',
  'RESOLVED',
];

const TRANSITIONS: Readonly<Record<QueryStatus, readonly QueryStatus[]>> = {
  SUBMITTED: ['RECEIVED', 'REJECTED'],
  RECEIVED: ['UNDER_REVIEW', 'NEEDS_INFORMATION', 'REJECTED'],
  UNDER_REVIEW: ['ASSIGNED', 'NEEDS_INFORMATION', 'REJECTED'],
  ASSIGNED: ['IN_PROGRESS', 'NEEDS_INFORMATION', 'REJECTED'],
  IN_PROGRESS: ['RESOLVED', 'NEEDS_INFORMATION'],
  // A citizen supplying the missing information returns the query to review.
  NEEDS_INFORMATION: ['UNDER_REVIEW', 'REJECTED', 'CLOSED'],
  RESOLVED: ['CLOSED'],
  REJECTED: ['CLOSED'],
  // Terminal.
  CLOSED: [],
};

/** Statuses from which no further transition is possible. */
export const TERMINAL_STATUSES: readonly QueryStatus[] = ['CLOSED'];

export function canTransition(from: QueryStatus, to: QueryStatus): boolean {
  return TRANSITIONS[from].includes(to);
}

export function allowedTransitions(from: QueryStatus): readonly QueryStatus[] {
  return TRANSITIONS[from];
}

export function isTerminal(status: QueryStatus): boolean {
  return TRANSITIONS[status].length === 0;
}

/** True once the citizen's request has an outcome, for dashboard grouping. */
export function isConcluded(status: QueryStatus): boolean {
  return status === 'RESOLVED' || status === 'REJECTED' || status === 'CLOSED';
}

/**
 * Status is announced as TEXT, never by colour alone — MASTER.md §7 and the
 * MLA portal's stricter floor both require it.
 */
export const STATUS_LABELS: Readonly<Record<QueryStatus, { en: string; ta: string }>> = {
  SUBMITTED: { en: 'Submitted', ta: 'சமர்ப்பிக்கப்பட்டது' },
  RECEIVED: { en: 'Received', ta: 'பெறப்பட்டது' },
  UNDER_REVIEW: { en: 'Under review', ta: 'பரிசீலனையில்' },
  ASSIGNED: { en: 'Assigned', ta: 'ஒதுக்கப்பட்டது' },
  IN_PROGRESS: { en: 'In progress', ta: 'நடைபெற்று வருகிறது' },
  RESOLVED: { en: 'Resolved', ta: 'தீர்க்கப்பட்டது' },
  NEEDS_INFORMATION: { en: 'Needs information', ta: 'தகவல் தேவை' },
  REJECTED: { en: 'Rejected', ta: 'நிராகரிக்கப்பட்டது' },
  CLOSED: { en: 'Closed', ta: 'மூடப்பட்டது' },
};
