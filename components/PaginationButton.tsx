import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/utils";

type PaginationButtonProps = ComponentProps<typeof Link> & {
  active?: boolean;
  children: ReactNode;
};

export function PaginationButton({
  active = false,
  children,
  className,
  ...props
}: PaginationButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        active
          ? "border-accent bg-accent text-white"
          : "border-border text-foreground hover:border-accent hover:text-accent",
        className,
      )}
      aria-current={active ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
