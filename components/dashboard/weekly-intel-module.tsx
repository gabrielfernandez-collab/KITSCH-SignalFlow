"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

import { EvidencePanel } from "@/components/dashboard/evidence-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getImpactScore,
  getPriorityFromSeverity,
  getPriorityTone
} from "@/lib/signal-presentation";
import type {
  CompetitorSourceRegistryEntry,
  IntelligenceSignal,
  ScoredPublicSignal,
  SignalType,
  WeeklyBrief
} from "@/lib/types";

interface WeeklyIntelModuleProps {
  brief: WeeklyBrief;
  collectedSignals: ScoredPublicSignal[];
  sourceRegistry: CompetitorSourceRegistryEntry[];
  signals: IntelligenceSignal[];
}

export function WeeklyIntelModule({
  brief,
  collectedSignals,
  signals,
  sourceRegistry
}: WeeklyIntelModuleProps) {
  const [competitor, setCompetitor] = useState("All");
  const [signalType, setSignalType] = useState("All");
  const [copied, setCopied] = useState(false);
  const [executiveView, setExecutiveView] = useState(false);

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
        const executiveMatch =
          !executiveView || getPriorityFromSeverity(signal.severity) === "High";

        return competitorMatch && typeMatch && executiveMatch;
      }),
    [competitor, executiveView, signalType, signals]
  );
  const visibleCollectedSignals = useMemo(
    () =>
      executiveView
        ? collectedSignals.filter((signal) => signal.executivePriority)
        : collectedSignals,
    [collectedSignals, executiveView]
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
                <CardTitle>Weekly intelligence builder</CardTitle>
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
            <label className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3">
              <input
                checked={executiveView}
                className="mt-1"
                onChange={(event) => setExecutiveView(event.target.checked)}
                type="checkbox"
              />
              <span>
                <span className="block text-sm font-medium text-foreground">
                  Executive Intelligence View
                </span>
                <span className="text-sm leading-6 text-muted-foreground">
                  Hide low-value information and show only high-priority signals,
                  leadership recommendations, strategic risks, and emerging
                  opportunities.
                </span>
              </span>
            </label>
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
                  {(() => {
                    const priority = getPriorityFromSeverity(signal.severity);
                    const impactScore = getImpactScore(signal);

                    return (
                      <>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={signal.includeInExecutiveSummary ? "green" : "neutral"}>
                      {signal.includeInExecutiveSummary ? "executive signal" : "monitor only"}
                    </Badge>
                    <Badge tone="amber">
                      {signal.source.type === "social"
                        ? "MVP Social Source Metadata"
                        : signal.source.type === "ad-library"
                          ? "Public Ad Library Reference"
                          : "Seeded Demonstration Signal"}
                    </Badge>
                    <Badge tone={getPriorityTone(priority)}>
                      Priority: {priority}
                    </Badge>
                    <Badge>Impact Score: {impactScore}</Badge>
                    <Badge>{signal.signalType as SignalType}</Badge>
                    <Badge>{signal.competitor}</Badge>
                    <Badge
                      tone={
                        signal.source.type === "website" ||
                        signal.source.type === "shopify"
                          ? "green"
                          : signal.source.type === "social"
                            ? "cyan"
                            : "amber"
                      }
                    >
                      {signal.source.type === "ad-library"
                        ? "Ad Library"
                        : signal.source.type}
                    </Badge>
                    <Badge>{signal.score.confidence} confidence</Badge>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {signal.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    <span className="font-medium text-foreground">What happened: </span>
                    {signal.summary}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    <span className="font-medium text-foreground">Why it matters: </span>
                    {signal.whyItMatters}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <Metric label="Priority" value={priority} />
                    <Metric label="Impact Score" value={`${impactScore}`} />
                    <Metric label="Confidence" value={signal.score.confidence} />
                  </div>
                  <Separator className="my-4" />
                  <p className="text-sm leading-6 text-foreground">
                    <span className="font-medium">Recommended action: </span>
                    {signal.recommendedAction}
                  </p>
                  <div className="mt-3">
                    <EvidencePanel
                      collectionDate={signal.detectedAt}
                      confidence={signal.score.confidence}
                      evidenceSummary={signal.strategicRelevance}
                      observedText={signal.evidence}
                      sourceLabel={signal.source.label}
                      sourceType={signal.source.type}
                      sourceUrl={signal.source.url}
                    />
                  </div>
                      </>
                    );
                  })()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest public collection run</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Normalized signals produced by the website, social, and ad-library
              collectors. Low-value items are scored and suppressed before the
              executive brief.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {visibleCollectedSignals.map((signal) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                key={signal.id}
              >
                <div className="flex flex-wrap gap-2">
                  <SourceTypeBadge sourceType={signal.sourceType} />
                  <Badge tone={
                    signal.sourceType === "Social"
                      ? "cyan"
                      : signal.sourceType === "Ad Library"
                        ? "amber"
                        : signal.evidence.includes("simulated")
                          ? "amber"
                          : "green"
                  }>
                    {signal.sourceType === "Social"
                      ? "MVP Social Source Metadata"
                      : signal.sourceType === "Ad Library"
                        ? "Public Ad Library Reference"
                        : signal.evidence.includes("simulated")
                          ? "Fallback Extraction Result"
                          : "Live Website Signal"}
                  </Badge>
                  <Badge>{signal.signalType.replace(/_/g, " ")}</Badge>
                  <Badge>{signal.competitor}</Badge>
                  <Badge>{signal.score.confidence} confidence</Badge>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">
                  {signal.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">What happened: </span>
                  {signal.summary}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">Why it matters: </span>
                  {signal.whyItMatters}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">Recommended action: </span>
                  {signal.recommendedAction}
                </p>
                <div className="mt-4">
                  <EvidencePanel
                    collectionDate={new Date(signal.collectedAt).toLocaleString()}
                    confidence={signal.score.confidence}
                    evidenceSummary={signal.whyItMatters}
                    observedText={signal.evidence}
                    sourceType={signal.sourceType}
                    sourceUrl={signal.sourceUrl}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="min-w-0 space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Copy-ready brief</CardTitle>
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

function SourceTypeBadge({
  sourceType
}: {
  sourceType: ScoredPublicSignal["sourceType"];
}) {
  const tone =
    sourceType === "Website"
      ? "green"
      : sourceType === "Social"
        ? "cyan"
        : "amber";

  return <Badge tone={tone}>{sourceType}</Badge>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/10 p-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
