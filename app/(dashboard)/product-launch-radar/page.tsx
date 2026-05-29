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
import { productLaunches } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

export default function ProductLaunchRadarPage() {
  return (
    <>
      <PageHeader
        description="New product launches ranked by strategic relevance, not volume of detected catalog changes."
        eyebrow="Product Launch Radar"
        title="Launches worth executive attention"
      />

      <DataTableSection
        description="Each launch includes the strategic readout needed for merchandising and campaign planning."
        title="Detected launches"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Launch</TableHead>
              <TableHead>Competitor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead>Readout</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productLaunches.map((launch) => (
              <TableRow key={launch.id}>
                <TableCell>
                  <p className="font-medium text-foreground">{launch.productName}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {launch.launchDate}
                  </p>
                </TableCell>
                <TableCell>{launch.competitor}</TableCell>
                <TableCell>{launch.category}</TableCell>
                <TableCell>{formatCurrency(launch.price)}</TableCell>
                <TableCell>
                  <Badge tone={launch.signalScore > 85 ? "rose" : "cyan"}>
                    {launch.signalScore}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="text-sm leading-6">{launch.launchReadout}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableSection>
    </>
  );
}
