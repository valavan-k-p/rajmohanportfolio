import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/routing';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/config/env';
import { isConcluded, type QueryStatus } from '@/lib/queries/status';
import { QueryStatusBadge } from '@/components/citizen/QueryStatusBadge';
import { EmptyState } from '@/components/common/EmptyState';

export const metadata: Metadata = {
  title: 'My queries',
  robots: { index: false, follow: false },
};

// Personalised. Must never be cached at the edge (spec §20).
export const dynamic = 'force-dynamic';

interface QueryRow {
  id: string;
  reference_number: string;
  subject: string;
  status: QueryStatus;
  created_at: string;
  departments: { slug: string; name_en: string; name_ta: string } | null;
}

export default async function CitizenDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const ta = locale === 'ta';
  const heading = ta ? 'எனது கோரிக்கைகள்' : 'My queries';

  if (!isSupabaseConfigured) {
    return (
      <Shell heading={heading}>
        <EmptyState
          title={ta ? 'சேவை கிடைக்கவில்லை' : 'Service unavailable'}
          body={
            ta
              ? 'இந்தச் சேவை இன்னும் தரவுத்தளத்துடன் இணைக்கப்படவில்லை.'
              : 'This service is not yet connected to its database.'
          }
        />
      </Shell>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/citizen/login`);

  // RLS already restricts this to the caller's own rows. The explicit filter
  // is defence in depth, not the authorisation boundary.
  const { data } = await supabase
    .from('queries')
    .select(
      'id, reference_number, subject, status, created_at, departments(slug, name_en, name_ta)',
    )
    .eq('citizen_id', user.id)
    .order('created_at', { ascending: false });

  const queries = (data ?? []) as unknown as QueryRow[];
  const active = queries.filter((q) => !isConcluded(q.status));
  const concluded = queries.filter((q) => isConcluded(q.status));

  return (
    <Shell heading={heading}>
      {queries.length === 0 ? (
        <EmptyState
          title={ta ? 'இன்னும் கோரிக்கைகள் இல்லை' : 'No queries yet'}
          body={
            ta
              ? 'நீங்கள் ஒரு கோரிக்கையைச் சமர்ப்பித்தால், அது குறிப்பு எண்ணுடன் இங்கே தோன்றும்.'
              : 'When you submit a query it will appear here with its reference number.'
          }
        />
      ) : (
        <>
          <QueryGroup
            id="active"
            heading={ta ? 'நடப்பில் உள்ளவை' : 'In progress'}
            rows={active}
            locale={ta ? 'ta' : 'en'}
          />
          <QueryGroup
            id="concluded"
            heading={ta ? 'முடிந்தவை' : 'Concluded'}
            rows={concluded}
            locale={ta ? 'ta' : 'en'}
          />
        </>
      )}
    </Shell>
  );
}

function Shell({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <main id="main" className="min-h-dvh bg-sand-100 px-gutter py-section">
      <div className="mx-auto flex max-w-[62rem] flex-col gap-12">
        <h1 className="font-display text-h1 text-charcoal-900">{heading}</h1>
        {children}
      </div>
    </main>
  );
}

function QueryGroup({
  id,
  heading,
  rows,
  locale,
}: {
  id: string;
  heading: string;
  rows: QueryRow[];
  locale: 'en' | 'ta';
}) {
  if (rows.length === 0) return null;

  return (
    <section aria-labelledby={`group-${id}`}>
      <h2 id={`group-${id}`} className="u-eyebrow mb-6 text-maroon-700">
        {heading}
      </h2>
      <ul className="flex flex-col">
        {rows.map((row) => (
          <li key={row.id} className="border-b border-sand-300 py-6 last:border-b-0">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="u-tabular text-meta text-maroon-700">
                  {row.reference_number}
                </span>
                <span className="font-display text-h3 text-charcoal-900">{row.subject}</span>
                {row.departments ? (
                  <span className="text-meta text-charcoal-700">
                    {locale === 'ta' ? row.departments.name_ta : row.departments.name_en}
                  </span>
                ) : null}
              </div>
              <QueryStatusBadge status={row.status} locale={locale} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
