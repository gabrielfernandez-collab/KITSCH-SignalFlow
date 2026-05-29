import {
  campaignThemes,
  competitors,
  intelligenceSignals,
  pricingSignals,
  productLaunches,
  recommendations,
  weeklyBrief
} from "@/lib/sample-data";
import type { SignalSeverity, WeeklyBrief } from "@/lib/types";

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

export function getExecutiveMetrics(): ExecutiveMetric[] {
  const criticalSignals = intelligenceSignals.filter(
    (signal) => signal.severity === "critical"
  ).length;
  const launchCount = productLaunches.length;
  const pricingMoves = pricingSignals.filter(
    (signal) => signal.discountPercent > 0
  ).length;
  const campaignCount = campaignThemes.length;

  return [
    {
      label: "High-signal changes",
      value: intelligenceSignals.length,
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

export function getPrioritizedSignals() {
  return [...intelligenceSignals].sort(
    (a, b) => severityRank[b.severity] - severityRank[a.severity]
  );
}

export function getCompetitorSummary() {
  return competitors.map((competitor) => ({
    ...competitor,
    activeSignals: intelligenceSignals.filter(
      (signal) => signal.competitor === competitor.name
    ).length
  }));
}

export function generateWeeklyBrief(): WeeklyBrief {
  return {
    ...weeklyBrief,
    recommendations: [...recommendations].sort(
      (a, b) => severityRank[b.priority] - severityRank[a.priority]
    )
  };
}
