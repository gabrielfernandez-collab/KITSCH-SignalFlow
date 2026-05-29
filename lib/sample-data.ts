import type {
  CampaignTheme,
  Competitor,
  IntelligenceSignal,
  PricingSignal,
  ProductLaunch,
  Recommendation,
  WeeklyBrief
} from "@/lib/types";

export const competitors: Competitor[] = [
  {
    id: "heatless-hair",
    name: "Heatless Hair",
    segment: "Heatless styling",
    positioning: "Tutorial-led satin styling accessories",
    monitoredSources: ["Shopify", "Instagram", "TikTok", "Meta Ad Library"],
    signalScore: 88,
    lastActivityAt: "2026-05-27",
    notableChange: "Expanded overnight curl system messaging into travel bundles."
  },
  {
    id: "dae",
    name: "Dae",
    segment: "Clean haircare",
    positioning: "Desert-inspired haircare with elevated scent stories",
    monitoredSources: ["Website", "Instagram", "TikTok", "Pinterest"],
    signalScore: 74,
    lastActivityAt: "2026-05-25",
    notableChange: "Shifted campaign language toward scalp wellness and shine."
  },
  {
    id: "crown-affair",
    name: "Crown Affair",
    segment: "Premium hair rituals",
    positioning: "Minimalist routine essentials for hair health",
    monitoredSources: ["Website", "Instagram", "YouTube", "Newsletter"],
    signalScore: 81,
    lastActivityAt: "2026-05-23",
    notableChange: "Added routine-builder prompts on PDPs for cross-sell conversion."
  },
  {
    id: "slip",
    name: "Slip",
    segment: "Silk accessories",
    positioning: "Luxury silk sleep and beauty essentials",
    monitoredSources: ["Shopify", "Instagram", "Meta Ad Library", "Pinterest"],
    signalScore: 69,
    lastActivityAt: "2026-05-21",
    notableChange: "Discount depth increased during gifting campaign window."
  }
];

export const productLaunches: ProductLaunch[] = [
  {
    id: "pl-001",
    competitor: "Heatless Hair",
    productName: "Mini Satin Curl Travel Kit",
    category: "Heatless styling",
    launchDate: "2026-05-27",
    price: 32,
    signalScore: 91,
    launchReadout:
      "Compact kit positions heatless styling as a packable summer routine, directly adjacent to KITSCH travel accessories."
  },
  {
    id: "pl-002",
    competitor: "Crown Affair",
    productName: "The Daily Glossing Comb",
    category: "Hair tools",
    launchDate: "2026-05-23",
    price: 48,
    signalScore: 79,
    launchReadout:
      "Premium comb launch reinforces routine-led tool attachment and higher willingness to pay for ritualized accessories."
  },
  {
    id: "pl-003",
    competitor: "Dae",
    productName: "Scalp Reset Mist",
    category: "Scalp care",
    launchDate: "2026-05-20",
    price: 28,
    signalScore: 72,
    launchReadout:
      "Launch gives Dae a bridge from wash-day haircare into daily refresh behavior."
  }
];

export const pricingSignals: PricingSignal[] = [
  {
    id: "ps-001",
    competitor: "Slip",
    productLine: "Silk scrunchie bundles",
    currentPrice: 39,
    previousPrice: 49,
    promotion: "Memorial week bundle event",
    discountPercent: 20,
    changedAt: "2026-05-24",
    implication:
      "Premium silk brands are defending bundle conversion with discounting while preserving single-item price integrity."
  },
  {
    id: "ps-002",
    competitor: "Heatless Hair",
    productLine: "Curling ribbon sets",
    currentPrice: 24,
    previousPrice: 28,
    promotion: "Starter set markdown",
    discountPercent: 14,
    changedAt: "2026-05-22",
    implication:
      "Entry price compression may pressure KITSCH heatless sets in paid social acquisition."
  },
  {
    id: "ps-003",
    competitor: "Crown Affair",
    productLine: "Brush and towel bundles",
    currentPrice: 112,
    previousPrice: 112,
    promotion: "Gift-with-purchase test",
    discountPercent: 0,
    changedAt: "2026-05-19",
    implication:
      "Value is being added through merchandising instead of markdowns, protecting premium perception."
  }
];

