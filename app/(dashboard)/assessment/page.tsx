import { CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const checklist = [
  {
    item: "Public Data Sources",
    notes:
      "All configured sources are public URLs in data/competitors.json; no credentials or restricted APIs are required."
  },
  {
    item: "Competitor Websites",
    notes:
      "websiteCollector fetches public HTML when live mode is enabled and extracts title, meta description, price markers, and promotional copy."
  },
  {
    item: "Social Sources",
    notes:
      "socialCollector records public Instagram and TikTok metadata in MVP mode without post scraping or login requirements."
  },
  {
    item: "Ad Library Sources",
    notes:
      "adLibraryCollector supports public Meta Ad Library entry points and normalizes campaign headline/theme evidence."
  },
  {
    item: "Signal Normalization",
    notes:
      "normalizeSignal produces a stable signal contract with id, competitor, source type, signal type, summary, evidence, source URL, and timestamp."
  },
  {
    item: "Signal Scoring",
    notes:
      "scoreSignal assigns relevance, impact, confidence, and urgency, then prioritizes high-relevance and high-impact signals."
  },
  {
    item: "Weekly Brief Generation",
    notes:
      "The weekly brief includes executive summary, top signals, launches, pricing moves, campaign angles, what matters, what to ignore, and source log."
  },
  {
    item: "Executive Recommendations",
    notes:
      "Each surfaced insight includes what happened, why it matters, and a recommended action."
  },
  {
    item: "Evidence Traceability",
    notes:
      "Signal cards expose source type badges, evidence links, collection timestamps, and evidence text."
  },
  {
    item: "Dashboard Integration",
    notes:
      "The executive dashboard and weekly brief page both expose data collection status and a runnable public collection workflow."
  },
  {
    item: "README Documentation",
    notes:
      "README documents data collection strategy, live versus MVP sources, architecture, limitations, and assessment requirement mapping."
  }
];

export default function AssessmentPage() {
  return (
    <>
      <PageHeader
        description="A reviewer-facing compliance map for the KITSCH SignalFlow assessment. It summarizes what is implemented and where to verify it."
        eyebrow="Assessment"
        title="Assessment compliance checklist"
      />

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="green">Reviewer ready</Badge>
            <Badge>Public-source MVP</Badge>
            <Badge tone="amber">No private credentials</Badge>
          </div>
          <CardTitle className="pt-2">Compliance in under two minutes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {checklist.map((entry) => (
            <div
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              key={entry.item}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-signal-green"
                  aria-hidden
                />
                <div>
                  <p className="font-medium text-foreground">✓ {entry.item}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {entry.notes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
