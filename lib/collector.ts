import { sourceSnapshots } from "@/lib/sample-data";
import { sourceRegistry } from "@/lib/source-registry";
import { collectAdLibrarySignals } from "@/lib/collectors/adLibraryCollector";
import { collectSocialSignals } from "@/lib/collectors/socialCollector";
import { collectWebsiteSignals } from "@/lib/collectors/websiteCollector";
import { enrichScoredSignal, prioritizeExecutiveSignals } from "@/lib/scoring/scoreSignal";
import { normalizeSignals } from "@/lib/signals/normalizeSignal";
import type { PublicCollectionResult, SourceSnapshot } from "@/lib/types";

async function fetchPublicText(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "KITSCH SignalFlow MVP public-source monitor"
      },
      signal: controller.signal
    });

    const html = await response.text();
    const title = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]?.trim() ?? url;
    const extractedText = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 1200);

    return {
      title,
      extractedText,
      status: response.ok ? "fetched" : "failed"
    } as const;
  } catch {
    return {
      title: url,
      extractedText: "",
      status: "failed"
    } as const;
  } finally {
    clearTimeout(timeout);
  }
}

export async function collectPublicSnapshots(options?: {
  liveFetch?: boolean;
}): Promise<SourceSnapshot[]> {
  if (!options?.liveFetch) {
    return sourceSnapshots;
  }

  const collectedAt = new Date().toISOString();
  const snapshots: SourceSnapshot[] = [];

  for (const competitor of sourceRegistry) {
    for (const source of competitor.sources) {
      const result = await fetchPublicText(source.url);

      snapshots.push({
        id: `${source.id}-${Date.now()}`,
        competitor: competitor.competitorName,
        sourceId: source.id,
        sourceUrl: source.url,
        collectedAt,
        status: result.status,
        title: result.title,
        extractedText: result.extractedText,
        notes:
          result.status === "fetched"
            ? "Fetched from a public URL with no credentials or restricted API."
            : "Live fetch failed; keep seeded snapshots enabled for reliable MVP demos."
      });
    }
  }

  return snapshots;
}

export async function collectPublicSignals(options?: {
  liveFetch?: boolean;
}): Promise<PublicCollectionResult> {
  const collectedAt = new Date().toISOString();
  const rawSignals = [
    ...(await collectWebsiteSignals({
      liveFetch: options?.liveFetch,
      collectedAt
    })),
    ...(await collectSocialSignals({ collectedAt })),
    ...(await collectAdLibrarySignals({ collectedAt }))
  ];
  const scoredSignals = normalizeSignals(rawSignals).map(enrichScoredSignal);
  const { prioritySignals, suppressedSignals } =
    prioritizeExecutiveSignals(scoredSignals);
  const sourceCount = sourceRegistry.reduce(
    (total, competitor) => total + competitor.sources.length,
    0
  );
  const collectionLog = rawSignals.map((signal) => {
    const status =
      signal.metadata?.status === "fetched"
        ? "Live"
        : signal.metadata?.status === "failed"
          ? "Failed"
          : "MVP";

    return {
      competitor: signal.competitor,
      sourceType: signal.sourceType,
      sourceUrl: signal.sourceUrl,
      status,
      note:
        status === "Live"
          ? "Fetched public website HTML without credentials."
          : status === "Failed"
            ? "Collection failed gracefully and did not block the dashboard."
            : "MVP connector uses public source metadata or safe simulated extraction."
    } as const;
  });
  const failedSources = collectionLog.filter((entry) => entry.status === "Failed").length;
  const liveSources = collectionLog.filter((entry) => entry.status === "Live").length;
  const mvpSources = collectionLog.filter((entry) => entry.status === "MVP").length;

  return {
    mode: options?.liveFetch ? "live-public-fetch" : "mvp-public-connectors",
    collectedAt,
    summary: {
      liveWebsiteCollectionEnabled: Boolean(options?.liveFetch),
      socialSourceCollectionStatus:
        "MVP public metadata connector: profile URLs and category context only.",
      adLibraryCollectionStatus:
        "MVP public metadata connector: ad library URLs and inferred campaign themes.",
      sourcesProcessed: sourceCount,
      signalsGenerated: scoredSignals.length,
      failedSources,
      mvpSources,
      liveSources
    },
    collectionLog,
    signals: prioritySignals,
    suppressedSignals
  };
}
