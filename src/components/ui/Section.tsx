import { cn } from '@/lib/cn';
import { Container } from './Container';

type Ground = 'paper' | 'sunken' | 'ink';

const GROUND: Record<Ground, string> = {
  paper: 'bg-paper text-ink',
  sunken: 'bg-surface-sunken text-ink',
  ink: 'bg-ink-ground text-ink-inverse',
};

/**
 * A page section.
 *
 * Sections are separated by a hairline rule and vertical space — not by cards,
 * not by alternating colour blocks. `divider` is on by default because a
 * continuous editorial page reads as one document; turn it off for the first
 * section after a hero, where a rule would double up.
 */
export function Section({
  id,
  ground = 'paper',
  divider = true,
  width = 'page',
  className,
  children,
}: {
  id?: string;
  ground?: Ground;
  divider?: boolean;
  width?: React.ComponentProps<typeof Container>['width'];
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-ground={ground === 'ink' ? 'ink' : undefined}
      className={cn(
        'py-section',
        GROUND[ground],
        divider && ground === 'paper' && 'border-t border-border',
        className,
      )}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}

/**
 * The standard heading block: an optional eyebrow, the title, an optional
 * standfirst, and an optional link out to the full archive.
 *
 * `level` exists because a section heading is an `h2` on a portal page but an
 * `h3` inside a sub-panel — the visual size must not dictate the outline.
 */
export function SectionHeader({
  eyebrow,
  title,
  standfirst,
  action,
  level = 2,
  accent,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  action?: React.ReactNode;
  level?: 2 | 3;
  /** CSS colour for the eyebrow, when a portal wants its own. */
  accent?: string;
  className?: string;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';

  return (
    <div
      className={cn(
        'mb-xl flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="max-w-text">
        {eyebrow ? (
          <p className="u-label mb-sm" style={accent ? { color: accent } : undefined}>
            {eyebrow}
          </p>
        ) : null}
        <Heading className={level === 2 ? 'text-h2' : 'text-h3'}>{title}</Heading>
        {standfirst ? (
          <p className="mt-sm text-lead text-ink-muted text-balance">{standfirst}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 sm:pb-1">{action}</div> : null}
    </div>
  );
}
