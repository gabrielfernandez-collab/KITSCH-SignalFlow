import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { ConfidenceLevel, SourceKind } from "@/lib/types";

interface EvidencePanelProps {
  collectionDate: string;
  confidence: ConfidenceLevel;
  evidenceSummary: string;
  observedText: string;
  sourceLabel?: string;
  sourceType: SourceKind | "Website" | "Social" | "Ad Library";
  sourceUrl: string;
}

export function EvidencePanel({
  collectionDate,
  confidence,
  evidenceSummary,
  observedText,
  sourceLabel,
  sourceType,
  sourceUrl
}: EvidencePanelProps) {
  return (
    <details className="rounded-md border border-white/10 bg-white/[0.03] p-3">
      <summary className="cursor-pointer text-sm font-medium text-foreground">
        View Evidence
      </summary>
      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge>{String(sourceType)}</Badge>
          <Badge>{confidence} confidence</Badge>
          <Badge>Collected {collectionDate}</Badge>
        </div>
        <a
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          href={sourceUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          {sourceLabel ?? "Source URL"}
        </a>
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Observed Text
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {observedText}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Evidence Summary
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground">
            {evidenceSummary}
          </p>
        </div>
      </div>
    </details>
  );
}
