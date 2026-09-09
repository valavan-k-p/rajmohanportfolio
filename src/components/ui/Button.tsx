import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'quiet';
type Size = 'md' | 'sm';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-sm border font-sans font-medium ' +
  'transition-[background-color,border-color,color] duration-fast ease-standard ' +
  'disabled:cursor-not-allowed disabled:opacity-55';

const VARIANT: Record<Variant, string> = {
  primary:
    'border-ink bg-ink text-ink-inverse hover:border-accent-hover hover:bg-accent-hover',
  secondary: 'border-border-strong bg-transparent text-ink hover:border-ink hover:bg-surface',
  quiet: 'border-transparent bg-transparent text-accent hover:text-accent-hover hover:underline',
};

// Both sizes clear a 44px touch target; `sm` differs in type and padding,
// not in how easy it is to hit.
const SIZE: Record<Size, string> = {
  md: 'min-h-12 px-lg py-3 text-small',
  sm: 'min-h-11 px-md py-2 text-caption',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

/** Internal navigation. Always prefer this over a button with an onClick router push. */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>) {
  const classes = cn(BASE, VARIANT[variant], SIZE[size], 'no-underline', className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer external"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: CommonProps & React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type={type}
      className={cn(BASE, VARIANT[variant], SIZE[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
