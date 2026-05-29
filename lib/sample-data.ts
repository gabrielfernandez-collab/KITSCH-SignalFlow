import type {
  CampaignTheme,
  Competitor,
  IntelligenceSignal,
  PricingSignal,
  ProductLaunch,
  Recommendation,
  SourceSnapshot,
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

export const sourceSnapshots: SourceSnapshot[] = [
  {
    id: "snap-001",
    competitor: "Heatless Hair",
    sourceId: "heatless-site",
    sourceUrl: "https://heatlesshair.com",
    collectedAt: "2026-05-27",
    status: "seeded",
    title: "Mini Satin Curl Travel Kit landing page",
    extractedText:
      "Travel kit, overnight curls, suitcase-ready styling, no hot tools, starter markdown language.",
    notes:
      "Seeded public-source snapshot used because live collection may be unavailable in local assessment environments."
  },
  {
    id: "snap-002",
    competitor: "Slip",
    sourceId: "slip-site",
    sourceUrl: "https://www.slip.com",
    collectedAt: "2026-05-24",
    status: "seeded",
    title: "Silk scrunchie bundle promotion",
    extractedText:
      "Memorial week bundle event, gift-ready sets, limited-time savings, silk accessory merchandising.",
    notes: "Seeded snapshot representing observable public promotion and pricing movement."
  },
  {
    id: "snap-003",
    competitor: "Dae",
    sourceId: "dae-instagram",
    sourceUrl: "https://www.instagram.com/daehair",
    collectedAt: "2026-05-25",
    status: "seeded",
    title: "Scalp-first summer reset campaign",
    extractedText:
      "Sweat, oil, refresh, clean scent, scalp reset, summer routine and shine language.",
    notes: "Seeded public social snapshot focused on campaign angle extraction."
  },
  {
    id: "snap-004",
    competitor: "Crown Affair",
    sourceId: "crown-site",
    sourceUrl: "https://www.crownaffair.com",
    collectedAt: "2026-05-23",
    status: "seeded",
    title: "Routine builder merchandising",
    extractedText:
      "Glossing comb, routine builder, brush and towel bundles, gift with purchase test.",
    notes: "Seeded public website snapshot for launch and bundle architecture."
  }
];

export const intelligenceSignals: IntelligenceSignal[] = [
  {
    id: "sig-001",
    title: "Travel heatless styling is moving from accessory to routine",
    competitor: "Heatless Hair",
    signalType: "Product launch",
    severity: "critical",
    detectedAt: "2026-05-27",
    summary:
      "A compact curl kit launch and travel-led creative show a coordinated push into summer routines.",
    evidence:
      "Seeded storefront snapshot references a mini satin travel kit, suitcase-ready curls, and no-hot-tools travel language.",
    strategicRelevance:
      "Creates a defensible KITSCH bundle occasion across heatless styling, clips, towels, and beauty organization.",
    whyItMatters:
      "KITSCH has permission to own the same occasion across heatless curls, clips, towels, and travel storage.",
    recommendedAction:
      "Package a summer travel routine landing page with heatless styling, satin accessories, and TSA-friendly hair essentials.",
    score: {
      relevanceToKitsch: 5,
      businessImpact: 5,
      confidence: "High",
      urgency: "High"
    },
    includeInExecutiveSummary: true,
    source: {
      label: "Competitor Shopify storefront",
      type: "shopify",
      url: "https://heatlesshair.com"
    }
  },
  {
    id: "sig-002",
    title: "Entry heatless sets are being discounted below $25",
    competitor: "Heatless Hair",
    signalType: "Pricing move",
    severity: "high",
    detectedAt: "2026-05-22",
    summary:
      "Starter curl sets dropped from $28 to $24 during a seasonal acquisition push.",
    evidence:
      "Price monitor snapshot captures a starter set markdown from $28 to $24 alongside acquisition-oriented product copy.",
    strategicRelevance:
      "Lower entry pricing can change paid social comparison dynamics for heatless styling shoppers.",
    whyItMatters:
      "Paid social comparisons may become more price-sensitive for first-time heatless shoppers.",
    recommendedAction:
      "Test value messaging around durability, comfort, and complete routine rather than matching the markdown immediately.",
    score: {
      relevanceToKitsch: 5,
      businessImpact: 4,
      confidence: "High",
      urgency: "High"
    },
    includeInExecutiveSummary: true,
    source: {
      label: "Product detail page price monitor",
      type: "website",
      url: "https://heatlesshair.com"
    }
  },
  {
    id: "sig-003",
    title: "Scalp wellness language is entering daily refresh content",
    competitor: "Dae",
    signalType: "Campaign angle",
    severity: "medium",
    detectedAt: "2026-05-25",
    summary:
      "Dae is tying scalp refresh to summer lifestyle use cases across social and search-oriented content.",
    evidence:
      "Public social snapshot clusters around sweat, oil, refresh, clean scent, and summer reset language.",
    strategicRelevance:
      "Shows a messaging bridge from consumables into daily hair routine behavior that can influence accessory content.",
    whyItMatters:
      "The theme may pull consumer attention from styling accessories into prep and refresh rituals.",
    recommendedAction:
      "Add scalp-friendly language to brush, towel, and routine content where claims are supportable.",
    score: {
      relevanceToKitsch: 4,
      businessImpact: 3,
      confidence: "Medium",
      urgency: "Medium"
    },
    includeInExecutiveSummary: true,
    source: {
      label: "Public social posts",
      type: "social",
      url: "https://www.instagram.com/daehair"
    }
  },
  {
    id: "sig-004",
    title: "Routine-builder prompts are increasing premium attachment",
    competitor: "Crown Affair",
    signalType: "Promotion",
    severity: "medium",
    detectedAt: "2026-05-23",
    summary:
      "Crown Affair is using routine-builder prompts and gift-with-purchase mechanics to add value without discounting.",
    evidence:
      "Website snapshot references a glossing comb, brush and towel bundles, and a gift-with-purchase test.",
    strategicRelevance:
      "KITSCH can borrow the routine architecture while staying more accessible on price.",
    whyItMatters:
      "Competitors are increasing perceived value through merchandising rather than direct markdowns.",
    recommendedAction:
      "Test routine-builder modules on PDPs for high-attachment products before adding deeper discounts.",
    score: {
      relevanceToKitsch: 4,
      businessImpact: 4,
      confidence: "Medium",
      urgency: "Medium"
    },
    includeInExecutiveSummary: false,
    source: {
      label: "Brand website",
      type: "website",
      url: "https://www.crownaffair.com"
    }
  },
  {
    id: "sig-005",
    title: "Luxury gifting language is not the main signal",
    competitor: "Slip",
    signalType: "Campaign angle",
    severity: "low",
    detectedAt: "2026-05-21",
    summary:
      "Slip is leaning into gift-ready copy, but the actionable signal is bundle economics rather than the creative theme itself.",
    evidence:
      "Ad and storefront snapshots pair gift language with limited-time bundle savings.",
    strategicRelevance:
      "KITSCH should watch price architecture more than luxury gifting language in this case.",
    whyItMatters:
      "Not every visible campaign theme deserves executive attention if it does not change KITSCH's likely actions.",
    recommendedAction:
      "Track discount depth and bundle composition; deprioritize mimicking the luxury gifting creative angle.",
    score: {
      relevanceToKitsch: 2,
      businessImpact: 2,
      confidence: "Medium",
      urgency: "Low"
    },
    includeInExecutiveSummary: false,
    source: {
      label: "Meta Ad Library",
      type: "ad-library",
      url: "https://www.facebook.com/ads/library/"
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
  topSignals: intelligenceSignals.filter((signal) => signal.includeInExecutiveSummary),
  productLaunches,
  pricingSignals,
  campaignThemes,
  marketTrends: [
    "Travel occasions are creating a credible reason to bundle styling accessories.",
    "Scalp care messaging is shifting from treatment to daily refresh.",
    "Premium brands are protecting price perception by favoring bundles and gifts over direct markdowns."
  ],
  whatMatters: [
    "Travel is the most actionable occasion this week because it connects product, pricing, and campaign execution.",
    "Heatless styling entry prices are compressing, so KITSCH should defend value before reacting with markdowns.",
    "Routine builders and bundles are increasingly important conversion mechanics."
  ],
  whatToIgnore: [
    "Do not overreact to every gift-message creative variation without a pricing or assortment change behind it.",
    "Do not treat social buzz around scalp care as a standalone product mandate until repeated launch or pricing evidence appears."
  ],
  recommendations
    ,
  sourceLog: [],
  copyReadyReport: ""
};
