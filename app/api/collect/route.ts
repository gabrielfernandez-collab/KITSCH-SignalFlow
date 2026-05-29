import { NextResponse } from "next/server";

import { collectPublicSignals, collectPublicSnapshots } from "@/lib/collector";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const liveFetch =
    process.env.SIGNALFLOW_LIVE_FETCH === "true" ||
    searchParams.get("live") === "true";
  const [snapshots, collection] = await Promise.all([
    collectPublicSnapshots({ liveFetch }),
    collectPublicSignals({ liveFetch })
  ]);

  return NextResponse.json({
    mode: collection.mode,
    collectedAt: collection.collectedAt,
    summary: collection.summary,
    collectionLog: collection.collectionLog,
    signals: collection.signals,
    suppressedSignals: collection.suppressedSignals,
    snapshots
  });
}
