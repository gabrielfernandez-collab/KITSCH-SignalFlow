import type { NormalizedSignal, RawCollectedSignal } from "@/lib/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
}

export function normalizeSignal(signal: RawCollectedSignal): NormalizedSignal {
  const collectedDate = signal.collectedAt.split("T")[0] ?? signal.collectedAt;
  const id = [
    slugify(signal.competitor),
    signal.sourceType.toLowerCase().replace(/\s+/g, "-"),
    signal.signalType,
    collectedDate,
    slugify(signal.title)
  ].join("-");

  return {
    id,
    competitor: signal.competitor.trim(),
    sourceType: signal.sourceType,
    signalType: signal.signalType,
    title: signal.title.trim(),
    summary: signal.summary.trim(),
    evidence: signal.evidence.trim(),
    sourceUrl: signal.sourceUrl,
    collectedAt: signal.collectedAt
  };
}

export function normalizeSignals(signals: RawCollectedSignal[]) {
  const unique = new Map<string, NormalizedSignal>();

  for (const signal of signals) {
    const normalized = normalizeSignal(signal);
    unique.set(normalized.id, normalized);
  }

  return Array.from(unique.values());
}
