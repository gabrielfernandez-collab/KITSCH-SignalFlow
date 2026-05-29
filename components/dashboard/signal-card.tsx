import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { EvidencePanel } from "@/components/dashboard/evidence-panel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getImpactScore,
  getPriorityFromSeverity,
  getPriorityTone
} from "@/lib/signal-presentation";
import type { IntelligenceSignal } from "@/lib/types";

interface SignalCardProps {
  signal: IntelligenceSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const priority = getPriorityFromSeverity(signal.severity);
  const impactScore = getImpactScore(signal);

  const sourceTone =
    signal.source.type === "website" || signal.source.type === "shopify"
      ? "green"
      : signal.source.type === "social"
        ? "cyan"
        : "amber";

  const dataLabel =
    signal.source.type === "social"
      ? "MVP Social Source Metadata"
      : signal.source.type === "ad-library"
        ? "Public Ad Library Reference"
        : "Seeded Demonstration Signal";

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="amber">{dataLabel}</Badge>
          <Badge tone={getPriorityTone(priority)}>Priority: {priority}</Badge>
          <Badge>Impact Score: {impactScore}</Badge>
          <Badge>{signal.signalType}</Badge>
          <Badge>{signal.competitor}</Badge>
          <Badge tone={sourceTone}>
            {signal.source.type === "ad-library" ? "Ad Library" : signal.source.type}
          </Badge>
          <Badge>{signal.score.confidence} confidence</Badge>
        </div>
        <CardTitle className="pt-2">{signal.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            What Happened
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground">
            {signal.summary}
          </p>
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Priority reflects strategic relevance to KITSCH. Impact Score estimates
          potential business significance.
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs uppercase text-muted-foreground">Priority</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {priority}
            </p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs uppercase text-muted-foreground">Impact Score</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {impactScore}
            </p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs uppercase text-muted-foreground">Confidence</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {signal.score.confidence}
            </p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
              Why It Matters
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {signal.whyItMatters}
            </p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Recommended Action
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {signal.recommendedAction}
            </p>
          </div>
        </div>
        <EvidencePanel
          collectionDate={signal.detectedAt}
          confidence={signal.score.confidence}
          evidenceSummary={signal.strategicRelevance}
          observedText={signal.evidence}
          sourceLabel={signal.source.label}
          sourceType={signal.source.type}
          sourceUrl={signal.source.url}
        />
      </CardContent>
    </Card>
  );
}
