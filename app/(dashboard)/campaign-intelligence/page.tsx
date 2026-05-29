import { Megaphone } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { campaignThemes } from "@/lib/sample-data";

export default function CampaignIntelligencePage() {
  return (
    <>
      <PageHeader
        description="Messaging themes and creative concepts distilled into the strategic shifts KITSCH should watch."
        eyebrow="Campaign Intelligence"
        title="Themes gaining competitive momentum"
      />

      <section className="grid gap-5 lg:grid-cols-3">
        {campaignThemes.map((theme) => (
          <Card key={theme.id}>
            <CardHeader>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-signal-cyan/25 bg-signal-cyan/10 text-signal-cyan">
                <Megaphone className="h-5 w-5" aria-hidden />
              </div>
              <CardTitle>{theme.theme}</CardTitle>
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
                  Evidence
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {theme.evidence}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  Strategic read
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {theme.strategicRead}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
