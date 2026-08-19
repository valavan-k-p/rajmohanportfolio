import { describe, expect, it } from 'vitest';
import { PORTALS, resolveArrowTarget } from '@/config/portals';

/**
 * The master navigation must be fully operable without a mouse — called out in
 * both specifications as a release gate, so it is tested rather than assumed.
 */

const SUBJECT_BAND = { from: 38, to: 63 } as const;
const pct = (v: string) => Number.parseFloat(v);

describe('portal composition', () => {
  it('defines exactly four portals in a 2x2 flanking arrangement', () => {
    expect(PORTALS).toHaveLength(4);
    expect(PORTALS.filter((p) => p.column === 'left')).toHaveLength(2);
    expect(PORTALS.filter((p) => p.column === 'right')).toHaveLength(2);
    expect(new Set(PORTALS.map((p) => `${p.column}-${p.row}`)).size).toBe(4);
  });

  it('never overlaps the central subject (measured at x 38-63% of the image)', () => {
    for (const portal of PORTALS) {
      const left = pct(portal.position.left);
      const right = left + pct(portal.position.width);
      const clears = right <= SUBJECT_BAND.from || left >= SUBJECT_BAND.to;
      expect(clears, `${portal.id} spans ${left}-${right}%, which enters the subject band`).toBe(
        true,
      );
    }
  });

  it('keeps every portal inside the measured flat band (y <= 46% start)', () => {
    for (const portal of PORTALS) {
      expect(pct(portal.position.top)).toBeLessThanOrEqual(46);
    }
  });
});

describe('roving-tabindex arrow navigation', () => {
  const indexOf = (column: 'left' | 'right', row: 0 | 1) =>
    PORTALS.findIndex((p) => p.column === column && p.row === row);

  const topLeft = indexOf('left', 0);
  const bottomLeft = indexOf('left', 1);
  const topRight = indexOf('right', 0);
  const bottomRight = indexOf('right', 1);

  it('moves down and up within a column', () => {
    expect(resolveArrowTarget(topLeft, 'ArrowDown')).toBe(bottomLeft);
    expect(resolveArrowTarget(bottomLeft, 'ArrowUp')).toBe(topLeft);
  });

  it('moves across columns preserving the row', () => {
    expect(resolveArrowTarget(topLeft, 'ArrowRight')).toBe(topRight);
    expect(resolveArrowTarget(bottomRight, 'ArrowLeft')).toBe(bottomLeft);
  });

  it('returns null for a move that would leave the group', () => {
    expect(resolveArrowTarget(topLeft, 'ArrowUp')).toBeNull();
    expect(resolveArrowTarget(topLeft, 'ArrowLeft')).toBeNull();
    expect(resolveArrowTarget(bottomRight, 'ArrowDown')).toBeNull();
    expect(resolveArrowTarget(bottomRight, 'ArrowRight')).toBeNull();
  });

  it('every portal is reachable from every other portal', () => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    for (let start = 0; start < PORTALS.length; start += 1) {
      const seen = new Set<number>([start]);
      const queue = [start];
      while (queue.length > 0) {
        const node = queue.shift()!;
        for (const key of keys) {
          const next = resolveArrowTarget(node, key);
          if (next !== null && !seen.has(next)) {
            seen.add(next);
            queue.push(next);
          }
        }
      }
      expect(seen.size, `portal ${start} cannot reach all others`).toBe(PORTALS.length);
    }
  });
});
