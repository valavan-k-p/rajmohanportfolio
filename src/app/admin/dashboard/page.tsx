import { redirect } from 'next/navigation';
import { getAdminSession, capabilitiesFor } from '@/lib/auth/roles';
import { isSupabaseConfigured } from '@/config/env';
import { EmptyState } from '@/components/common/EmptyState';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Overview' };

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <>
        <h1 className="mb-8 font-display text-h1 text-charcoal-900">Overview</h1>
        <EmptyState
          title="Not connected"
          body="Admin requires a Supabase project. Set NEXT_PUBLIC_SUPABASE_URL and the service-role key, then run the migrations in supabase/migrations."
        />
      </>
    );
  }

  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const capabilities = capabilitiesFor(session.role);

  return (
    <>
      <header className="mb-10">
        <h1 className="font-display text-h1 text-charcoal-900">Overview</h1>
        <p className="mt-2 text-meta text-charcoal-700">
          Signed in as <strong>{session.role}</strong>
          {session.departmentId ? ' · department-scoped' : null}
        </p>
      </header>

      <section aria-labelledby="caps-heading">
        <h2 id="caps-heading" className="u-eyebrow mb-4 text-maroon-700">
          Your permissions
        </h2>
        <ul className="flex flex-col border-t border-sand-300">
          {capabilities.map((capability) => (
            <li
              key={capability}
              className="border-b border-sand-300 py-3 text-meta text-charcoal-900"
            >
              {capability}
            </li>
          ))}
        </ul>
        <p className="u-measure mt-4 text-meta text-charcoal-700">
          These control what is rendered. The enforceable boundary is Row Level Security in the
          database, so a control that is hidden here would also be refused there.
        </p>
      </section>
    </>
  );
}
