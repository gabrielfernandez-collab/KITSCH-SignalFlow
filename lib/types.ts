export type SignalSeverity = "critical" | "high" | "medium" | "low";

export type ConfidenceLevel = "Low" | "Medium" | "High";

export type UrgencyLevel = "Low" | "Medium" | "High";

export type SignalType =
  | "Product launch"
  | "Pricing move"
  | "Promotion"
  | "Campaign angle"
  | "Category trend"
  | "Messaging shift";

export type SourceKind = "website" | "shopify" | "social" | "ad-library";

export interface CompetitorSource {
  id: string;
  label: string;
  kind: SourceKind;
  url: string;
  notes: string;
}

export interface CompetitorSourceRegistryEntry {
  id: string;
  competitorName: string;
  websiteUrl: string;
  productFocus: string;
  socialSourceUrl?: string;
  adLibraryUrl?: string;
  whyItMatters: string;
  sources: CompetitorSource[];
}

export interface SourceSnapshot {
  id: string;
  competitor: string;
  sourceId: string;
  sourceUrl: string;
  collectedAt: string;
  status: "seeded" | "fetched" | "failed";
  title: string;
  extractedText: string;
  notes: string;
}

export interface SignalScore {
  relevanceToKitsch: 1 | 2 | 3 | 4 | 5;
  businessImpact: 1 | 2 | 3 | 4 | 5;
  confidence: ConfidenceLevel;
  urgency: UrgencyLevel;
}

export interface IntelligenceSignal {
  id: string;
  title: string;
  competitor: string;
  signalType: SignalType;
  severity: SignalSeverity;
  detectedAt: string;
  summary: string;
  evidence: string;
  strategicRelevance: string;
  whyItMatters: string;
  recommendedAction: string;
  score: SignalScore;
  includeInExecutiveSummary: boolean;
  source: {
    label: string;
    type: SourceKind;
    url: string;
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

export interface SourceLogEntry {
  competitor: string;
  source: string;
  sourceUrl: string;
  collectedAt: string;
  status: SourceSnapshot["status"];
  signalsFound: number;
}

export interface WeeklyBrief {
  weekOf: string;
  executiveSummary: string;
  topSignals: IntelligenceSignal[];
  productLaunches: ProductLaunch[];
  pricingSignals: PricingSignal[];
  campaignThemes: CampaignTheme[];
  marketTrends: string[];
  whatMatters: string[];
  whatToIgnore: string[];
  recommendations: Recommendation[];
  sourceLog: SourceLogEntry[];
  copyReadyReport: string;
}

export type PublicSourceType = "Website" | "Social" | "Ad Library";

export type PublicSignalType =
  | "product_launch"
  | "pricing_move"
  | "promotion"
  | "campaign_angle"
  | "category_trend"
  | "messaging_shift";

export interface PublicCompetitorConfig {
  name: string;
  website: string;
  instagram: string;
  tiktok: string;
  facebookAds: string;
  category: string;
}

export interface RawCollectedSignal {
  competitor: string;
  sourceType: PublicSourceType;
  signalType: PublicSignalType;
  title: string;
  summary: string;
  evidence: string;
  sourceUrl: string;
  collectedAt: string;
  metadata?: Record<string, string>;
}

export interface NormalizedSignal {
  id: string;
  competitor: string;
  sourceType: PublicSourceType;
  signalType: PublicSignalType;
  title: string;
  summary: string;
  evidence: string;
  sourceUrl: string;
  collectedAt: string;
}

export interface QualitativeSignalScore {
  relevance: ConfidenceLevel;
  impact: ConfidenceLevel;
  confidence: ConfidenceLevel;
  urgency: ConfidenceLevel;
}

export interface ScoredPublicSignal extends NormalizedSignal {
  score: QualitativeSignalScore;
  executivePriority: boolean;
  whyItMatters: string;
  recommendedAction: string;
}

export interface PublicCollectionResult {
  mode: "live-public-fetch" | "mvp-public-connectors";
  collectedAt: string;
  signals: ScoredPublicSignal[];
  suppressedSignals: ScoredPublicSignal[];
}
