import Link from 'next/link';

/**
 * 404. Spec §32 — never a blank screen. Bilingual without knowing the locale,
 * because a 404 by definition may not have matched a locale segment.
 */
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh items-center bg-sand-100 px-gutter py-section">
      <div className="mx-auto flex max-w-[46rem] flex-col gap-6">
        <span aria-hidden="true" className="u-eyebrow text-maroon-700">
          404
        </span>

        <h1 className="font-display text-h1 text-charcoal-900">
          This page could not be found
        </h1>
        <p lang="ta" className="font-display text-h2 text-charcoal-700">
          இந்தப் பக்கம் கிடைக்கவில்லை
        </p>

        <p className="u-measure text-lead text-charcoal-700">
          The address may be mistyped, or the page may have moved.
        </p>

        <Link
          href="/"
          className="inline-flex min-h-[44px] w-fit items-center rounded-[2px] bg-maroon-700 px-6 py-3 text-meta text-white no-underline transition-opacity duration-[160ms] hover:opacity-90"
        >
          Back to portals · வாயில்களுக்குத் திரும்பு
        </Link>
      </div>
    </main>
  );
}
