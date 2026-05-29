import competitors from "@/data/competitors.json";
import type {
  CompetitorSource,
  CompetitorSourceRegistryEntry,
  PublicCompetitorConfig
} from "@/lib/types";

const competitorConfigs = competitors as PublicCompetitorConfig[];

function buildSources(competitor: PublicCompetitorConfig): CompetitorSource[] {
  return [
    {
      id: `${competitor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-website`,
      label: "Website",
      kind: "website",
      url: competitor.website,
      notes: "Public HTML source for titles, meta descriptions, prices, and promotional copy."
    },
    competitor.instagram
      ? {
          id: `${competitor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-instagram`,
          label: "Instagram",
          kind: "social",
          url: competitor.instagram,
          notes: "Public social profile URL for campaign and messaging monitoring."
        }
      : undefined,
    competitor.tiktok
      ? {
          id: `${competitor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-tiktok`,
          label: "TikTok",
          kind: "social",
          url: competitor.tiktok,
          notes: "Public social profile URL for creator-style hooks and visible metadata."
        }
      : undefined,
    competitor.facebookAds
      ? {
          id: `${competitor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-ads`,
          label: "Meta Ad Library",
          kind: "ad-library",
          url: competitor.facebookAds,
          notes: "Public ad library entry point for campaign headline and theme monitoring."
        }
      : undefined
  ].filter((source): source is CompetitorSource => Boolean(source));
}

export const sourceRegistry: CompetitorSourceRegistryEntry[] = competitorConfigs.map(
  (competitor) => ({
    id: competitor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    competitorName: competitor.name,
    websiteUrl: competitor.website,
    productFocus: competitor.category,
    socialSourceUrl: competitor.instagram || competitor.tiktok,
    adLibraryUrl: competitor.facebookAds,
    whyItMatters: `${competitor.name} is relevant to KITSCH because it competes in ${competitor.category.toLowerCase()}.`,
    sources: buildSources(competitor)
  })
);
