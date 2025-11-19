import {cn} from "@repo/ui/lib/utils";

export function List({
  children,
  className,
  ordered = false,
}: {
  children: React.ReactNode;
  className?: string;
  ordered?: boolean;
}) {
  const ListComponent = ordered ? "ol" : "ul";

  return (
    <ListComponent
      className={cn("flex flex-col gap-2 pl-6", ordered ? "list-decimal" : "list-disc", className)}
    >
      {children}
    </ListComponent>
  );
}

export function ListItem({children, className}: {children: React.ReactNode; className?: string}) {
  return <li className={cn("text-foreground text-lg", className)}>{children}</li>;
}
