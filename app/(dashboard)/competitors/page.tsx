import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompetitorSummary } from "@/lib/intelligence";
import { sourceRegistry } from "@/lib/source-registry";

export default function CompetitorsPage() {
  const competitors = getCompetitorSummary();

  return (
    <>
      <PageHeader
        description="Strategic competitor profiles focused on why each brand matters to KITSCH decisions."
        eyebrow="Competitors"
        title="Strategic competitor profiles"
      />

      <section className="grid gap-5 md:grid-cols-2">
        {competitors.map((competitor) => (
          <Card key={competitor.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>{competitor.name}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {competitor.segment}
                  </p>
                </div>
                <Badge tone={competitor.signalScore >= 80 ? "green" : "cyan"}>
                  Impact Score {competitor.signalScore}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-foreground">
                {competitor.positioning}
              </p>
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Why This Competitor Matters
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {competitor.name} matters because it competes in{" "}
                  {competitor.segment.toLowerCase()} and helps indicate how
                  consumer expectations are shifting around hair routines,
                  accessories, pricing, and campaign positioning.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  What Happened
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {competitor.notableChange}
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Why It Matters
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    Changes from this competitor may create overlap with KITSCH
                    merchandising, campaign language, or category pricing.
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Recommended Action
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    Track repeat evidence across public website, social, and ad
                    library sources before escalating roadmap changes.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {competitor.monitoredSources.map((source) => (
                  <Badge key={source}>{source}</Badge>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Public source registry
                </p>
                <div className="flex flex-wrap gap-2">
                  {sourceRegistry
                    .find((entry) => entry.competitorName === competitor.name)
                    ?.sources.map((source) => (
                      <a
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                        href={source.url}
                        key={source.id}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {source.label}
                      </a>
                    ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {competitor.activeSignals} active strategic signals. Last activity:{" "}
                {competitor.lastActivityAt}.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
