import competitors from "@/data/competitors.json";
import type { PublicCompetitorConfig, RawCollectedSignal } from "@/lib/types";

const competitorConfigs = competitors as PublicCompetitorConfig[];

function socialSummary(competitor: PublicCompetitorConfig) {
  return `${competitor.name} public social profiles are configured for campaign and messaging review across Instagram and TikTok.`;
}

export async function collectSocialSignals(options?: {
  collectedAt?: string;
}): Promise<RawCollectedSignal[]> {
  const collectedAt = options?.collectedAt ?? new Date().toISOString();

  return competitorConfigs
    .filter((competitor) => competitor.instagram || competitor.tiktok)
    .map((competitor) => ({
      competitor: competitor.name,
      sourceType: "Social",
      signalType: "messaging_shift",
      title: `${competitor.name} public social profile metadata`,
      summary: socialSummary(competitor),
      evidence: [
        competitor.instagram ? `Instagram: ${competitor.instagram}` : "",
        competitor.tiktok ? `TikTok: ${competitor.tiktok}` : "",
        `Category: ${competitor.category}`,
        "MVP connector records public profile URLs and metadata; post-level expansion can be added without changing the normalized signal contract."
      ]
        .filter(Boolean)
        .join(" | "),
      sourceUrl: competitor.instagram || competitor.tiktok,
      collectedAt,
      metadata: {
        instagram: competitor.instagram,
        tiktok: competitor.tiktok,
        category: competitor.category
      }
    }));
}
