import { Download, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CollectionControl } from "@/components/dashboard/collection-control";
import { WeeklyIntelModule } from "@/components/dashboard/weekly-intel-module";
import { collectPublicSignals } from "@/lib/collector";
import { generateWeeklyBrief, getPrioritizedSignals } from "@/lib/intelligence";
import { sourceRegistry } from "@/lib/source-registry";

export default async function WeeklyBriefGeneratorPage() {
  const brief = generateWeeklyBrief();
  const signals = getPrioritizedSignals();
  const collection = await collectPublicSignals({
    liveFetch: process.env.SIGNALFLOW_LIVE_FETCH === "true"
  });

  return (
    <>
      <PageHeader
        actions={
          <>
            <Button variant="secondary">
              <Download className="h-4 w-4" aria-hidden />
              Export draft
            </Button>
            <Button>
              <Sparkles className="h-4 w-4" aria-hidden />
              Generate brief
            </Button>
          </>
        }
        description="A structured executive report generated from traceable product, pricing, campaign, and trend signals."
        eyebrow="Weekly Brief Generator"
        title="Executive intelligence report"
      />

      <CollectionControl initialCollection={collection} />

      <section className="grid min-w-0 max-w-full gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="green">Week of {brief.weekOf}</Badge>
              <Badge>Executive ready</Badge>
              <Badge tone="amber">Seeded Demonstration Data</Badge>
            </div>
            <CardTitle className="pt-2">Executive summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-base leading-7 text-foreground">
              {brief.executiveSummary}
            </p>

            <Separator />

            <section>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground">
                Market trends
              </h3>
              <div className="mt-3 grid gap-3">
                {brief.marketTrends.map((trend) => (
                  <p
                    className="rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-foreground"
                    key={trend}
                  >
                    {trend}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground">
                What matters
              </h3>
              <div className="mt-3 grid gap-3">
                {brief.whatMatters.map((item) => (
                  <p
                    className="rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-foreground"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground">
                What to ignore
              </h3>
              <div className="mt-3 grid gap-3">
                {brief.whatToIgnore.map((item) => (
                  <p
                    className="rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold uppercase text-muted-foreground">
                Recommendations
              </h3>
              <div className="mt-3 space-y-4">
                {brief.recommendations.map((recommendation) => (
                  <div key={recommendation.id}>
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
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Brief composition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{brief.productLaunches.length} launch readouts</p>
              <p>{brief.pricingSignals.length} pricing intelligence items</p>
              <p>{brief.campaignThemes.length} campaign themes</p>
              <p>{brief.recommendations.length} recommendations</p>
              <p>{brief.sourceLog.length} source log entries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traceability guardrails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>Insights are derived from stored public-source signals.</p>
              <p>Unsupported conclusions should be rejected before executive export.</p>
              <p>Future OpenAI calls should return citations to collected source rows.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <WeeklyIntelModule
        brief={brief}
        collectedSignals={collection.signals}
        signals={signals}
        sourceRegistry={sourceRegistry}
      />
    </>
  );
}
