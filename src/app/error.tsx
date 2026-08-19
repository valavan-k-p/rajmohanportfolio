'use client';

import { useEffect } from 'react';

/**
 * Route-level error boundary. Spec §32.
 *
 * The `digest` is shown because it is the only thing that links what a citizen
 * saw to what an operator can find in the logs. The error MESSAGE is not shown
 * — it can carry internal detail, and §36 requires that observability never
 * leak information to the public.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[route-error]', error.digest ?? error.message);
  }, [error]);

  return (
    <main id="main" className="flex min-h-dvh items-center bg-sand-100 px-gutter py-section">
      <div className="mx-auto flex max-w-[46rem] flex-col gap-6">
        <span aria-hidden="true" className="u-eyebrow text-maroon-700">
          Error
        </span>

        <h1 className="font-display text-h1 text-charcoal-900">Something went wrong</h1>
        <p lang="ta" className="font-display text-h2 text-charcoal-700">
          ஏதோ தவறு நடந்தது
        </p>

        <p className="u-measure text-lead text-charcoal-700">
          This page could not be loaded. Your data has not been lost.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center rounded-[2px] bg-maroon-700 px-6 py-3 text-meta text-white transition-opacity duration-[160ms] hover:opacity-90"
          >
            Try again · மீண்டும் முயற்சிக்கவும்
          </button>
        </div>

        {error.digest ? (
          <p className="u-tabular text-meta text-charcoal-500">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  );
}
