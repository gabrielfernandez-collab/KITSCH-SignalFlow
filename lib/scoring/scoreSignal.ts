import type {
  ConfidenceLevel,
  NormalizedSignal,
  QualitativeSignalScore,
  ScoredPublicSignal
} from "@/lib/types";

const highRelevanceTerms = [
  "hair",
  "silk",
  "satin",
  "clip",
  "scrunchie",
  "brush",
  "curl",
  "styling",
  "bundle",
  "accessory"
];

const impactTerms = [
  "new",
  "launch",
  "sale",
  "discount",
  "bundle",
  "collection",
  "limited",
  "routine",
  "campaign"
];

function includesAny(text: string, terms: string[]) {
  const normalized = text.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function signalText(signal: NormalizedSignal) {
  return `${signal.title} ${signal.summary} ${signal.evidence}`;
}

export function scoreSignal(signal: NormalizedSignal): QualitativeSignalScore {
  const text = signalText(signal);
  const relevance: ConfidenceLevel = includesAny(text, highRelevanceTerms)
    ? "High"
    : signal.sourceType === "Ad Library"
      ? "Medium"
      : "Low";
  const impact: ConfidenceLevel = includesAny(text, impactTerms)
    ? "High"
    : signal.signalType === "campaign_angle"
      ? "Medium"
      : "Low";
  const confidence: ConfidenceLevel =
    signal.sourceType === "Website" && signal.evidence.length > 40
      ? "High"
      : signal.sourceUrl.length > 0
        ? "Medium"
        : "Low";
  const urgency: ConfidenceLevel =
    impact === "High" && relevance === "High"
      ? "High"
      : impact === "High" || relevance === "High"
        ? "Medium"
        : "Low";

  return {
    relevance,
    impact,
    confidence,
    urgency
  };
}

export function enrichScoredSignal(signal: NormalizedSignal): ScoredPublicSignal {
  const score = scoreSignal(signal);
  const executivePriority = score.relevance === "High" && score.impact === "High";

  return {
    ...signal,
    score,
    executivePriority,
    whyItMatters: buildWhyItMatters(signal),
    recommendedAction: buildRecommendedAction(signal)
  };
}

function buildWhyItMatters(signal: NormalizedSignal) {
  if (signal.signalType === "pricing_move" || signal.signalType === "promotion") {
    return "Pricing or promotional movement can change consumer value expectations in categories where KITSCH competes.";
  }

  if (signal.signalType === "product_launch") {
    return "A relevant launch may indicate where competitors are investing assortment, positioning, or seasonal demand creation.";
  }

  if (signal.sourceType === "Ad Library" || signal.signalType === "campaign_angle") {
    return "Campaign messaging shows which consumer problems competitors believe are worth paying to amplify.";
  }

  return "The signal is relevant if it points to a repeatable category, merchandising, or messaging shift.";
}

function buildRecommendedAction(signal: NormalizedSignal) {
  if (signal.signalType === "pricing_move" || signal.signalType === "promotion") {
    return "Monitor comparable KITSCH items and test value messaging before reacting with deeper markdowns.";
  }

  if (signal.signalType === "product_launch") {
    return "Review overlap with the KITSCH roadmap and identify whether the launch creates a bundle or positioning opportunity.";
  }

  if (signal.sourceType === "Ad Library" || signal.signalType === "campaign_angle") {
    return "Track whether this message repeats across channels before adapting creative or merchandising priorities.";
  }

  return "Keep monitoring for repeated evidence before escalating to an executive action.";
}

export function prioritizeExecutiveSignals(signals: ScoredPublicSignal[]) {
  return {
    prioritySignals: signals.filter((signal) => signal.executivePriority),
    suppressedSignals: signals.filter((signal) => !signal.executivePriority)
  };
}
