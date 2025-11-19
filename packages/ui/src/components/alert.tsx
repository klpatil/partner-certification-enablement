import { cn } from '@repo/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva('rounded-lg border p-4', {
  variants: {
    variant: {
      info: 'border-blue-600/70 bg-blue-500/20 text-blue-600 dark:text-blue-300',
      warning:
        'border-yellow-600/70 bg-yellow-500/20 text-yellow-600 dark:text-yellow-300',
      success:
        'border-green-600/70 bg-green-500/20 text-green-600 dark:text-green-300',
      error: 'border-red-600/70 bg-red-500/20 text-red-600 dark:text-red-300',
      quote:
        'border-primary/10 bg-primary/10 text-primary/50 italic dark:text-primary/50',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export function Alert({
  children,
  variant = 'info',
  className,
}: {
  children: React.ReactNode;
  variant?: NonNullable<VariantProps<typeof alertVariants>['variant']>;
  className?: string;
}) {
  return (
    <div className={cn(alertVariants({ variant, className }))}>{children}</div>
  );
}
