import { cn } from '@repo/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inlineCodeVariants = cva(
  'inline-flex items-center rounded px-1.5 pt-0.5 font-medium font-mono text-sh-string text-sm',
  {
    variants: {
      variant: {
        default: 'border border-primary/20 bg-primary/15 text-primary',
        secondary:
          'border border-secondary/50 bg-secondary text-secondary-foreground',
        accent: 'border border-accent/30 bg-accent/20 text-accent-foreground',
        muted:
          'border border-muted-foreground/20 bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export function InlineCode({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: NonNullable<VariantProps<typeof inlineCodeVariants>['variant']>;
  className?: string;
}) {
  return (
    <code className={cn(inlineCodeVariants({ variant, className }))}>
      {children}
    </code>
  );
}
