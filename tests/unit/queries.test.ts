import { describe, expect, it } from 'vitest';
import {
  QUERY_STATUSES,
  DEFAULT_LIFECYCLE,
  canTransition,
  isTerminal,
  isConcluded,
  allowedTransitions,
  STATUS_LABELS,
  type QueryStatus,
} from '@/lib/queries/status';
import {
  formatReference,
  isValidReference,
  normaliseReference,
  parseReference,
} from '@/lib/queries/reference';
import {
  createQuerySchema,
  phoneSchema,
  trackQuerySchema,
  verifyOtpSchema,
} from '@/lib/queries/schema';

describe('query status machine', () => {
  it('walks the default lifecycle end to end', () => {
    for (let i = 0; i < DEFAULT_LIFECYCLE.length - 1; i += 1) {
      const from = DEFAULT_LIFECYCLE[i]!;
      const to = DEFAULT_LIFECYCLE[i + 1]!;
      expect(canTransition(from, to), `${from} -> ${to} should be allowed`).toBe(true);
    }
  });

  it('refuses to skip stages or move backwards', () => {
    expect(canTransition('SUBMITTED', 'RESOLVED')).toBe(false);
    expect(canTransition('RESOLVED', 'IN_PROGRESS')).toBe(false);
    expect(canTransition('UNDER_REVIEW', 'SUBMITTED')).toBe(false);
  });

  it('treats CLOSED as the only terminal status', () => {
    const terminal = QUERY_STATUSES.filter(isTerminal);
    expect(terminal).toEqual(['CLOSED']);
    expect(allowedTransitions('CLOSED')).toHaveLength(0);
  });

  it('lets a NEEDS_INFORMATION query return to review', () => {
    expect(canTransition('IN_PROGRESS', 'NEEDS_INFORMATION')).toBe(true);
    expect(canTransition('NEEDS_INFORMATION', 'UNDER_REVIEW')).toBe(true);
  });

  it('marks only outcome states as concluded', () => {
    expect(QUERY_STATUSES.filter(isConcluded).sort()).toEqual(
      ['CLOSED', 'REJECTED', 'RESOLVED'].sort(),
    );
  });

  it('can always reach a terminal state from any status', () => {
    for (const start of QUERY_STATUSES) {
      const seen = new Set<QueryStatus>([start]);
      const queue: QueryStatus[] = [start];
      let reachedTerminal = false;
      while (queue.length > 0) {
        const node = queue.shift()!;
        if (isTerminal(node)) reachedTerminal = true;
        for (const next of allowedTransitions(node)) {
          if (!seen.has(next)) {
            seen.add(next);
            queue.push(next);
          }
        }
      }
      expect(reachedTerminal, `${start} can never be closed`).toBe(true);
    }
  });

  it('labels every status in both locales', () => {
    for (const status of QUERY_STATUSES) {
      expect(STATUS_LABELS[status].en.length).toBeGreaterThan(0);
      expect(STATUS_LABELS[status].ta.length).toBeGreaterThan(0);
    }
  });
});

describe('reference numbers', () => {
  it('formats as DEPT-YEAR-NNNNNN', () => {
    expect(formatReference('school-education', 2026, 184)).toBe('EDU-2026-000184');
    expect(formatReference('tamil-development', 2026, 91)).toBe('TML-2026-000091');
    expect(formatReference('information-publicity', 2026, 32)).toBe('INF-2026-000032');
    expect(formatReference('mla-egmore', 2026, 145)).toBe('MLA-2026-000145');
  });

  it('round-trips through the parser', () => {
    const parsed = parseReference('EDU-2026-000184');
    expect(parsed).toEqual({
      code: 'EDU',
      portal: 'school-education',
      year: 2026,
      sequence: 184,
    });
  });

  it('rejects malformed references', () => {
    for (const bad of ['EDU-2026-184', 'XXX-2026-000184', 'EDU-26-000184', '', 'EDU2026000184']) {
      expect(isValidReference(bad), `${bad} should be invalid`).toBe(false);
    }
  });

  it('normalises what people actually retype from SMS and paper', () => {
    expect(normaliseReference('  edu 2026 000184 ')).toBe('EDU-2026-000184');
    expect(normaliseReference('edu—2026—000184')).toBe('EDU-2026-000184');
    expect(normaliseReference('EDU_2026_000184')).toBe('EDU-2026-000184');
    expect(isValidReference(normaliseReference('edu 2026 000184'))).toBe(true);
  });
});

describe('server-side validation', () => {
  it('normalises Indian mobile numbers to E.164', () => {
    for (const input of ['9876543210', '+91 98765 43210', '91-9876543210', '(98765) 43210']) {
      expect(phoneSchema.parse(input)).toBe('+919876543210');
    }
  });

  it('rejects numbers that are not valid Indian mobiles', () => {
    for (const bad of ['1234567890', '98765', '+1 415 555 0100', '5876543210']) {
      expect(phoneSchema.safeParse(bad).success, `${bad} should fail`).toBe(false);
    }
  });

  it('requires a 6-digit OTP', () => {
    expect(verifyOtpSchema.safeParse({ phone: '9876543210', code: '123456' }).success).toBe(true);
    expect(verifyOtpSchema.safeParse({ phone: '9876543210', code: '12345' }).success).toBe(false);
    expect(verifyOtpSchema.safeParse({ phone: '9876543210', code: 'abcdef' }).success).toBe(false);
  });

  it('requires a Turnstile token before a query can be created', () => {
    const base = {
      department: 'school-education',
      subject: 'Test subject',
      description: 'A description long enough to pass validation.',
      attachments: [],
    };
    expect(createQuerySchema.safeParse(base).success).toBe(false);
    expect(createQuerySchema.safeParse({ ...base, turnstileToken: 'tok' }).success).toBe(true);
  });

  it('enforces attachment type and size limits', () => {
    const withFile = (mimeType: string, sizeBytes: number) =>
      createQuerySchema.safeParse({
        department: 'mla-egmore',
        subject: 'Test subject',
        description: 'A description long enough to pass validation.',
        turnstileToken: 'tok',
        attachments: [{ fileName: 'f', mimeType, sizeBytes }],
      }).success;

    expect(withFile('image/png', 1024)).toBe(true);
    expect(withFile('application/pdf', 1024)).toBe(true);
    expect(withFile('application/x-msdownload', 1024)).toBe(false);
    expect(withFile('image/png', 11 * 1024 * 1024)).toBe(false);
  });

  it('tracks by reference plus last 4 digits, not reference alone', () => {
    expect(
      trackQuerySchema.safeParse({ reference: 'edu 2026 000184', phoneLast4: '3210' }).success,
    ).toBe(true);
    expect(
      trackQuerySchema.safeParse({ reference: 'EDU-2026-000184', phoneLast4: '32' }).success,
    ).toBe(false);
  });
});
