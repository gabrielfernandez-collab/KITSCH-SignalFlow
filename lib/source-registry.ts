import type { CompetitorSourceRegistryEntry } from "@/lib/types";

export const sourceRegistry: CompetitorSourceRegistryEntry[] = [
  {
    id: "heatless-hair",
    competitorName: "Heatless Hair",
    websiteUrl: "https://heatlesshair.com",
    productFocus: "Heatless styling tools and satin curl systems",
    socialSourceUrl: "https://www.tiktok.com/@heatlesshair",
    adLibraryUrl: "https://www.facebook.com/ads/library/",
    whyItMatters:
      "Directly overlaps with KITSCH heatless styling and satin accessory demand moments.",
    sources: [
      {
        id: "heatless-site",
        label: "Shopify storefront",
        kind: "shopify",
        url: "https://heatlesshair.com",
        notes: "Product architecture, pricing, bundles, and campaign landing pages."
      },
      {
        id: "heatless-tiktok",
        label: "TikTok profile",
        kind: "social",
        url: "https://www.tiktok.com/@heatlesshair",
        notes: "Tutorial hooks and consumer-facing use cases."
      }
    ]
  },
  {
    id: "dae",
    competitorName: "Dae",
    websiteUrl: "https://daehair.com",
    productFocus: "Clean haircare, scalp care, and routine-led consumables",
    socialSourceUrl: "https://www.instagram.com/daehair",
    adLibraryUrl: "https://www.facebook.com/ads/library/",
    whyItMatters:
      "Signals where beauty consumers are moving between accessories, prep, and consumable routines.",
    sources: [
      {
        id: "dae-site",
        label: "Brand website",
        kind: "website",
        url: "https://daehair.com",
        notes: "Launch and PDP messaging for haircare routines."
      },
      {
        id: "dae-instagram",
        label: "Instagram profile",
        kind: "social",
        url: "https://www.instagram.com/daehair",
        notes: "Campaign themes and creative language."
      }
    ]
  },
  {
    id: "crown-affair",
    competitorName: "Crown Affair",
    websiteUrl: "https://www.crownaffair.com",
    productFocus: "Premium hair rituals, tools, brushes, towels, and accessories",
    socialSourceUrl: "https://www.instagram.com/crownaffair",
    adLibraryUrl: "https://www.facebook.com/ads/library/",
    whyItMatters:
      "Premium positioning shows how routine architecture can raise willingness to pay for hair tools.",
    sources: [
      {
        id: "crown-site",
        label: "Brand website",
        kind: "website",
        url: "https://www.crownaffair.com",
        notes: "Assortment, routine builder, and bundle strategy."
      }
    ]
  },
  {
    id: "slip",
    competitorName: "Slip",
    websiteUrl: "https://www.slip.com",
    productFocus: "Silk sleep, beauty, and hair accessories",
    socialSourceUrl: "https://www.instagram.com/slipsilkpillowcase",
    adLibraryUrl: "https://www.facebook.com/ads/library/",
    whyItMatters:
      "Useful benchmark for premium accessory pricing, gifting, and discount containment.",
    sources: [
      {
        id: "slip-site",
        label: "Shopify storefront",
        kind: "shopify",
        url: "https://www.slip.com",
        notes: "Bundle pricing, gifting pages, and promotion depth."
      },
      {
        id: "slip-ads",
        label: "Meta Ad Library",
        kind: "ad-library",
        url: "https://www.facebook.com/ads/library/",
        notes: "Public ad concepts and promotional framing."
      }
    ]
  }
];
