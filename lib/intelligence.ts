import {
  campaignThemes,
  competitors,
  intelligenceSignals,
  pricingSignals,
  productLaunches,
  recommendations,
  sourceSnapshots,
  weeklyBrief
} from "@/lib/sample-data";
import type {
  IntelligenceSignal,
  LeadershipAction,
  SignalSeverity,
  SourceLogEntry,
  WeeklyBrief
} from "@/lib/types";

const severityRank: Record<SignalSeverity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1
};

type MetricAccent = "green" | "amber" | "rose" | "cyan";

interface ExecutiveMetric {
  label: string;
  value: number;
  context: string;
  accent: MetricAccent;
}

export function getLeadershipActions(): LeadershipAction[] {
  return [
    {
      id: "leadership-action-1",
      title: "Own travel-oriented hair routines before competitors define the occasion.",
      action:
        "Build a KITSCH travel hair routine offer that connects heatless styling, clips, towels, and beauty organization.",
      confidence: "High",
      supportingSignals: ["Heatless Hair", "Slip"]
    },
    {
      id: "leadership-action-2",
      title: "Defend heatless styling value without immediately matching markdowns.",
      action:
        "Test PDP and paid-social messaging around comfort, durability, and complete routine value.",
      confidence: "High",
      supportingSignals: ["Heatless Hair"]
    },
    {
      id: "leadership-action-3",
      title: "Use routine-building mechanics to raise attachment in premium tools.",
      action:
        "Pilot routine-builder modules and bundle prompts before adding deeper promotional discounts.",
      confidence: "Medium",
      supportingSignals: ["Crown Affair", "Dae"]
    }
  ];
}

export function getExecutiveMetrics(): ExecutiveMetric[] {
  const topSignals = getTopSignals();
  const criticalSignals = topSignals.filter((signal) => signal.severity === "critical")
    .length;
  const launchCount = productLaunches.length;
  const pricingMoves = pricingSignals.filter(
    (signal) => signal.discountPercent > 0
  ).length;
  const campaignCount = campaignThemes.length;

  return [
    {
      label: "High-signal changes",
      value: topSignals.length,
      context: `${criticalSignals} critical signal this week`,
      accent: "green"
    },
    {
      label: "Product launches",
      value: launchCount,
      context: "Travel and scalp care led launches",
      accent: "cyan"
    },
    {
      label: "Pricing moves",
      value: pricingMoves,
      context: "Discount pressure in entry styling",
      accent: "amber"
    },
    {
      label: "Campaign themes",
      value: campaignCount,
      context: "Summer routines are the dominant pattern",
      accent: "rose"
    }
  ];
}

export function getTopSignals() {
  return getPrioritizedSignals().filter((signal) => signal.includeInExecutiveSummary);
}

export function getIgnoredSignals() {
  return getPrioritizedSignals().filter((signal) => !signal.includeInExecutiveSummary);
}

export function getPrioritizedSignals(): IntelligenceSignal[] {
  return [...intelligenceSignals].sort(
    (a, b) =>
      severityRank[b.severity] - severityRank[a.severity] ||
      b.score.relevanceToKitsch +
        b.score.businessImpact -
        (a.score.relevanceToKitsch + a.score.businessImpact)
  );
}

export function getSignalsByFilter(filters: {
  competitor?: string;
  signalType?: string;
}) {
  return getPrioritizedSignals().filter((signal) => {
    const competitorMatch =
      !filters.competitor || filters.competitor === "All"
        ? true
        : signal.competitor === filters.competitor;
    const signalTypeMatch =
      !filters.signalType || filters.signalType === "All"
        ? true
        : signal.signalType === filters.signalType;

    return competitorMatch && signalTypeMatch;
  });
}

export function getCompetitorSummary() {
  return competitors.map((competitor) => ({
    ...competitor,
    activeSignals: intelligenceSignals.filter(
      (signal) => signal.competitor === competitor.name
    ).length
  }));
}

export function getSourceLog(): SourceLogEntry[] {
  return sourceSnapshots.map((snapshot) => ({
    competitor: snapshot.competitor,
    source: snapshot.title,
    sourceUrl: snapshot.sourceUrl,
    collectedAt: snapshot.collectedAt,
    status: snapshot.status,
    signalsFound: intelligenceSignals.filter(
      (signal) =>
        signal.competitor === snapshot.competitor &&
        signal.source.url === snapshot.sourceUrl
    ).length
  }));
}

export function formatBriefForCopy(brief: Omit<WeeklyBrief, "copyReadyReport">) {
  const lines = [
    `KITSCH SignalFlow Weekly Competitive Intelligence Brief`,
    `Week of ${brief.weekOf}`,
    "",
    "Executive Summary",
    brief.executiveSummary,
    "",
    "Top Signals This Week",
    ...brief.topSignals.map(
      (signal, index) =>
        `${index + 1}. ${signal.title}\nWHAT HAPPENED: ${
          signal.summary
        }\nWHY IT MATTERS: ${signal.whyItMatters}\nRECOMMENDED ACTION: ${
          signal.recommendedAction
        }\nCONFIDENCE: ${signal.score.confidence}\nEVIDENCE: ${signal.evidence}\nSOURCE: ${
          signal.source.url
        }`
    ),
    "",
    "Competitor Launches",
    ...brief.productLaunches.map(
      (launch) =>
        `- ${launch.competitor}: ${launch.productName} (${launch.category}) - ${launch.launchReadout}`
    ),
    "",
    "Pricing Moves",
    ...brief.pricingSignals.map(
      (signal) =>
        `- ${signal.competitor}: ${signal.productLine} moved from $${signal.previousPrice} to $${signal.currentPrice}. ${signal.implication}`
    ),
    "",
    "Campaign Angles",
    ...brief.campaignThemes.map(
      (theme) => `- ${theme.competitor}: ${theme.theme}. ${theme.strategicRead}`
    ),
    "",
    "What Matters",
    ...brief.whatMatters.map((item) => `- ${item}`),
    "",
    "What to Ignore",
    ...brief.whatToIgnore.map((item) => `- ${item}`),
    "",
    "Recommended Actions",
    ...brief.recommendations.map(
      (recommendation) =>
        `- [${recommendation.priority}] ${recommendation.title}: ${recommendation.action}`
    ),
    "",
    "Source Log",
    ...brief.sourceLog.map(
      (source) =>
        `- ${source.competitor}: ${source.source} (${source.status}) - ${source.sourceUrl}`
    )
  ];

  return lines.join("\n");
}

export function generateWeeklyBrief(): WeeklyBrief {
  const brief = {
    ...weeklyBrief,
    topSignals: getTopSignals(),
    sourceLog: getSourceLog(),
    recommendations: [...recommendations].sort(
      (a, b) => severityRank[b.priority] - severityRank[a.priority]
    )
  };

  return {
    ...brief,
    copyReadyReport: formatBriefForCopy(brief)
  };
}
