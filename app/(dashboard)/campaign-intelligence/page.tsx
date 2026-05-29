import { Megaphone } from "lucide-react";

import { EvidencePanel } from "@/components/dashboard/evidence-panel";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaignThemes } from "@/lib/sample-data";
import { campaignToFramework } from "@/lib/signal-presentation";

const campaignSourceUrls: Record<string, string> = {
  Dae: "https://www.instagram.com/daehair",
  "Heatless Hair": "https://heatlesshair.com",
  Slip: "https://www.facebook.com/ads/library/"
};

export default function CampaignIntelligencePage() {
  return (
    <>
      <PageHeader
        description="Messaging themes and creative concepts distilled into the strategic shifts KITSCH should watch."
        eyebrow="Campaign Intelligence"
        title="Themes gaining competitive momentum"
      />

      <section className="grid gap-5 lg:grid-cols-3">
        {campaignThemes.map((theme) => {
          const framework = campaignToFramework(theme);

          return (
            <Card key={theme.id}>
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-signal-cyan/25 bg-signal-cyan/10 text-signal-cyan">
                  <Megaphone className="h-5 w-5" aria-hidden />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone={framework.priority === "High" ? "rose" : "amber"}>
                    Priority: {framework.priority}
                  </Badge>
                  <Badge>Impact Score: {framework.impactScore}</Badge>
                  <Badge>{framework.confidence} confidence</Badge>
                </div>
                <CardTitle className="pt-2">{theme.theme}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {theme.competitor} - first seen {theme.firstSeen}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {theme.channels.map((channel) => (
                    <Badge key={channel}>{channel}</Badge>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    What Happened
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {framework.whatHappened}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Why It Matters
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {framework.whyItMatters}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    Recommended Action
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {framework.recommendedAction}
                  </p>
                </div>
                <EvidencePanel
                  collectionDate={theme.firstSeen}
                  confidence={framework.confidence}
                  evidenceSummary={theme.strategicRead}
                  observedText={`Seeded Demonstration Data: ${theme.evidence}`}
                  sourceLabel={`${theme.competitor} public campaign source`}
                  sourceType={theme.channels.includes("Meta Ads") ? "Ad Library" : "Social"}
                  sourceUrl={campaignSourceUrls[theme.competitor] ?? "#"}
                />
              </CardContent>
            </Card>
          );
        })}
      </section>
    </>
  );
}
