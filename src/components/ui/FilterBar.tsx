import Link from 'next/link';
import { cn } from '@/lib/cn';
import { withParams } from '@/lib/i18n/href';
import type { Locale } from '@/lib/i18n/routing';

export interface FilterOption {
  readonly value: string | undefined;
  readonly label: string;
}

/**
 * Filters are LINKS, not client state.
 *
 * Every filtered view therefore has its own URL that can be bookmarked, shared,
 * indexed and reached with JavaScript disabled — and the component ships no
 * client bundle at all. `aria-current` carries the active state so it is not
 * signalled by colour alone.
 */
export function FilterBar({
  label,
  options,
  active,
  param,
  basePath,
  preserve,
  className,
}: {
  label: string;
  options: readonly FilterOption[];
  active: string | undefined;
  param: string;
  basePath: string;
  /** Other search params to keep when a filter changes (e.g. the query). */
  preserve?: Record<string, string | undefined>;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cn('u-scroll-x border-y border-border', className)}>
      <ul className="flex items-center gap-0 whitespace-nowrap">
        {options.map((option) => {
          const isActive = option.value === active;
          return (
            <li key={option.value ?? '__all'}>
              <Link
                href={withParams(basePath, { ...preserve, [param]: option.value, page: undefined })}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'u-tap-box inline-flex items-center border-b-2 px-md text-small transition-colors duration-fast ease-standard',
                  isActive
                    ? 'border-accent font-medium text-ink'
                    : 'border-transparent text-ink-faint hover:border-border-strong hover:text-ink',
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * A compact year / type selector for document archives, where a tab rail would
 * be too long. Submits with the browser's native form GET, so it works without
 * JavaScript; the button is hidden from pointer users once JS enhances it.
 */
export function SelectFilter({
  name,
  label,
  options,
  active,
  locale,
  hidden,
}: {
  name: string;
  label: string;
  options: readonly FilterOption[];
  active: string | undefined;
  locale: Locale;
  /** Params to carry through the form submission. */
  hidden?: Record<string, string | undefined>;
}) {
  return (
    // `min-w-0` on both the column and the select: a <select> is sized by its
    // widest option, and the Tamil labels are long enough to push this past a
    // 375px viewport unless it is explicitly allowed to shrink.
    <div className="flex min-w-0 flex-col gap-1">
      <label htmlFor={`filter-${name}`} className="u-label">
        {label}
      </label>
      <div className="flex min-w-0 gap-2">
        {Object.entries(hidden ?? {}).map(([key, value]) =>
          value ? <input key={key} type="hidden" name={key} value={value} /> : null,
        )}
        <select
          id={`filter-${name}`}
          name={name}
          defaultValue={active ?? ''}
          className="u-tap-box min-w-0 flex-1 truncate rounded-sm border border-border-strong bg-surface px-sm py-2 text-small text-ink sm:min-w-40 sm:flex-none"
        >
          {options.map((option) => (
            <option key={option.value ?? '__all'} value={option.value ?? ''}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="u-tap-box shrink-0 rounded-sm border border-border-strong px-md text-caption text-ink transition-colors duration-fast hover:border-ink"
        >
          {locale === 'ta' ? 'வடிகட்டு' : 'Apply'}
        </button>
      </div>
    </div>
  );
}
