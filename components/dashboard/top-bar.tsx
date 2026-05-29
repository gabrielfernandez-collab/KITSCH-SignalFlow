import { CalendarDays, Database, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function TopBar() {
  return (
    <header className="border-b border-white/10 bg-background/85 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            AI-Powered Competitive Intelligence Engine
          </p>
          <h1 className="mt-1 max-w-full break-words text-xl font-semibold leading-tight tracking-normal text-foreground md:text-2xl">
            Monday leadership intelligence brief
          </h1>
        </div>

        <div className="flex min-w-0 flex-wrap gap-2">
          <Badge tone="green">
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            Public sources only
          </Badge>
          <Badge tone="cyan">
            <Database className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            18 monitored feeds
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
