import Link from 'next/link';
import { DOCUMENT_TYPE_LABEL, type DocumentRecord } from '@/lib/content/schema';
import { getPortal } from '@/config/portals';
import { formatDateShort } from '@/lib/i18n/bilingual';
import { href } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';

/**
 * The document archive.
 *
 * A real table at `lg` and above — with `<th scope="col">`, a caption and a
 * proper header row, so a screen reader can navigate it by column — and a
 * stacked list of rows below that, because a five-column table on a narrow
 * screen is unusable however much it scrolls.
 *
 * The switch is at `lg`, not `md`: the table needs 48rem of columns and a
 * portrait tablet only has about 43rem of content width, so at `md` it was
 * technically visible but had to be scrolled sideways to read a title. The
 * stacked list is the better answer at that width.
 *
 * The same records render both ways from one source; the mobile list is not a
 * second copy that can drift.
 */
export function DocumentTable({
  documents,
  locale,
  caption,
}: {
  documents: readonly DocumentRecord[];
  locale: Locale;
  caption: string;
}) {
  return (
    <>
      {/* Desktop */}
      <div className="u-scroll-x hidden lg:block">
        <table className="min-w-[48rem] text-left">
          <caption className="u-sr-only">{caption}</caption>
          <thead>
            <tr className="border-y border-border-strong">
              <Th>{locale === 'ta' ? 'நாள்' : 'Date'}</Th>
              <Th>{locale === 'ta' ? 'வகை' : 'Type'}</Th>
              <Th>{locale === 'ta' ? 'தலைப்பு' : 'Title'}</Th>
              <Th>{locale === 'ta' ? 'துறை' : 'Department'}</Th>
              <Th>{locale === 'ta' ? 'ஆதாரம்' : 'Source'}</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {documents.map((doc) => (
              <tr key={doc.id} className="align-top transition-colors duration-fast hover:bg-surface-sunken">
                <td className="whitespace-nowrap py-md pr-lg text-caption text-ink-faint tabular-nums">
                  <time dateTime={doc.date}>{formatDateShort(doc.date, locale)}</time>
                </td>
                <td className="py-md pr-lg text-caption text-ink-muted">
                  {DOCUMENT_TYPE_LABEL[doc.documentType][locale]}
                </td>
                <td className="py-md pr-lg">
                  <Link
                    href={href(locale, `/documents/${doc.slug}`)}
                    className="text-small font-medium text-ink no-underline transition-colors duration-fast hover:text-accent hover:underline"
                  >
                    {doc.title[locale]}
                  </Link>
                  {doc.documentNumber ? (
                    <span className="u-meta mt-0.5 block">{doc.documentNumber}</span>
                  ) : null}
                </td>
                <td className="py-md pr-lg text-caption text-ink-muted">
                  {getPortal(doc.department).title[locale]}
                </td>
                <td className="py-md text-caption text-ink-faint">{doc.source.sourceName[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ul className="divide-y divide-border border-y border-border lg:hidden">
        {documents.map((doc) => (
          <li key={doc.id} className="group relative py-lg">
            <p className="u-meta flex flex-wrap items-center gap-x-sm">
              <time dateTime={doc.date}>{formatDateShort(doc.date, locale)}</time>
              <span aria-hidden="true" className="text-border-strong">
                ·
              </span>
              <span>{DOCUMENT_TYPE_LABEL[doc.documentType][locale]}</span>
            </p>
            <h3 className="mt-xs text-h3">
              <Link
                href={href(locale, `/documents/${doc.slug}`)}
                className="u-stretch no-underline transition-colors duration-fast group-hover:text-accent"
              >
                {doc.title[locale]}
              </Link>
            </h3>
            {doc.documentNumber ? <p className="u-meta mt-1">{doc.documentNumber}</p> : null}
            <p className="u-meta mt-xs">{doc.source.sourceName[locale]}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th scope="col" className="u-label py-sm pr-lg font-semibold">
      {children}
    </th>
  );
}
