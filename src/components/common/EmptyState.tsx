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
    <div className="flex flex-col items-start gap-3 border border-sand-300 bg-white p-8">
      <h2 className="font-display text-h3 text-charcoal-900">{title}</h2>
      <p className="u-measure text-body text-charcoal-700">{body}</p>
      {action}
    </div>
  );
}
