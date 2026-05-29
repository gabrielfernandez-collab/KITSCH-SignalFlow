import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({
  actions,
  description,
  eyebrow,
  title
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div
        className="min-w-0"
        style={{ maxWidth: "min(48rem, calc(100vw - 3rem))" }}
      >
        <p className="font-meta text-[11px] uppercase tracking-[0.24em] text-signal-green">
          {eyebrow}
        </p>
        <h2 className="mt-2 max-w-[17rem] break-words font-heading text-2xl font-semibold leading-tight tracking-normal text-foreground md:max-w-full md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-[20rem] text-sm leading-6 text-muted-foreground md:max-w-full">
          {description}
        </p>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
