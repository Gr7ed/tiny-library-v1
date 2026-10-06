import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { BookSort } from "@/types";

type SortButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  sort: BookSort;
  active?: boolean;
};

export function SortButton({ className, active = false, ...props }: SortButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60",
        active
          ? "border-accent bg-accent text-white"
          : "border-border bg-surface text-foreground hover:border-accent hover:text-accent",
        className,
      )}
      {...props}
    />
  );
}