import { AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IntelligenceSignal, SignalSeverity } from "@/lib/types";

const severityTone: Record<SignalSeverity, "green" | "amber" | "rose" | "cyan"> = {
  critical: "rose",
  high: "amber",
  medium: "cyan",
  low: "green"
};

interface SignalCardProps {
  signal: IntelligenceSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={severityTone[signal.severity]}>{signal.severity}</Badge>
          <Badge>{signal.category}</Badge>
          <Badge>{signal.competitor}</Badge>
        </div>
        <CardTitle className="pt-2">{signal.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">{signal.summary}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
              Why it matters
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {signal.whyItMatters}
            </p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Action
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {signal.recommendedAction}
            </p>
          </div>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          Source: {signal.source.label}
        </p>
      </CardContent>
    </Card>
  );
}
