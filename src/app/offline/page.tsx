import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline',
  robots: { index: false, follow: false },
};

/**
 * Offline experience (spec §30, §31).
 *
 * The load-bearing sentence here is the one about submissions. A citizen who
 * loses connectivity mid-submission must be told plainly that their query was
 * NOT filed — telling them otherwise, or leaving it ambiguous, means someone
 * waits for a response to a grievance that never reached anyone.
 */
export default function OfflinePage() {
  return (
    <main id="main" className="flex min-h-dvh items-center bg-sand-100 px-gutter py-section">
      <div className="mx-auto flex max-w-[46rem] flex-col gap-6">
        <span aria-hidden="true" className="u-eyebrow text-maroon-700">
          Offline
        </span>

        <h1 className="font-display text-h1 text-charcoal-900">You are offline</h1>
        <p lang="ta" className="font-display text-h2 text-charcoal-700">
          நீங்கள் இணைப்பில் இல்லை
        </p>

        <p className="u-measure text-lead text-charcoal-700">
          Pages you have already visited may still be available. Signing in, submitting a query
          and tracking a query all need a connection.
        </p>

        <div className="border-l-2 border-maroon-700 bg-white p-6">
          <p className="u-measure text-body text-charcoal-900">
            <strong>Nothing you were submitting has been sent.</strong> If you were filling in a
            query, it has not reached the department. Reconnect and submit it again — you will
            receive a reference number only when it has genuinely been filed.
          </p>
          <p lang="ta" className="u-measure mt-4 text-body text-charcoal-900">
            <strong>நீங்கள் சமர்ப்பித்தது எதுவும் அனுப்பப்படவில்லை.</strong> மீண்டும் இணைந்து
            சமர்ப்பிக்கவும். உண்மையில் பதிவு செய்யப்பட்டால் மட்டுமே குறிப்பு எண் கிடைக்கும்.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex min-h-[44px] w-fit items-center rounded-[2px] bg-maroon-700 px-6 py-3 text-meta text-white no-underline"
        >
          Try again · மீண்டும் முயற்சிக்கவும்
        </Link>
      </div>
    </main>
  );
}
