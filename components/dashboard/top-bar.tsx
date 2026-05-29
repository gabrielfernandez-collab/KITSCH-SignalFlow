import { CalendarDays, Database, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function TopBar() {
  return (
    <header className="border-b border-white/10 bg-background/85 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <p className="font-meta text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            Executive Intelligence Platform
          </p>
          <h1 className="mt-1 max-w-full break-words font-heading text-xl font-semibold leading-tight tracking-normal text-foreground md:text-2xl">
            Monday Leadership Brief
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Public-source intelligence organized for leadership decisions on product,
            pricing, and competitive positioning.
          </p>
        </div>

        <div className="flex min-w-0 flex-wrap gap-2">
          <Badge tone="green">
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Public sources only
          </Badge>
          <Badge tone="cyan">
            <Database className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            18 public sources
          </Badge>
          <Badge tone="amber">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Week of May 25, 2026
          </Badge>
        </div>
      </div>
    </header>
  );
}
