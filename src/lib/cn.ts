import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display',
            'h1',
            'h2',
            'h3',
            'lead',
            'body',
            'small',
            'caption',
            'label',
          ],
        },
      ],
      'text-color': [
        {
          text: [
            'ink',
            'ink-muted',
            'ink-faint',
            'ink-inverse',
            'ink-inverse-muted',
            'accent',
            'accent-hover',
            'status-ok',
            'status-pending',
            'status-alert',
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
