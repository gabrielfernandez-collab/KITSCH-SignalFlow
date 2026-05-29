import { collectPublicSignals } from "@/lib/collector";
import {
  getExecutiveMetrics,
  getLeadershipActions,
  getTopSignals
} from "@/lib/intelligence";
import {
  campaignThemes,
  pricingSignals,
  productLaunches,
  recommendations,
  weeklyBrief
} from "@/lib/sample-data";
import { sourceRegistry } from "@/lib/source-registry";
import { ExecutiveWorkspace } from "@/components/dashboard/executive-workspace";
import { collectPublicSnapshots } from "@/lib/collector";

export default async function ExecutiveDashboardPage() {
  const metrics = getExecutiveMetrics();
  const signals = getTopSignals();
  const leadershipActions = getLeadershipActions();
  const collection = await collectPublicSignals({
    liveFetch: process.env.SIGNALFLOW_LIVE_FETCH === "true"
  });
  const snapshots = await collectPublicSnapshots({
    liveFetch: process.env.SIGNALFLOW_LIVE_FETCH === "true"
  });

  return (
    <ExecutiveWorkspace
      metrics={metrics}
      signals={signals}
      leadershipActions={leadershipActions}
      collection={collection}
      weeklyBrief={weeklyBrief}
      productLaunches={productLaunches}
      campaignThemes={campaignThemes}
      pricingSignals={pricingSignals}
      recommendations={recommendations}
      collectedSignals={collection.signals}
      sourceRegistry={sourceRegistry}
    />
  );
}
