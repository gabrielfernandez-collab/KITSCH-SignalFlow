import { DataTableSection } from "@/components/dashboard/data-table-section";
import { EvidencePanel } from "@/components/dashboard/evidence-panel";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { pricingSignals } from "@/lib/sample-data";
import { pricingToFramework } from "@/lib/signal-presentation";
import { formatCurrency, formatPercent } from "@/lib/utils";

const pricingSourceUrls: Record<string, string> = {
  Slip: "https://www.slip.com",
  "Heatless Hair": "https://heatlesshair.com",
  "Crown Affair": "https://www.crownaffair.com"
};

export default function PricingIntelligencePage() {
  return (
    <>
      <PageHeader
        description="Pricing movement, promotion mechanics, and likely implications for KITSCH assortment and ecommerce conversion."
        eyebrow="Pricing Intelligence"
        title="Where price pressure is forming"
      />

      <DataTableSection
        description="Promotions are interpreted through positioning impact rather than tracked as raw markdown logs."
        title="Competitive pricing risks"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product line</TableHead>
              <TableHead>Competitor</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>Previous</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Leadership Insight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricingSignals.map((signal) => {
              const framework = pricingToFramework(signal);

              return (
                <TableRow key={signal.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">
                      {signal.productLine}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {signal.promotion}
                    </p>
                  </TableCell>
                  <TableCell>{signal.competitor}</TableCell>
                  <TableCell>{formatCurrency(signal.currentPrice)}</TableCell>
                  <TableCell>{formatCurrency(signal.previousPrice)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Badge tone={signal.discountPercent > 0 ? "amber" : "green"}>
                        {formatPercent(signal.discountPercent / 100)}
                      </Badge>
                      <Badge>Impact Score: {framework.impactScore}</Badge>
                      <Badge>{framework.confidence} confidence</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xl">
                    <div className="space-y-3">
                      <p className="text-sm leading-6">
                        <span className="font-medium text-foreground">
                          What Happened:{" "}
                        </span>
                        {framework.whatHappened}
                      </p>
                      <p className="text-sm leading-6">
                        <span className="font-medium text-foreground">
                          Why It Matters:{" "}
                        </span>
                        {framework.whyItMatters}
                      </p>
                      <p className="text-sm leading-6">
                        <span className="font-medium text-foreground">
                          Recommended Action:{" "}
                        </span>
                        {framework.recommendedAction}
                      </p>
                      <EvidencePanel
                        collectionDate={signal.changedAt}
                        confidence={framework.confidence}
                        evidenceSummary={signal.implication}
                        observedText={`Seeded Demonstration Data: ${signal.promotion}; current ${signal.currentPrice}, previous ${signal.previousPrice}.`}
                        sourceLabel={`${signal.competitor} public pricing source`}
                        sourceType="Website"
                        sourceUrl={pricingSourceUrls[signal.competitor] ?? "#"}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DataTableSection>
    </>
  );
}
