import Link from 'next/link';

/**
 * 404.
 *
 * Bilingual without knowing the locale: a request that did not match a route
 * may not have matched a locale segment either, so both languages are shown
 * side by side rather than guessed at. The Tamil block is tagged `lang="ta"`
 * so it is announced and typeset correctly.
 */
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh items-center bg-paper px-gutter py-section">
      <div className="mx-auto w-full max-w-text">
        <p className="u-label">404</p>

        <h1 className="mt-sm text-h1">This page could not be found</h1>
        <p lang="ta" className="mt-sm font-display text-h2 text-ink-muted">
          இந்தப் பக்கம் கிடைக்கவில்லை
        </p>

        <p className="mt-lg text-lead text-ink-muted">
          The address may be mistyped, or the page may have moved.
        </p>
        <p lang="ta" className="mt-sm text-ink-muted">
          முகவரி தவறாகத் தட்டச்சு செய்யப்பட்டிருக்கலாம், அல்லது அப்பக்கம் நகர்த்தப்பட்டிருக்கலாம்.
        </p>

        <div className="mt-xl flex flex-wrap gap-md">
          <Link
            href="/en"
            className="inline-flex items-center rounded-sm border border-ink bg-ink px-lg py-3 text-small font-medium text-ink-inverse no-underline transition-colors duration-fast hover:border-accent-hover hover:bg-accent-hover"
          >
            English
          </Link>
          <Link
            href="/ta"
            lang="ta"
            className="inline-flex items-center rounded-sm border border-border-strong px-lg py-3 text-small no-underline transition-colors duration-fast hover:border-ink hover:bg-surface"
          >
            தமிழ்
          </Link>
        </div>
      </div>
    </main>
  );
}
