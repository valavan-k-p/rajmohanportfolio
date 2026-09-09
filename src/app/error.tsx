'use client';

import { useEffect } from 'react';

/**
 * Route-level error boundary.
 *
 * The `digest` is shown because it is the only thing that links what a reader
 * saw to what an operator can find in the logs. The error MESSAGE is not shown:
 * it can carry internal detail, and observability must never leak information
 * to the public.
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
    <main id="main" className="flex min-h-dvh items-center bg-paper px-gutter py-section">
      <div className="mx-auto w-full max-w-text" role="alert">
        <p className="u-label">Error</p>

        <h1 className="mt-sm text-h1">Something went wrong</h1>
        <p lang="ta" className="mt-sm font-display text-h2 text-ink-muted">
          ஏதோ தவறு நேர்ந்துள்ளது
        </p>

        <p className="mt-lg text-lead text-ink-muted">
          The page could not be displayed. Trying again may work; if it does not, the
          reference below will help the office trace what happened.
        </p>
        <p lang="ta" className="mt-sm text-ink-muted">
          இப்பக்கத்தைக் காட்ட முடியவில்லை. மீண்டும் முயற்சிக்கலாம்; அது பலனளிக்கவில்லை எனில்,
          கீழே உள்ள குறிப்பு எண் அலுவலகத்திற்கு உதவும்.
        </p>

        {error.digest ? (
          <p className="u-meta mt-lg">
            Reference · குறிப்பு: <span className="font-mono">{error.digest}</span>
          </p>
        ) : null}

        <div className="mt-xl flex flex-wrap gap-md">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-sm border border-ink bg-ink px-lg py-3 text-small font-medium text-ink-inverse transition-colors duration-fast hover:border-accent-hover hover:bg-accent-hover"
          >
            Try again · மீண்டும் முயற்சி
          </button>
          {/* A plain anchor on purpose. This boundary catches render failures,
              and a client-side route transition would reuse the same router
              state that just failed. A full document load is the reliable
              escape hatch. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/en"
            className="inline-flex items-center rounded-sm border border-border-strong px-lg py-3 text-small no-underline transition-colors duration-fast hover:border-ink hover:bg-surface"
          >
            Home · முகப்பு
          </a>
        </div>
      </div>
    </main>
  );
}
