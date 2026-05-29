import type {
  CampaignTheme,
  ConfidenceLevel,
  IntelligenceSignal,
  PricingSignal,
  ProductLaunch,
  SignalSeverity
} from "@/lib/types";

export type PriorityLevel = "High" | "Medium" | "Low";

export function getPriorityFromSeverity(severity: SignalSeverity): PriorityLevel {
  if (severity === "critical" || severity === "high") {
    return "High";
  }

  if (severity === "medium") {
    return "Medium";
  }

  return "Low";
}

export function getImpactScore(signal: IntelligenceSignal) {
  return Math.min(
    100,
    Math.round(
      (signal.score.relevanceToKitsch * 0.45 + signal.score.businessImpact * 0.55) *
        20
    )
  );
}

export function getPriorityTone(priority: PriorityLevel) {
  if (priority === "High") {
    return "rose" as const;
  }

  if (priority === "Medium") {
    return "amber" as const;
  }

  return "green" as const;
}

export function launchToFramework(launch: ProductLaunch) {
  return {
    whatHappened: `${launch.competitor} launched ${launch.productName} in ${launch.category} at $${launch.price}.`,
    whyItMatters: launch.launchReadout,
    recommendedAction:
      "Review roadmap overlap, bundle opportunities, and whether KITSCH should adjust seasonal merchandising around this use case.",
    confidence: launch.signalScore >= 85 ? "High" : "Medium",
    priority: launch.signalScore >= 85 ? "High" : "Medium",
    impactScore: launch.signalScore
  } satisfies {
    whatHappened: string;
    whyItMatters: string;
    recommendedAction: string;
    confidence: ConfidenceLevel;
    priority: PriorityLevel;
    impactScore: number;
  };
}

export function pricingToFramework(signal: PricingSignal) {
  const impactScore = Math.min(100, 60 + signal.discountPercent);

  return {
    whatHappened: `${signal.competitor} moved ${signal.productLine} from $${signal.previousPrice} to $${signal.currentPrice} through ${signal.promotion}.`,
    whyItMatters: signal.implication,
    recommendedAction:
      signal.discountPercent > 0
        ? "Monitor equivalent KITSCH PDP conversion and test value framing before matching the markdown."
        : "Track whether added-value mechanics outperform direct discounts in comparable KITSCH bundles.",
    confidence: signal.discountPercent > 0 ? "High" : "Medium",
    priority: signal.discountPercent >= 15 ? "High" : "Medium",
    impactScore
  } satisfies {
    whatHappened: string;
    whyItMatters: string;
    recommendedAction: string;
    confidence: ConfidenceLevel;
    priority: PriorityLevel;
    impactScore: number;
  };
}

export function campaignToFramework(theme: CampaignTheme) {
  return {
    whatHappened: `${theme.competitor} is emphasizing "${theme.theme}" across ${theme.channels.join(", ")}.`,
    whyItMatters: theme.strategicRead,
    recommendedAction:
      "Watch for repeat evidence across paid and owned channels before adjusting KITSCH creative priorities.",
    confidence: theme.channels.length >= 3 ? "High" : "Medium",
    priority: theme.channels.length >= 3 ? "High" : "Medium",
    impactScore: Math.min(100, 55 + theme.channels.length * 10)
  } satisfies {
    whatHappened: string;
    whyItMatters: string;
    recommendedAction: string;
    confidence: ConfidenceLevel;
    priority: PriorityLevel;
    impactScore: number;
  };
}
