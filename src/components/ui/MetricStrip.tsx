import { cn } from '@/lib/cn';
import type { Metric } from '@/lib/content/schema';
import type { Locale } from '@/lib/i18n/routing';
import { formatDateShort } from '@/lib/i18n/bilingual';

/**
 * KEY FIGURES
 *
 * This component is the fix for the defect the brief calls out twice: the live
 * site's counters render `0` before their animation runs, and a `0` on a public
 * information site is not a placeholder — it is a false statement.
 *
 * Three rules are enforced here rather than left to the caller:
 *
 *  1. `value` is a string. It prints exactly as its source printed it, so
 *     "44,527" is never re-formatted into something the source did not say.
 *  2. `value: null` renders an em dash and the words "Awaiting verified source".
 *     There is no branch that can emit `0`, `0+` or `₹0 Cr`.
 *  3. There is no animation. The number is in the HTML on first paint, which is
 *     also what makes it available to crawlers and screen readers.
 */
export function MetricStrip({
  metrics,
  locale,
  className,
}: {
  metrics: readonly Metric[];
  locale: Locale;
  className?: string;
}) {
  if (metrics.length === 0) return null;

  return (
    <dl
      className={cn(
        'grid grid-cols-1 gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {metrics.map((metric) => (
        <MetricCell key={metric.id} metric={metric} locale={locale} />
      ))}
    </dl>
  );
}

function MetricCell({ metric, locale }: { metric: Metric; locale: Locale }) {
  const unavailable = metric.value === null;
  const unavailableLabel =
    locale === 'ta' ? 'சரிபார்க்கப்பட்ட ஆதாரம் எதிர்பார்க்கப்படுகிறது' : 'Awaiting verified source';

  return (
    // Inside a <dl>, a wrapping <div> may contain ONLY <dt> and <dd>. The
    // "what this measures" and "as of" lines therefore live inside the <dd>
    // rather than beside it — which is also more correct semantically: they
    // describe the value, they are not a second term.
    <div className="bg-paper px-lg py-lg">
      <dt className="u-label">{metric.label[locale]}</dt>

      <dd className="mt-xs">
        <span
          className={cn(
            'font-display text-h1 leading-none tabular-nums',
            unavailable ? 'text-ink-faint' : 'text-ink',
          )}
          // The dash is decorative once the sentence below says what is missing.
          aria-hidden={unavailable || undefined}
        >
          {unavailable ? '—' : metric.value}
        </span>
        {/* The space is a real text node, not just margin — without it a screen
            reader runs the value and the unit together as one word. */}
        {!unavailable && metric.unit ? (
          <> <span className="text-small text-ink-muted">{metric.unit[locale]}</span></>
        ) : null}

        {/* No separate screen-reader text: the dash is aria-hidden and this
            sentence already says the figure is missing. Announcing it twice is
            worse than announcing it once. */}
        <p className="mt-sm text-caption leading-snug text-ink-muted">
          {unavailable ? unavailableLabel : metric.measures[locale]}
        </p>

        {metric.asOf && !unavailable ? (
          <p className="mt-1 text-caption text-ink-faint">
            {locale === 'ta' ? 'நிலவரம்' : 'As of'} {formatDateShort(metric.asOf, locale)}
          </p>
        ) : null}
      </dd>
    </div>
  );
}
