import { cn } from '@repo/ui/lib/utils';

export function Table({
  children,
  className,
  caption,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  caption?: string;
  'aria-label'?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-lg border border-primary/10 bg-primary/10 text-primary',
        className
      )}
    >
      <table aria-label={ariaLabel} className="w-full">
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <thead className={cn('border-primary/10 border-b', className)}>
      {children}
    </thead>
  );
}

export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn('transition-colors hover:bg-primary/5', className)}>
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className,
  scope = 'col',
}: {
  children: React.ReactNode;
  className?: string;
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
}) {
  return (
    <th className={cn('p-3 text-left font-semibold', className)} scope={scope}>
      {children}
    </th>
  );
}

export function TableBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableCell({
  children,
  className,
  headers,
}: {
  children: React.ReactNode;
  className?: string;
  headers?: string;
}) {
  return (
    <td className={cn('p-3 text-left', className)} headers={headers}>
      {children}
    </td>
  );
}