export const campaignThemes: CampaignTheme[] = [
  {
    id: "ct-001",
    competitor: "Dae",
    theme: "Scalp-first summer reset",
    channels: ["TikTok", "Instagram Reels", "Pinterest"],
    firstSeen: "2026-05-25",
    evidence:
      "Creative language clusters around sweat, oil, refresh, and clean scent for summer routines.",
    strategicRead:
      "Scalp care is becoming a daily problem-solution message, not only a wash-day treatment."
  },
  {
    id: "ct-002",
    competitor: "Heatless Hair",
    theme: "Packable overnight styling",
    channels: ["TikTok", "Meta Ads", "Website"],
    firstSeen: "2026-05-27",
    evidence:
      "Landing page and short-form ads emphasize suitcase-ready curls without hotel tools.",
    strategicRead:
      "Travel is a credible demand moment for heatless styling, with clear bundle potential."
  },
  {
    id: "ct-003",
    competitor: "Slip",
    theme: "Luxury gifting with tactical discounts",
    channels: ["Meta Ads", "Email", "Instagram"],
    firstSeen: "2026-05-21",
    evidence:
      "Ad copy pairs gift language with limited-time bundle savings.",
    strategicRead:
      "The brand is using sale windows to expand gifting without making discounting the headline."
  }
];

export const intelligenceSignals: IntelligenceSignal[] = [
  {
    id: "sig-001",
    title: "Travel heatless styling is moving from accessory to routine",
    competitor: "Heatless Hair",
    category: "product",
    severity: "critical",
    detectedAt: "2026-05-27",
    summary:
      "A compact curl kit launch and travel-led creative show a coordinated push into summer routines.",
    whyItMatters:
      "KITSCH has permission to own the same occasion across heatless curls, clips, towels, and travel storage.",
    recommendedAction:
      "Package a summer travel routine landing page with heatless styling, satin accessories, and TSA-friendly hair essentials.",
    source: {
      label: "Competitor Shopify storefront",
      type: "shopify"
    }
  },
  {
    id: "sig-002",
    title: "Entry heatless sets are being discounted below $25",
    competitor: "Heatless Hair",
    category: "pricing",
    severity: "high",
    detectedAt: "2026-05-22",
    summary:
      "Starter curl sets dropped from $28 to $24 during a seasonal acquisition push.",
    whyItMatters:
      "Paid social comparisons may become more price-sensitive for first-time heatless shoppers.",
    recommendedAction:
      "Test value messaging around durability, comfort, and complete routine rather than matching the markdown immediately.",
    source: {
      label: "Product detail page price monitor",
      type: "website"
    }
  },
  {
    id: "sig-003",
    title: "Scalp wellness language is entering daily refresh content",
    competitor: "Dae",
    category: "campaign",
    severity: "medium",
    detectedAt: "2026-05-25",
    summary:
      "Dae is tying scalp refresh to summer lifestyle use cases across social and search-oriented content.",
    whyItMatters:
      "The theme may pull consumer attention from styling accessories into prep and refresh rituals.",
    recommendedAction:
      "Add scalp-friendly language to brush, towel, and routine content where claims are supportable.",
    source: {
      label: "Public social posts",
      type: "social"
    }
  }
];

export const recommendations: Recommendation[] = [
  {
    id: "rec-001",
    priority: "critical",
    title: "Own the summer travel hair routine",
    owner: "Executive",
    action:
      "Prioritize a travel routine campaign that connects heatless styling, clips, towels, and beauty organization."
  },
  {
    id: "rec-002",
    priority: "high",
    title: "Defend heatless styling value",
    owner: "Ecommerce",
    action:
      "Run PDP tests comparing complete routine value against lower-priced starter kits."
  },
  {
    id: "rec-003",
    priority: "medium",
    title: "Extend campaign language into scalp-adjacent routines",
    owner: "Marketing",
    action:
      "Audit upcoming creative for credible scalp comfort and refresh hooks."
  }
];

export const weeklyBrief: WeeklyBrief = {
  weekOf: "2026-05-25",
  executiveSummary:
    "Competitors are converging around summer routine behavior: travel-ready heatless styling, scalp refresh, and giftable premium bundles. The highest-signal opportunity for KITSCH is to frame hair accessories as a complete travel routine instead of isolated tools.",
  productLaunches,
  pricingSignals,
  campaignThemes,
  marketTrends: [
    "Travel occasions are creating a credible reason to bundle styling accessories.",
    "Scalp care messaging is shifting from treatment to daily refresh.",
    "Premium brands are protecting price perception by favoring bundles and gifts over direct markdowns."
  ],
  recommendations
};
