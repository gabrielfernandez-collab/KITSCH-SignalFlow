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
        description="Profiles and activity posture for monitored competitors, emphasizing changes that affect KITSCH strategy."
        eyebrow="Competitors"
        title="Monitored competitive set"
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
                  score {competitor.signalScore}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-foreground">
                {competitor.positioning}
              </p>
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Notable change
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {competitor.notableChange}
                </p>
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
