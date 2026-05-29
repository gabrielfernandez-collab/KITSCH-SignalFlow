"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type {
  CompetitorSourceRegistryEntry,
  IntelligenceSignal,
  SignalType,
  WeeklyBrief
} from "@/lib/types";

interface WeeklyIntelModuleProps {
  brief: WeeklyBrief;
  sourceRegistry: CompetitorSourceRegistryEntry[];
  signals: IntelligenceSignal[];
}

export function WeeklyIntelModule({
  brief,
  signals,
  sourceRegistry
}: WeeklyIntelModuleProps) {
  const [competitor, setCompetitor] = useState("All");
  const [signalType, setSignalType] = useState("All");
  const [copied, setCopied] = useState(false);

  const competitorOptions = useMemo(
    () => ["All", ...Array.from(new Set(signals.map((signal) => signal.competitor)))],
    [signals]
  );
  const signalTypeOptions = useMemo(
    () => ["All", ...Array.from(new Set(signals.map((signal) => signal.signalType)))],
    [signals]
  );

  const filteredSignals = useMemo(
    () =>
      signals.filter((signal) => {
        const competitorMatch = competitor === "All" || signal.competitor === competitor;
        const typeMatch = signalType === "All" || signal.signalType === signalType;

        return competitorMatch && typeMatch;
      }),
    [competitor, signalType, signals]
  );

  async function copyBrief() {
    await navigator.clipboard.writeText(brief.copyReadyReport);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="grid min-w-0 max-w-full gap-5 xl:grid-cols-[1.35fr_1fr]">
      <div className="min-w-0 space-y-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle>Weekly brief module</CardTitle>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Filter scored competitive signals by competitor and signal type.
                  The executive brief only promotes the highest-quality signals.
                </p>
              </div>
              <Button onClick={copyBrief} variant="secondary">
                {copied ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden />
                )}
                {copied ? "Copied" : "Copy brief"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Competitor filter
                </span>
                <select
                  className="h-10 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  onChange={(event) => setCompetitor(event.target.value)}
                  value={competitor}
                >
                  {competitorOptions.map((option) => (
                    <option className="bg-card text-foreground" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Signal type filter
                </span>
                <select
                  className="h-10 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  onChange={(event) => setSignalType(event.target.value)}
                  value={signalType}
                >
                  {signalTypeOptions.map((option) => (
                    <option className="bg-card text-foreground" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="space-y-3">
              {filteredSignals.map((signal) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  key={signal.id}
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={signal.includeInExecutiveSummary ? "green" : "neutral"}>
                      {signal.includeInExecutiveSummary ? "executive signal" : "monitor only"}
                    </Badge>
                    <Badge>{signal.signalType as SignalType}</Badge>
                    <Badge>{signal.competitor}</Badge>
                    <Badge>{signal.score.confidence} confidence</Badge>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {signal.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {signal.summary}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <Metric label="Relevance" value={`${signal.score.relevanceToKitsch}/5`} />
                    <Metric label="Impact" value={`${signal.score.businessImpact}/5`} />
                    <Metric label="Urgency" value={signal.score.urgency} />
                  </div>
                  <Separator className="my-4" />
                  <p className="text-sm leading-6 text-foreground">
                    {signal.recommendedAction}
                  </p>
                  <a
                    className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                    href={signal.source.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    {signal.source.label}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="min-w-0 space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Copy-ready report</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-md border border-white/10 bg-black/20 p-4 text-xs leading-5 text-muted-foreground">
              {brief.copyReadyReport}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor source registry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sourceRegistry.map((entry) => (
              <div key={entry.id}>
                <p className="text-sm font-medium text-foreground">
                  {entry.competitorName}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {entry.whyItMatters}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.sources.map((source) => (
                    <a
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                      href={source.url}
                      key={source.id}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {source.label}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/10 p-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
