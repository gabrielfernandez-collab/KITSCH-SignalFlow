import { DataTableSection } from "@/components/dashboard/data-table-section";
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
import { formatCurrency, formatPercent } from "@/lib/utils";

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
        title="Pricing and promotion signals"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product line</TableHead>
              <TableHead>Competitor</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>Previous</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Implication</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricingSignals.map((signal) => (
              <TableRow key={signal.id}>
                <TableCell>
                  <p className="font-medium text-foreground">{signal.productLine}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {signal.promotion}
                  </p>
                </TableCell>
                <TableCell>{signal.competitor}</TableCell>
                <TableCell>{formatCurrency(signal.currentPrice)}</TableCell>
                <TableCell>{formatCurrency(signal.previousPrice)}</TableCell>
                <TableCell>
                  <Badge tone={signal.discountPercent > 0 ? "amber" : "green"}>
                    {formatPercent(signal.discountPercent / 100)}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="text-sm leading-6">{signal.implication}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableSection>
    </>
  );
}
