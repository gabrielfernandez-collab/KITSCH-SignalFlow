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
import { productLaunches } from "@/lib/sample-data";
import { launchToFramework } from "@/lib/signal-presentation";
import { formatCurrency } from "@/lib/utils";

const launchSourceUrls: Record<string, string> = {
  "Heatless Hair": "https://heatlesshair.com",
  "Crown Affair": "https://www.crownaffair.com",
  Dae: "https://daehair.com"
};

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
        title="Launch intelligence"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Launch</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Intelligence Framework</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productLaunches.map((launch) => {
              const framework = launchToFramework(launch);

              return (
                <TableRow key={launch.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">
                      {launch.productName}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {launch.competitor} - {launch.category} - {launch.launchDate}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Badge tone={framework.priority === "High" ? "rose" : "amber"}>
                        Priority: {framework.priority}
                      </Badge>
                      <Badge>Impact Score: {framework.impactScore}</Badge>
                      <Badge>{framework.confidence} confidence</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(launch.price)}</TableCell>
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
                        collectionDate={launch.launchDate}
                        confidence={framework.confidence}
                        evidenceSummary={launch.launchReadout}
                        observedText={`Sample Signal: ${launch.productName} launch readout for ${launch.competitor}.`}
                        sourceLabel={`${launch.competitor} public product source`}
                        sourceType="Website"
                        sourceUrl={launchSourceUrls[launch.competitor] ?? "#"}
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
