import { notFound, redirect } from 'next/navigation';
import { getAdminSession, can, type Capability } from '@/lib/auth/roles';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/config/env';
import { EmptyState } from '@/components/common/EmptyState';

export const dynamic = 'force-dynamic';

/**
 * Admin content sections.
 *
 * One route rather than eight near-identical files. Each section declares the
 * table it reads, the capability it requires, and the columns it shows; adding
 * a section is a table entry, not a new page.
 *
 * `/admin/queries`, `/admin/dashboard` and `/admin/login` have their own files
 * because their behaviour genuinely differs; they are excluded here.
 */

interface SectionConfig {
  readonly title: string;
  readonly table: string;
  readonly capability: Capability;
  readonly columns: readonly { readonly key: string; readonly label: string }[];
  readonly select: string;
  readonly orderBy: string;
  /** What this section is for, shown when it is empty. */
  readonly emptyBody: string;
}

const SECTIONS: Record<string, SectionConfig> = {
  news: {
    title: 'News',
    table: 'news',
    capability: 'content.publish',
    select: 'id, title_en, title_ta, verification, source, published_at',
    orderBy: 'created_at',
    columns: [
      { key: 'title_en', label: 'Title (EN)' },
      { key: 'title_ta', label: 'Title (TA)' },
      { key: 'verification', label: 'Verification' },
      { key: 'published_at', label: 'Published' },
    ],
    emptyBody:
      'News items appear here once created. Every item needs a verification state, and verified or reported items need a source before they can be published.',
  },
  events: {
    title: 'Events',
    table: 'events',
    capability: 'content.publish',
    select: 'id, title_en, title_ta, starts_at, verification, published_at',
    orderBy: 'starts_at',
    columns: [
      { key: 'title_en', label: 'Title (EN)' },
      { key: 'starts_at', label: 'Starts' },
      { key: 'verification', label: 'Verification' },
      { key: 'published_at', label: 'Published' },
    ],
    emptyBody: 'Events appear here once created. Past events remain listed but collapse on the public portal.',
  },
  pages: {
    title: 'Pages',
    table: 'pages',
    capability: 'content.publish',
    select: 'id, slug, title_en, title_ta, verification, published_at',
    orderBy: 'created_at',
    columns: [
      { key: 'slug', label: 'Slug' },
      { key: 'title_en', label: 'Title (EN)' },
      { key: 'verification', label: 'Verification' },
      { key: 'published_at', label: 'Published' },
    ],
    emptyBody: 'Editorial pages appear here. Portal section content is authored as pages linked to a department.',
  },
  departments: {
    title: 'Departments',
    table: 'departments',
    capability: 'settings.manage',
    select: 'id, slug, name_en, name_ta, reference_code, public_pillar',
    orderBy: 'sort_order',
    columns: [
      { key: 'reference_code', label: 'Code' },
      { key: 'name_en', label: 'Name (EN)' },
      { key: 'name_ta', label: 'Name (TA)' },
      { key: 'public_pillar', label: 'Public portal' },
    ],
    emptyBody: 'Run supabase/seed.sql to load the departments and query categories.',
  },
  gallery: {
    title: 'Gallery',
    table: 'gallery',
    capability: 'media.manage',
    select: 'id, storage_path, alt_en, alt_ta, verification, published_at',
    orderBy: 'created_at',
    columns: [
      { key: 'storage_path', label: 'File' },
      { key: 'alt_en', label: 'Alt text (EN)' },
      { key: 'verification', label: 'Verification' },
    ],
    emptyBody: 'Images appear here once uploaded. Alt text in both languages is required by the schema, not optional.',
  },
  users: {
    title: 'Citizens',
    table: 'citizen_profiles',
    capability: 'citizens.view',
    select: 'id, full_name, locale, created_at',
    orderBy: 'created_at',
    columns: [
      { key: 'full_name', label: 'Name' },
      { key: 'locale', label: 'Language' },
      { key: 'created_at', label: 'Registered' },
    ],
    // Phone is the most sensitive column in the schema and is deliberately not
    // selected here — only SUPER_ADMIN can read it, and no screen lists it.
    emptyBody: 'Citizens appear here after their first verified sign-in. Mobile numbers are never listed.',
  },
  settings: {
    title: 'Settings',
    table: 'site_settings',
    capability: 'settings.manage',
    select: 'key, value_json, updated_at',
    orderBy: 'key',
    columns: [
      { key: 'key', label: 'Key' },
      { key: 'value_json', label: 'Value' },
      { key: 'updated_at', label: 'Updated' },
    ],
    emptyBody: 'Structural settings load from supabase/seed.sql.',
  },
};

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return { title: SECTIONS[section]?.title ?? 'Admin' };
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const config = SECTIONS[section];
  if (!config) notFound();

  if (!isSupabaseConfigured) {
    return (
      <Shell title={config.title}>
        <EmptyState
          title="Not connected"
          body="Connect Supabase and run the migrations in supabase/migrations, then seed with supabase/seed.sql."
        />
      </Shell>
    );
  }

  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  // Render-level gate. The enforceable boundary is RLS — a role without the
  // capability would also be refused by the database.
  if (!can(session.role, config.capability)) {
    return (
      <Shell title={config.title}>
        <EmptyState
          title="Not permitted"
          body={`The ${session.role} role does not include ${config.capability}.`}
        />
      </Shell>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from(config.table)
    .select(config.select)
    .order(config.orderBy, { ascending: false })
    .limit(100);

  const rows = (data ?? []) as unknown as Record<string, unknown>[];

  return (
    <Shell title={config.title}>
      {rows.length === 0 ? (
        <EmptyState title={`No ${config.title.toLowerCase()} yet`} body={config.emptyBody} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <caption className="sr-only">{config.title}</caption>
            <thead>
              <tr className="border-b border-sand-300">
                {config.columns.map((column) => (
                  <th key={column.key} scope="col" className="u-eyebrow py-3 text-charcoal-700">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={String(row.id ?? row.key ?? index)} className="border-b border-sand-300">
                  {config.columns.map((column) => (
                    <td key={column.key} className="py-3 pr-6 text-meta text-charcoal-900">
                      {format(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}

function format(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h1 className="mb-8 font-display text-h1 text-charcoal-900">{title}</h1>
      {children}
    </>
  );
}
