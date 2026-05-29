import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { SignalCard } from "@/components/dashboard/signal-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollectionControl } from "@/components/dashboard/collection-control";
import { Separator } from "@/components/ui/separator";
import { collectPublicSignals } from "@/lib/collector";
import { getExecutiveMetrics, getTopSignals } from "@/lib/intelligence";
import { recommendations, weeklyBrief } from "@/lib/sample-data";

export default async function ExecutiveDashboardPage() {
  const metrics = getExecutiveMetrics();
  const signals = getTopSignals();
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
        description="A 60-second operating view of the competitor moves most likely to influence KITSCH product, marketing, pricing, and positioning decisions."
        eyebrow="Executive Dashboard"
        title="What leadership needs to know this week"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <CollectionControl initialCollection={collection} />

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Weekly readout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {weeklyBrief.executiveSummary}
              </p>
              <Separator className="my-5" />
              <div className="space-y-3">
                {weeklyBrief.marketTrends.map((trend) => (
                  <div className="rounded-md border border-white/10 bg-white/[0.03] p-3" key={trend}>
                    <p className="text-sm leading-6 text-foreground">{trend}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((recommendation) => (
                <div key={recommendation.id}>
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
        </div>
      </section>
    </>
  );
}
