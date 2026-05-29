"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import { CollectionControl } from "@/components/dashboard/collection-control";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { SignalCard } from "@/components/dashboard/signal-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type {
  CampaignTheme,
  CompetitorSourceRegistryEntry,
  IntelligenceSignal,
  LeadershipAction,
  PricingSignal,
  ProductLaunch,
  PublicCollectionResult,
  Recommendation,
  ScoredPublicSignal,
  WeeklyBrief
} from "@/lib/types";
import { cn } from "@/lib/utils";

import { WorkspaceTabs, type WorkspaceId } from "./workspace-tabs";

interface ExecutiveWorkspaceProps {
  metrics: Array<{
    label: string;
    value: number;
    context: string;
    accent: "green" | "amber" | "rose" | "cyan";
  }>;
  signals: IntelligenceSignal[];
  leadershipActions: LeadershipAction[];
  collection: PublicCollectionResult;
  weeklyBrief: WeeklyBrief;
  productLaunches: ProductLaunch[];
  campaignThemes: CampaignTheme[];
  pricingSignals: PricingSignal[];
  recommendations: Recommendation[];
  collectedSignals: ScoredPublicSignal[];
  sourceRegistry: CompetitorSourceRegistryEntry[];
}

export function ExecutiveWorkspace({
  metrics,
  signals,
  leadershipActions,
  collection,
  weeklyBrief,
  productLaunches,
  campaignThemes,
  pricingSignals,
  recommendations,
  collectedSignals,
  sourceRegistry
}: ExecutiveWorkspaceProps) {
  const [active, setActive] = useState<WorkspaceId>("brief");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(
      "signalflow-workspace"
    ) as WorkspaceId | null;
    if (
      saved &&
      ["brief", "actions", "signals", "evidence", "collection"].includes(saved)
    ) {
      setActive(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("signalflow-workspace", active);
  }, [active]);

  function handleSelect(id: WorkspaceId) {
    if (id === active) return;
    setActive(id);
    panelRef.current?.focus();
  }

  return (
    <div>
      <PageHeader
        actions={
          <>
            <Button asChild variant="secondary">
              <Link href="/weekly-brief-generator">
                <FileText className="h-4 w-4" aria-hidden />
                Generate brief
              </Link>
            </Button>
            <Button asChild>
              <Link href="/product-launch-radar">
                Review launches
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </>
        }
        description="A Monday operating view of the competitor moves most likely to influence KITSCH product, marketing, pricing, and positioning decisions."
        eyebrow="Executive Intelligence Workspace"
        title="Monday Leadership Brief"
      />

      <div className="mt-6">
        <WorkspaceTabs active={active} onSelect={handleSelect} />
      </div>

      <div
        ref={panelRef}
        key={active}
        className="mt-6 outline-none"
        tabIndex={-1}
        style={{
          animation: "workspaceFadeIn 0.15s ease-out"
        }}
      >
        {active === "brief" && (
          <BriefPanel
            metrics={metrics}
            weeklyBrief={weeklyBrief}
            leadershipActions={leadershipActions}
            collection={collection}
          />
        )}
        {active === "actions" && (
          <ActionsPanel
            recommendations={recommendations}
            productLaunches={productLaunches}
            campaignThemes={campaignThemes}
            pricingSignals={pricingSignals}
            signals={signals}
          />
        )}
        {active === "signals" && (
          <SignalsPanel
            signals={signals}
            collectedSignals={collectedSignals}
            sourceRegistry={sourceRegistry}
          />
        )}
        {active === "evidence" && (
          <EvidencePanel collection={collection} />
        )}
        {active === "collection" && (
          <CollectionPanel collection={collection} />
        )}
      </div>

      <style>{`
        @keyframes workspaceFadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ─── BRIEF PANEL ───────────────────────────────────── */

function BriefPanel({
  metrics,
  weeklyBrief,
  leadershipActions,
  collection
}: {
  metrics: ExecutiveWorkspaceProps["metrics"];
  weeklyBrief: WeeklyBrief;
  leadershipActions: LeadershipAction[];
  collection: PublicCollectionResult;
}) {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <Card className="border-signal-green/20 bg-white/[0.03]">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="green">Monday Leadership Brief</Badge>
                <Badge tone="cyan">{weeklyBrief.weekOf}</Badge>
                <Badge tone="amber">
                  {collection.summary.signalsGenerated} signals collected
                </Badge>
              </div>
              <CardTitle className="pt-2">
                What leadership needs to know first
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                {weeklyBrief.executiveSummary}
              </p>
              <div className="rounded-md border border-white/10 bg-black/10 p-4">
                <p className="text-xs font-meta uppercase tracking-[0.18em] text-muted-foreground">
                  What matters
                </p>
                <div className="mt-3 space-y-3">
                  {weeklyBrief.whatMatters.map((item, index) => (
                    <div className="flex gap-3" key={item}>
                      <Badge
                        tone={
                          index === 0
                            ? "green"
                            : index === 1
                              ? "cyan"
                              : "amber"
                        }
                      >
                        0{index + 1}
                      </Badge>
                      <p className="text-sm leading-6 text-foreground">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leadership Attention Required</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">
                Prioritized actions that should shape the next planning
                conversation.
              </p>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-3">
              {leadershipActions.map((item, index) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  key={item.id}
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={index === 0 ? "rose" : "amber"}>
                      Action #{index + 1}
                    </Badge>
                    <Badge>{item.confidence} confidence</Badge>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.action}
                  </p>
                  <div className="mt-4">
                    <p className="text-xs font-meta uppercase tracking-[0.18em] text-muted-foreground">
                      Supporting signals
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.supportingSignals.map((signal) => (
                        <Badge key={signal}>{signal}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Market Narrative</CardTitle>
                <Badge tone="amber">Seeded Demonstration Data</Badge>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                The short version of what is changing across the market and why
                it matters.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-foreground">
                {weeklyBrief.executiveSummary}
              </p>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-meta uppercase tracking-[0.18em] text-muted-foreground">
                    Market trends
                  </p>
                  <div className="mt-3 space-y-2">
                    {weeklyBrief.marketTrends.map((trend) => (
                      <p
                        className="text-sm leading-6 text-muted-foreground"
                        key={trend}
                      >
                        {trend}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-meta uppercase tracking-[0.18em] text-muted-foreground">
                    What to ignore
                  </p>
                  <div className="mt-3 space-y-2">
                    {weeklyBrief.whatToIgnore.map((item) => (
                      <p
                        className="text-sm leading-6 text-muted-foreground"
                        key={item}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {weeklyBrief.executiveSummary}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Signals Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyBrief.topSignals.slice(0, 3).map((signal) => (
                <div
                  className="rounded-md border border-white/10 bg-black/10 p-3"
                  key={signal.id}
                >
                  <p className="text-sm font-medium text-foreground">
                    {signal.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {signal.competitor} &middot; {signal.score.confidence}{" "}
                    confidence &middot; {signal.signalType}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
}

/* ─── ACTIONS PANEL ─────────────────────────────────── */

function ActionsPanel({
  recommendations,
  productLaunches,
  campaignThemes,
  pricingSignals,
  signals
}: {
  recommendations: Recommendation[];
  productLaunches: ProductLaunch[];
  campaignThemes: CampaignTheme[];
  pricingSignals: PricingSignal[];
  signals: IntelligenceSignal[];
}) {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recommended Leadership Actions</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Operational recommendations translated from the weekly intelligence
            brief.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((recommendation) => (
            <div
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              key={recommendation.id}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  tone={
                    recommendation.priority === "critical" ? "rose" : "amber"
                  }
                >
                  {recommendation.priority}
                </Badge>
                <Badge>{recommendation.owner}</Badge>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                {recommendation.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {recommendation.action}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Opportunities</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            New launches and campaign patterns that point to whitespace KITSCH
            can own.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 xl:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-meta uppercase tracking-[0.18em] text-muted-foreground">
              Product launches
            </p>
            <div className="mb-2">
              <Badge tone="amber">Seeded Demonstration Data</Badge>
            </div>
            {productLaunches.map((launch) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                key={launch.id}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge tone="green">{launch.competitor}</Badge>
                  <Badge>{launch.category}</Badge>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {launch.productName}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {launch.launchReadout}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Launched {launch.launchDate} at ${launch.price}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-meta uppercase tracking-[0.18em] text-muted-foreground">
              Campaign themes
            </p>
            <div className="mb-2">
              <Badge tone="amber">Seeded Demonstration Data</Badge>
            </div>
            {campaignThemes.map((theme) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                key={theme.id}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge tone="cyan">{theme.competitor}</Badge>
                  {theme.channels.slice(0, 2).map((channel) => (
                    <Badge key={channel}>{channel}</Badge>
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {theme.theme}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {theme.strategicRead}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {theme.evidence}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Competitive Risks</CardTitle>
            <Badge tone="amber">Seeded Demonstration Data</Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Pricing pressure and promotional mechanics that may erode KITSCH
            conversion.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {pricingSignals.map((signal) => (
            <div
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              key={signal.id}
            >
              <div className="flex flex-wrap gap-2">
                <Badge
                  tone={signal.discountPercent > 0 ? "amber" : "green"}
                >
                  {signal.competitor}
                </Badge>
                <Badge>{signal.productLine}</Badge>
                <Badge
                  tone={signal.discountPercent > 0 ? "rose" : "cyan"}
                >
                  {signal.discountPercent > 0
                    ? `-${signal.discountPercent}%`
                    : "No discount"}
                </Badge>
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">
                ${signal.previousPrice} to ${signal.currentPrice}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {signal.implication}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {signal.promotion} on {signal.changedAt}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supporting Signals</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Intelligence signals that support the recommendations above.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

/* ─── SIGNALS PANEL ─────────────────────────────────── */

function SignalsPanel({
  signals,
  collectedSignals,
  sourceRegistry
}: {
  signals: IntelligenceSignal[];
  collectedSignals: ScoredPublicSignal[];
  sourceRegistry: CompetitorSourceRegistryEntry[];
}) {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Strategic Signals</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Top public-source changes ranked for relevance, impact, and
            confidence.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Launch Radar</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Recent competitor product launches with strategic implications for
            KITSCH.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {collectedSignals
            .filter((s) => s.signalType === "product_launch")
            .slice(0, 5)
            .map((signal) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                key={signal.id}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge tone="green">{signal.competitor}</Badge>
                  <Badge>{signal.sourceType}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {signal.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {signal.summary}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  <span className="font-medium">Recommended action: </span>
                  {signal.recommendedAction}
                </p>
              </div>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Intelligence</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Pricing moves and promotional mechanics across competitors.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {collectedSignals
            .filter((s) => s.signalType === "pricing_move")
            .slice(0, 5)
            .map((signal) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                key={signal.id}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge tone="amber">{signal.competitor}</Badge>
                  <Badge>{signal.score.confidence} confidence</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {signal.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {signal.summary}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  <span className="font-medium">Why it matters: </span>
                  {signal.whyItMatters}
                </p>
              </div>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Intelligence</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Campaign angle shifts and messaging changes across competitors.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {collectedSignals
            .filter((s) => s.signalType === "campaign_angle")
            .slice(0, 5)
            .map((signal) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                key={signal.id}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge tone="cyan">{signal.competitor}</Badge>
                  <Badge>{signal.sourceType}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {signal.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {signal.summary}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  <span className="font-medium">Why it matters: </span>
                  {signal.whyItMatters}
                </p>
              </div>
            ))}
        </CardContent>
      </Card>
    </section>
  );
}

/* ─── EVIDENCE PANEL ────────────────────────────────── */

function EvidencePanel({
  collection
}: {
  collection: PublicCollectionResult;
}) {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evidence Feed</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Public-source collection events used to support the weekly brief.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {collection.collectionLog.map((entry) => (
            <div
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              key={`${entry.competitor}-${entry.sourceUrl}`}
            >
              <div className="flex flex-wrap gap-2">
                <Badge
                  tone={
                    entry.status === "Live"
                      ? "green"
                      : entry.status === "Failed"
                        ? "rose"
                        : "amber"
                  }
                >
                  {entry.status}
                </Badge>
                <Badge>{entry.sourceType}</Badge>
                <Badge>{entry.competitor}</Badge>
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground break-all">
                {entry.sourceUrl}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {entry.note}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Source Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from(
              new Set(collection.collectionLog.map((e) => e.sourceType))
            ).map((type) => (
              <div
                className="flex items-center justify-between rounded-md border border-white/10 bg-black/10 px-3 py-2"
                key={type}
              >
                <span className="text-sm text-foreground">{type}</span>
                <Badge>
                  {
                    collection.collectionLog.filter((e) => e.sourceType === type)
                      .length
                  }{" "}
                  entries
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collection Timestamps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-md border border-white/10 bg-black/10 px-3 py-2">
              <p className="text-xs text-muted-foreground">Last collection</p>
              <p className="text-sm text-foreground">
                {new Date(collection.collectedAt).toLocaleString()}
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-black/10 px-3 py-2">
              <p className="text-xs text-muted-foreground">Collection mode</p>
              <Badge
                tone={
                  collection.mode === "live-public-fetch" ? "green" : "amber"
                }
              >
                {collection.mode === "live-public-fetch"
                  ? "Live Fetch"
                  : "MVP Connectors"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidence Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(["High", "Medium", "Low"] as const).map((level) => {
              const count = collection.signals.filter(
                (s) => s.score.confidence === level
              ).length;
              return (
                <div
                  className="flex items-center justify-between rounded-md border border-white/10 bg-black/10 px-3 py-2"
                  key={level}
                >
                  <span className="text-sm text-foreground">{level}</span>
                  <Badge
                    tone={
                      level === "High"
                        ? "green"
                        : level === "Medium"
                          ? "amber"
                          : "neutral"
                    }
                  >
                    {count} signals
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ─── COLLECTION PANEL ──────────────────────────────── */

function CollectionPanel({
  collection
}: {
  collection: PublicCollectionResult;
}) {
  return (
    <section className="space-y-6">
      <CollectionControl initialCollection={collection} />
    </section>
  );
}
