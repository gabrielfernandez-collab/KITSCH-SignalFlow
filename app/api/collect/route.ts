import { NextResponse } from "next/server";

import { collectPublicSnapshots } from "@/lib/collector";

export async function GET() {
  const liveFetch = process.env.SIGNALFLOW_LIVE_FETCH === "true";
  const snapshots = await collectPublicSnapshots({ liveFetch });

  return NextResponse.json({
    mode: liveFetch ? "live-public-fetch" : "seeded-public-snapshots",
    snapshots
  });
}
