import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeTone = "green" | "amber" | "rose" | "cyan" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  green: "border-signal-green/30 bg-signal-green/10 text-signal-green",
  amber: "border-signal-amber/30 bg-signal-amber/10 text-signal-amber",
  rose: "border-signal-rose/30 bg-signal-rose/10 text-signal-rose",
  cyan: "border-signal-cyan/30 bg-signal-cyan/10 text-signal-cyan",
  neutral: "border-white/10 bg-white/5 text-muted-foreground"
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
