import competitors from "@/data/competitors.json";
import type { PublicCompetitorConfig, RawCollectedSignal } from "@/lib/types";

const competitorConfigs = competitors as PublicCompetitorConfig[];

function inferCampaignTheme(category: string) {
  if (/silk|premium/i.test(category)) {
    return "Premium beauty accessory positioning";
  }

  if (/mass|everyday|brush|elastic/i.test(category)) {
    return "Everyday styling utility";
  }

  if (/spiral|clip|headband|lifestyle/i.test(category)) {
    return "Color, comfort, and lifestyle-led accessories";
  }

  return "Hair routine campaign monitoring";
}

export async function collectAdLibrarySignals(options?: {
  collectedAt?: string;
}): Promise<RawCollectedSignal[]> {
  const collectedAt = options?.collectedAt ?? new Date().toISOString();

  return competitorConfigs
    .filter((competitor) => competitor.facebookAds)
    .map((competitor) => {
      const campaignTheme = inferCampaignTheme(competitor.category);

      return {
        competitor: competitor.name,
        sourceType: "Ad Library",
        signalType: "campaign_angle",
        title: `${competitor.name} public ad library monitor`,
        summary: `${competitor.name} is configured for public ad-library review around ${campaignTheme.toLowerCase()}.`,
        evidence: [
          `Ad source URL: ${competitor.facebookAds}`,
          `Campaign headline: ${campaignTheme}`,
          `Campaign copy: MVP captures public ad library entry point and theme until ad creative extraction is expanded.`,
          `Category: ${competitor.category}`
        ].join(" | "),
        sourceUrl: competitor.facebookAds,
        collectedAt,
        metadata: {
          campaignHeadline: campaignTheme,
          campaignTheme,
          category: competitor.category
        }
      };
    });
}
