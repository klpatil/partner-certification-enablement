import { cn } from '@repo/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('text-foreground text-lg leading-relaxed', {
  variants: {
    variant: {
      default: '',
      accent: 'text-accent-foreground',
      code: 'rounded bg-primary px-1 py-0.5 font-mono text-primary-foreground',
      quote: 'border-primary border-l-4 pl-2 font-medium text-foreground',
      title:
        'bg-gradient-to-r from-primary to-primary/5 bg-clip-text font-bold text-4xl text-transparent leading-normal',
      subtitle: 'font-light text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export function Text({
  children,
  className,
  variant = 'default',
  as,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: NonNullable<VariantProps<typeof textVariants>['variant']>;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  // Choose semantic HTML element based on variant
  const getElementType = (): keyof React.JSX.IntrinsicElements => {
    if (as) {
      return as;
    }

    switch (variant) {
      case 'title':
        return 'h1';
      case 'subtitle':
        return 'h2';
      case 'quote':
        return 'blockquote';
      case 'code':
        return 'code';
      default:
        return 'p';
    }
  };

  const Element = getElementType();

  return (
    <Element className={cn(textVariants({ variant, className }))}>
      {children}
    </Element>
  );
}
