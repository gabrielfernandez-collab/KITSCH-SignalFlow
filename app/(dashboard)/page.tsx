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
import { collectPublicSignals } from "@/lib/collector";
import {
  getExecutiveMetrics,
  getLeadershipActions,
  getTopSignals
} from "@/lib/intelligence";
import {
  campaignThemes,
  pricingSignals,
  productLaunches,
  recommendations,
  weeklyBrief
} from "@/lib/sample-data";

export default async function ExecutiveDashboardPage() {
  const metrics = getExecutiveMetrics();
  const signals = getTopSignals();
  const leadershipActions = getLeadershipActions();
  const collection = await collectPublicSignals({
    liveFetch: process.env.SIGNALFLOW_LIVE_FETCH === "true"
  });

  return (
    <>
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
        eyebrow="Executive Dashboard"
        title="Monday Leadership Brief"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
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
              <CardTitle className="pt-2">What leadership needs to know first</CardTitle>
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
                      <Badge tone={index === 0 ? "green" : index === 1 ? "cyan" : "amber"}>
                        0{index + 1}
                      </Badge>
                      <p className="text-sm leading-6 text-foreground">{item}</p>
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
                Prioritized actions that should shape the next planning conversation.
              </p>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-3">
              {leadershipActions.map((item, index) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  key={item.id}
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={index === 0 ? "rose" : "amber"}>Action #{index + 1}</Badge>
                    <Badge>{item.confidence} confidence</Badge>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
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
              <CardTitle>Recommended Actions</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">
                Operational recommendations translated from the weekly intelligence brief.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((recommendation) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  key={recommendation.id}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={recommendation.priority === "critical" ? "rose" : "amber"}>
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
              <CardTitle>Strategic Signals</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">
                Top public-source changes ranked for relevance, impact, and confidence.
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
              <CardTitle>Emerging Opportunities</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">
                New launches and campaign patterns that point to whitespace KITSCH can own.
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
                    <p className="mt-3 text-sm font-semibold text-foreground">{theme.theme}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {theme.strategicRead}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">{theme.evidence}</p>
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
                Pricing pressure and promotional mechanics that may erode KITSCH conversion.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {pricingSignals.map((signal) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  key={signal.id}
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={signal.discountPercent > 0 ? "amber" : "green"}>
                      {signal.competitor}
                    </Badge>
                    <Badge>{signal.productLine}</Badge>
                    <Badge tone={signal.discountPercent > 0 ? "rose" : "cyan"}>
                      {signal.discountPercent > 0 ? `-${signal.discountPercent}%` : "No discount"}
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
              <div className="flex items-center gap-2">
                <CardTitle>Market Narrative</CardTitle>
                <Badge tone="amber">Seeded Demonstration Data</Badge>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                The short version of what is changing across the market and why it matters.
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
                      <p className="text-sm leading-6 text-muted-foreground" key={trend}>
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
                      <p className="text-sm leading-6 text-muted-foreground" key={item}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    <Badge tone={entry.status === "Live" ? "green" : entry.status === "Failed" ? "rose" : "amber"}>
                      {entry.status}
                    </Badge>
                    <Badge>{entry.sourceType}</Badge>
                    <Badge>{entry.competitor}</Badge>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">{entry.sourceUrl}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{entry.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <CollectionControl initialCollection={collection} />

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
        </aside>
      </section>
    </>
  );
}
