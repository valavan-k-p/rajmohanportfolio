/**
 * Shared empty / unavailable state. Spec §32: never leave a user staring at a
 * blank screen — an empty list must say what would appear here and why it does
 * not yet.
 */
export function EmptyState({
  title,
  body,
  action,
}: {
  readonly title: string;
  readonly body: string;
  readonly action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 border border-border bg-white p-8">
      <h2 className="font-display text-h3 text-ink">{title}</h2>
      <p className="max-w-text text-body text-ink-muted">{body}</p>
      {action}
    </div>
  );
}
