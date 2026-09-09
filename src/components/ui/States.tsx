import { cn } from '@/lib/cn';
import type { Locale } from '@/lib/i18n/routing';

/**
 * EMPTY / LOADING / ERROR
 *
 * All three share one frame so a list that is empty, loading or broken sits in
 * the same box and the page does not jump between states.
 *
 * The empty state deliberately does not apologise or promise. Where an archive
 * genuinely has no records yet, it says so and points at the official source
 * that does — which is more useful than "Coming soon".
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border border-dashed border-border bg-surface-sunken px-lg py-2xl text-center',
        className,
      )}
    >
      <p className="font-display text-h3 text-ink">{title}</p>
      {description ? (
        <p className="mx-auto mt-sm max-w-text text-small text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-lg flex justify-center">{action}</div> : null}
    </div>
  );
}

/** The standard "this archive is not populated yet" state. */
export function AwaitingSource({
  locale,
  officialSite,
  className,
}: {
  locale: Locale;
  officialSite?: { label: string; url: string };
  className?: string;
}) {
  return (
    <EmptyState
      className={className}
      title={locale === 'ta' ? 'இன்னும் பதிவுகள் இல்லை' : 'No records published yet'}
      description={
        locale === 'ta'
          ? 'சரிபார்க்கப்பட்ட ஆதாரத்திலிருந்து ஆவணங்கள் கிடைத்தவுடன் இப்பகுதி நிரப்பப்படும். சரிபார்க்கப்படாத எதுவும் இங்கு வெளியிடப்படாது.'
          : 'This archive is filled from verified sources only. Nothing is published here until the source document is in hand.'
      }
      action={
        officialSite ? (
          <a
            href={officialSite.url}
            target="_blank"
            rel="noopener noreferrer external"
            className="u-tap text-small text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-current"
          >
            {locale === 'ta' ? 'அலுவல்முறைத் தளம்: ' : 'Official source: '}
            {officialSite.label}
          </a>
        ) : null
      }
    />
  );
}

/**
 * Skeleton rows. Static — no shimmer animation, which would violate the motion
 * budget and, at this length, only distracts.
 */
export function LoadingState({ rows = 4, label }: { rows?: number; label: string }) {
  return (
    <div role="status" aria-live="polite" className="divide-y divide-border border-y border-border">
      <span className="u-sr-only">{label}</span>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="flex flex-col gap-2 py-lg" aria-hidden="true">
          <div className="h-3 w-24 bg-surface-sunken" />
          <div className="h-5 w-3/4 bg-surface-sunken" />
          <div className="h-3 w-1/2 bg-surface-sunken" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      role="alert"
      className="border border-status-alert/30 bg-accent-soft px-lg py-xl text-center"
    >
      <p className="font-display text-h3 text-accent-hover">{title}</p>
      {description ? (
        <p className="mx-auto mt-sm max-w-text text-small text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-lg flex justify-center">{action}</div> : null}
    </div>
  );
}
