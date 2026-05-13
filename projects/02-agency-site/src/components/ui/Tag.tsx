import type { HTMLAttributes } from "react";

export function Tag({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center border border-stone px-2.5 py-1 text-[11px] uppercase tracking-wider text-dim ${className}`}
      {...props}
    />
  );
}
