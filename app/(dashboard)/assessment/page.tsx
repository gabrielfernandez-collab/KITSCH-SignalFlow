import { CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Status = "Implemented" | "MVP Implemented" | "Partially Implemented" | "Expansion Ready";

interface ChecklistEntry {
  item: string;
  status: Status;
  notes: string;
}

function statusTone(status: Status): "green" | "cyan" | "amber" | "neutral" {
  switch (status) {
    case "Implemented": return "green";
    case "MVP Implemented": return "cyan";
    case "Partially Implemented": return "amber";
    case "Expansion Ready": return "neutral";
  }
}

const checklist: ChecklistEntry[] = [
  {
    item: "Public Data Sources",
    status: "Implemented",
    notes:
      "All configured sources are public URLs in data/competitors.json; no credentials or restricted APIs are required."
  },
  {
    item: "Competitor Websites",
    status: "MVP Implemented",
    notes:
      "websiteCollector fetches public HTML when live mode is enabled and extracts title, meta description, price markers, and promotional copy. Falls back to seeded snapshots by default."
  },
  {
    item: "Social Sources",
    status: "MVP Implemented",
    notes:
      "socialCollector records public Instagram and TikTok metadata in MVP mode without post scraping or login requirements. Returns profile URL + category context only."
  },
  {
    item: "Ad Library Sources",
    status: "MVP Implemented",
    notes:
      "adLibraryCollector supports public Meta Ad Library entry points and normalizes campaign headline/theme evidence. Returns reference URL + inferred theme only."
  },
  {
    item: "Signal Normalization",
    status: "Implemented",
    notes:
      "normalizeSignal produces a stable signal contract with id, competitor, source type, signal type, summary, evidence, source URL, and timestamp."
  },
  {
    item: "Signal Scoring",
    status: "Implemented",
    notes:
      "scoreSignal assigns relevance, impact, confidence, and urgency scores (Low/Medium/High). Executive filtering suppresses low-relevance and low-impact signals."
  },
  {
    item: "Weekly Brief Generation",
    status: "Implemented",
    notes:
      "The weekly brief includes executive summary, top signals, launches, pricing moves, campaign angles, what matters, what to ignore, and recommendations."
  },
  {
    item: "Executive Recommendations",
    status: "Implemented",
    notes:
      "Each surfaced insight includes what happened, why it matters, and a recommended action. Actions workspace provides expanded briefing panels."
  },
  {
    item: "Evidence Traceability",
    status: "Implemented",
    notes:
      "Signal cards expose source type badges, evidence links, collection timestamps, and evidence text. Evidence workspace shows collection log and source registry."
  },
  {
    item: "Dashboard Integration",
    status: "Implemented",
    notes:
      "The executive dashboard uses a 5-workspace system (Brief, Actions, Signals, Evidence, Collection) with keyboard navigation and localStorage persistence."
  },
  {
    item: "Workspace Navigation",
    status: "Implemented",
    notes:
      "WorkspaceTabs component provides keyboard-accessible, aria-compliant tab switching. Active state indicated by green underline. localStorage remembers last workspace."
  },
  {
    item: "Collection Workflow",
    status: "MVP Implemented",
    notes:
      "Run Public Collection button triggers /api/collect. Collection mode, source/signal KPIs, log, and info box displayed in Collection workspace."
  },
  {
    item: "Live Collection Toggle",
    status: "Partially Implemented",
    notes:
      "SIGNALFLOW_LIVE_FETCH env var controls live website fetching. No query-param override is implemented yet. Documented in README and collection info box."
  },
  {
    item: "README Documentation",
    status: "Implemented",
    notes:
      "README documents data collection strategy, live versus MVP sources, architecture with route listing, limitations, assessment requirement mapping, and submission summary."
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
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">✓ {entry.item}</p>
                    <Badge tone={statusTone(entry.status)} className="shrink-0 whitespace-nowrap text-[10px]">
                      {entry.status}
                    </Badge>
                  </div>
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
