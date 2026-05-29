import competitors from "@/data/competitors.json";
import type { PublicCompetitorConfig, RawCollectedSignal } from "@/lib/types";

interface WebsiteExtraction {
  pageTitle: string;
  productTitle: string;
  price: string;
  promotionalCopy: string;
  metaDescription: string;
  status: "fetched" | "simulated";
}

const competitorConfigs = competitors as PublicCompetitorConfig[];

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findFirst(html: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return match[1].replace(/\s+/g, " ").trim();
    }
  }

  return "";
}

function extractWebsiteData(html: string, fallbackTitle: string): WebsiteExtraction {
  const text = stripHtml(html);
  const pageTitle =
    findFirst(html, [/<title[^>]*>(.*?)<\/title>/i]) || fallbackTitle;
  const metaDescription = findFirst(html, [
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["'][^>]*>/i
  ]);
  const productTitle =
    findFirst(html, [/<h1[^>]*>(.*?)<\/h1>/i, /<h2[^>]*>(.*?)<\/h2>/i]) ||
    pageTitle;
  const price = text.match(/\$\s?\d+(?:\.\d{2})?/)?.[0] ?? "";
  const promotionalCopy =
    text.match(
      /(?:sale|bundle|limited|new|collection|gift|free shipping|discount)[^.]{0,120}/i
    )?.[0] ?? "";

  return {
    pageTitle,
    productTitle,
    price,
    promotionalCopy,
    metaDescription,
    status: "fetched"
  };
}

async function fetchWebsite(url: string, competitor: string): Promise<WebsiteExtraction> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "KITSCH SignalFlow public assessment collector"
      },
      signal: controller.signal
    });
    const html = await response.text();

    if (!response.ok || html.length < 80) {
      return simulateWebsiteExtraction(competitor);
    }

    return extractWebsiteData(html, competitor);
  } catch {
    return simulateWebsiteExtraction(competitor);
  } finally {
    clearTimeout(timeout);
  }
}

function simulateWebsiteExtraction(competitor: string): WebsiteExtraction {
  return {
    pageTitle: `${competitor} public storefront`,
    productTitle: `${competitor} hair accessory collection`,
    price: "$24",
    promotionalCopy:
      "Public connector fallback: collection, bundle, and styling routine language should be reviewed for strategic relevance.",
    metaDescription:
      "Simulated MVP extraction used when public pages block or require client-side rendering.",
    status: "simulated"
  };
}

export async function collectWebsiteSignals(options?: {
  liveFetch?: boolean;
  collectedAt?: string;
}): Promise<RawCollectedSignal[]> {
  const collectedAt = options?.collectedAt ?? new Date().toISOString();
  const signals: RawCollectedSignal[] = [];

  for (const competitor of competitorConfigs) {
    const extraction = options?.liveFetch
      ? await fetchWebsite(competitor.website, competitor.name)
      : simulateWebsiteExtraction(competitor.name);

    signals.push({
      competitor: competitor.name,
      sourceType: "Website",
      signalType: extraction.price ? "pricing_move" : "product_launch",
      title: extraction.productTitle || extraction.pageTitle,
      summary: [
        extraction.metaDescription,
        extraction.promotionalCopy,
        extraction.price ? `Observed price marker: ${extraction.price}.` : ""
      ]
        .filter(Boolean)
        .join(" "),
      evidence: [
        `Page title: ${extraction.pageTitle}`,
        extraction.metaDescription ? `Meta: ${extraction.metaDescription}` : "",
        extraction.promotionalCopy ? `Promo: ${extraction.promotionalCopy}` : "",
        extraction.price ? `Price: ${extraction.price}` : "",
        `Collection mode: ${extraction.status}`
      ]
        .filter(Boolean)
        .join(" | "),
      sourceUrl: competitor.website,
      collectedAt,
      metadata: {
        pageTitle: extraction.pageTitle,
        productTitle: extraction.productTitle,
        price: extraction.price,
        promotionalCopy: extraction.promotionalCopy,
        metaDescription: extraction.metaDescription,
        status: extraction.status
      }
    });
  }

  return signals;
}
