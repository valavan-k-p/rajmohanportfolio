import { cn } from '@/lib/cn';

type Width = 'prose' | 'text' | 'page' | 'wide' | 'full';

const WIDTH: Record<Width, string> = {
  /** ~68 characters of the body serif. Article and document bodies. */
  prose: 'max-w-prose',
  /** Section intros, forms, standfirsts. */
  text: 'max-w-text',
  /** The default editorial measure for grids and lists. */
  page: 'max-w-page',
  /** Galleries and full-width tables. */
  wide: 'max-w-wide',
  full: 'max-w-none',
};

export function Container({
  width = 'page',
  className,
  children,
  as: Tag = 'div',
}: {
  width?: Width;
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'article' | 'main';
}) {
  return (
    <Tag className={cn('mx-auto w-full px-gutter', WIDTH[width], className)}>{children}</Tag>
  );
}
