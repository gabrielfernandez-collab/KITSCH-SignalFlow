export type SignalSeverity = "critical" | "high" | "medium" | "low";

export type SignalCategory =
  | "product"
  | "pricing"
  | "campaign"
  | "market"
  | "operations";

export interface IntelligenceSignal {
  id: string;
  title: string;
  competitor: string;
  category: SignalCategory;
  severity: SignalSeverity;
  detectedAt: string;
  summary: string;
  whyItMatters: string;
  recommendedAction: string;
  source: {
    label: string;
    type: "website" | "shopify" | "social" | "ad-library" | "marketplace";
  };
}

export interface Competitor {
  id: string;
  name: string;
  segment: string;
  positioning: string;
  monitoredSources: string[];
  signalScore: number;
  lastActivityAt: string;
  notableChange: string;
}

export interface ProductLaunch {
  id: string;
  competitor: string;
  productName: string;
  category: string;
  launchDate: string;
  price: number;
  signalScore: number;
  launchReadout: string;
}

export interface PricingSignal {
  id: string;
  competitor: string;
  productLine: string;
  currentPrice: number;
  previousPrice: number;
  promotion: string;
  discountPercent: number;
  changedAt: string;
  implication: string;
}

export interface CampaignTheme {
  id: string;
  competitor: string;
  theme: string;
  channels: string[];
  firstSeen: string;
  evidence: string;
  strategicRead: string;
}

export interface Recommendation {
  id: string;
  priority: SignalSeverity;
  title: string;
  owner: "Executive" | "Marketing" | "Merchandising" | "Ecommerce";
  action: string;
}

export interface WeeklyBrief {
  weekOf: string;
  executiveSummary: string;
  productLaunches: ProductLaunch[];
  pricingSignals: PricingSignal[];
  campaignThemes: CampaignTheme[];
  marketTrends: string[];
  recommendations: Recommendation[];
}
