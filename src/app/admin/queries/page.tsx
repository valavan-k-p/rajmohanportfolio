import { redirect } from 'next/navigation';
import { getAdminSession, can } from '@/lib/auth/roles';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/config/env';
import { EmptyState } from '@/components/common/EmptyState';
import { QueryStatusBadge } from '@/components/citizen/QueryStatusBadge';
import { allowedTransitions, type QueryStatus } from '@/lib/queries/status';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Queries' };

interface Row {
  id: string;
  reference_number: string;
  subject: string;
  status: QueryStatus;
  priority: string;
  created_at: string;
  departments: { slug: string; name_en: string } | null;
}

/**
 * Query queue.
 *
 * RLS scopes the rows: a DEPARTMENT_ADMIN or OFFICER sees only their own
 * department, enforced by `can_access_department()` in the database. This page
 * adds no department filter of its own — doing so would imply the filter is
 * what protects the data, and a future edit removing it would silently widen
 * access. The database is the boundary.
 */
export default async function AdminQueriesPage() {
  if (!isSupabaseConfigured) {
    return (
      <>
        <h1 className="mb-8 font-display text-h1 text-charcoal-900">Queries</h1>
        <EmptyState
          title="Not connected"
          body="Connect Supabase and run supabase/migrations to work the query queue."
        />
      </>
    );
  }

  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  if (!can(session.role, 'queries.viewAll') && !can(session.role, 'queries.viewDepartment')) {
    return (
      <>
        <h1 className="mb-8 font-display text-h1 text-charcoal-900">Queries</h1>
        <EmptyState
          title="Not permitted"
          body={`The ${session.role} role does not include query access.`}
        />
      </>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from('queries')
    .select(
      'id, reference_number, subject, status, priority, created_at, departments(slug, name_en)',
    )
    .order('created_at', { ascending: false })
    .limit(100);

  const rows = (data ?? []) as unknown as Row[];

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-h1 text-charcoal-900">Queries</h1>
        <p className="mt-2 text-meta text-charcoal-700">
          {rows.length} shown · scoped to your role by row-level security
        </p>
      </header>

      {rows.length === 0 ? (
        <EmptyState title="No queries" body="Nothing has been submitted in your scope yet." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <caption className="sr-only">Citizen queries, newest first</caption>
            <thead>
              <tr className="border-b border-sand-300">
                <th scope="col" className="u-eyebrow py-3 text-charcoal-700">Reference</th>
                <th scope="col" className="u-eyebrow py-3 text-charcoal-700">Subject</th>
                <th scope="col" className="u-eyebrow py-3 text-charcoal-700">Department</th>
                <th scope="col" className="u-eyebrow py-3 text-charcoal-700">Status</th>
                <th scope="col" className="u-eyebrow py-3 text-charcoal-700">Next</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-sand-300 align-top">
                  <td className="u-tabular py-4 text-meta text-maroon-700">
                    {row.reference_number}
                  </td>
                  <td className="py-4 pr-6 text-meta text-charcoal-900">{row.subject}</td>
                  <td className="py-4 pr-6 text-meta text-charcoal-700">
                    {row.departments?.name_en ?? '—'}
                  </td>
                  <td className="py-4 pr-6">
                    <QueryStatusBadge status={row.status} locale="en" />
                  </td>
                  <td className="py-4 text-meta text-charcoal-700">
                    {can(session.role, 'queries.changeStatus')
                      ? (allowedTransitions(row.status).join(', ') || '—')
                      : 'read only'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
