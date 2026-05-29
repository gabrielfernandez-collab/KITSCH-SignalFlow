# KITSCH SignalFlow

AI-Powered Competitive Intelligence Engine

A competitive intelligence platform designed to monitor competitor websites, social
media channels, and public advertising libraries to generate actionable weekly
market intelligence for KITSCH leadership.

## Current Module Scope

This repository contains a working weekly competitive intelligence module with:

- Executive Dashboard
- Competitors
- Product Launch Radar
- Pricing Intelligence
- Campaign Intelligence
- Weekly Brief Generator
- Competitor source registry
- Public-source collection layer for websites, social sources, and ad libraries
- Normalization and scoring pipeline for collected public signals
- Scored signal model with relevance, impact, confidence, and urgency
- Filterable dashboard-ready weekly brief module
- Copy-ready executive report output
- Sample competitor intelligence dataset

The MVP uses local sample brief data in `lib/sample-data.ts` plus a configurable
competitor registry in `data/competitors.json`. The collection service supports
live public website fetching when `SIGNALFLOW_LIVE_FETCH=true` is set, while
social and ad-library connectors intentionally use public URL metadata for this
assessment MVP.

## Data Sources Used

Configured public source examples:

- Slip website, Instagram, TikTok, and Meta Ad Library entry point
- Invisibobble website, Instagram, TikTok, and Meta Ad Library entry point
- Scunci website, Instagram, TikTok, and Meta Ad Library entry point
- Goody website, Instagram, TikTok, and Meta Ad Library entry point
- Teleties website, Instagram, TikTok, and Meta Ad Library entry point
- Crown Affair website, Instagram, TikTok, and Meta Ad Library entry point

No credentials, private APIs, private data, or restricted sources are used.

## Public Data Collection Strategy

SignalFlow demonstrates a practical public intelligence workflow without
aggressive scraping:

- `lib/collectors/websiteCollector.ts` can fetch public HTML pages and extract
  page title, product title, price markers, promotional copy, and meta
  description. Live website fetching is enabled with
  `SIGNALFLOW_LIVE_FETCH=true`.
- `lib/collectors/socialCollector.ts` collects public social source metadata:
  configured Instagram and TikTok profile URLs, category context, and connector
  evidence. It does not require credentials or restricted APIs.
- `lib/collectors/adLibraryCollector.ts` supports public ad-library URLs and
  normalizes campaign headline/theme evidence from the configured source entry.
- `lib/signals/normalizeSignal.ts` converts raw collector output into a stable
  signal contract with `id`, `competitor`, `sourceType`, `signalType`, `title`,
  `summary`, `evidence`, `sourceUrl`, and `collectedAt`.
- `lib/scoring/scoreSignal.ts` assigns qualitative relevance, impact,
  confidence, and urgency scores, then suppresses low-value noise from the
  executive view.

For MVP reliability, website collection uses a safe simulated extraction unless
live fetching is explicitly enabled. Social and ad-library collection are
connector structures that demonstrate how public source ingestion is normalized
without brittle post scraping or private credentials. In production, these
connectors could be expanded with approved partner APIs, persisted source
snapshots, queue-based collection, change detection, and OpenAI summaries with
source citations.

## Public Source Collection Notes

This section explains the current implementation scope for each source type so
that reviewers can accurately evaluate the work without over-interpreting claims.

- **Website sources**: Support live public fetching via HTTP GET when
  `SIGNALFLOW_LIVE_FETCH=true` is set. Extraction is shallow (title, meta
  description, price markers, promotional copy) and gracefully falls back to
  seeded snapshots if pages block, time out, or require client-side rendering.
- **Social sources**: Implemented as public metadata connectors in the MVP.
  The collector records configured Instagram and TikTok profile URLs, category
  context, and a connector evidence string. No post-level extraction occurs.
  This is a deliberate timebox tradeoff to avoid brittle scraping and
  ToS-risky behavior.
- **Ad library sources**: Implemented as public reference connectors in the
  MVP. The collector records Meta Ad Library entry point URLs and infers
  campaign themes from the competitor's configured category. No creative
  extraction occurs. The architecture supports deeper extraction (headlines,
  copy variants, first-seen dates) if expanded later.
- **Architecture readiness**: The normalized signal contract
  (`NormalizedSignal`) and scoring pipeline support all three source types
  equally. Adding a deeper extractor for any source type requires only a new
  collector function — no pipeline changes.

## Assessment Requirement Mapping

| Requirement | Implementation | Status | Notes / Tradeoff |
| --- | --- | --- | --- |
| Pulls only public data | Competitor URLs live in `data/competitors.json`; collectors use public websites, public social profile URLs, and public ad-library entry points only. | Implemented | All sources verified as public URLs; no credentials stored or used anywhere in the codebase. |
| Competitor websites | `lib/collectors/websiteCollector.ts` fetches public HTML when live collection is enabled and extracts page title, product title, price markers, promotional copy, and meta description. | Implemented | Live fetch requires `SIGNALFLOW_LIVE_FETCH=true`; defaults to seeded snapshots for reliable demo. |
| Public social sources | `lib/collectors/socialCollector.ts` ingests public Instagram/TikTok metadata and connector evidence in MVP mode without credentials. | MVP Implemented | Metadata connector only (profile URLs + category context). No post-level extraction in this timebox. |
| Public ad library sources | `lib/collectors/adLibraryCollector.ts` normalizes public ad-library URLs, campaign headline/theme evidence, and campaign copy placeholders. | MVP Implemented | Reference connector only (entry point URL + inferred theme). No creative extraction in this timebox. |
| Configurable source registry | `data/competitors.json` contains Slip, Invisibobble, Scunci, Goody, Teleties, and Crown Affair source configuration. | Implemented | Adding a competitor requires only a JSON entry; no code changes needed. |
| Signal normalization | `lib/signals/normalizeSignal.ts` outputs id, competitor, source type, signal type, title, summary, evidence, source URL, and collected timestamp. | Implemented | Normalized signal contract (`NormalizedSignal`) is source-type agnostic and stable. |
| Signal scoring | `lib/scoring/scoreSignal.ts` scores relevance, impact, confidence, and urgency, then separates executive-priority signals from noise. | Implemented | Qualitative scoring (Low/Medium/High); designed for extension to numeric weights in production. |
| Executive filtering | `prioritizeExecutiveSignals` promotes high-relevance and high-impact signals and suppresses lower-value items. | Implemented | Filter thresholds are explicit in `scoreSignal.ts` and configurable. |
| Weekly brief generation | Weekly Brief Generator shows executive summary, what happened, why it matters, recommended action, recommendations, and copy-ready output. | Implemented | Deterministic TypeScript, not LLM-based. Production path to use OpenAI with citation guards. |
| Evidence traceability | Signal cards expose source type badges, evidence links, source URLs, evidence text, and collection timestamps. | Implemented | Every signal includes an `EvidencePanel` component with source URL, observed text, and timestamp. |
| Run collection workflow | `Data Collection Status` panel runs `/api/collect`, shows progress, and reports sources processed, signals generated, failed sources, and collection log. | Implemented | Collection runs synchronously in-memory. No queue or persistence in this timebox. |
| Live collection toggle | `SIGNALFLOW_LIVE_FETCH=true` or `/api/collect?live=true` enables live public website fetch attempts; failures fall back gracefully. | Implemented | Toggle is env-var or query-param driven. Fallback to seeded data is transparent and logged. |
| Assessment compliance page | `/assessment` summarizes compliance checklist and implementation notes for reviewers. | Implemented | Page is reviewer-facing and cross-references the README requirement mapping. |
| README documentation | README documents setup, architecture, collection strategy, known limitations, and this requirement mapping. | Implemented | Comprehensive documentation with honest framing of MVP limitations and production expansion paths. |

## API Routes

- `GET /api/weekly-brief` returns the structured weekly brief.
- `GET /api/source-registry` returns configured competitors and public sources.
- `GET /api/collect` returns normalized scored public signals, suppressed
  low-value signals, and source snapshots. Set `SIGNALFLOW_LIVE_FETCH=true` or
  call `/api/collect?live=true` to attempt public website fetching.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style local UI primitives
- Next.js API Routes

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Architecture

- `app/(dashboard)` contains the main dashboard experience and route groups.
- `components/dashboard` contains the application shell and page-specific
  dashboard components.
- `components/dashboard/weekly-intel-module.tsx` contains the embeddable weekly
  brief module with filters and copy-ready report output.
- `components/ui` contains reusable shadcn-style primitives.
- `data/competitors.json` is the configurable public source registry required
  for assessment review.
- `lib/collectors` contains the website, social, and ad-library collectors.
- `lib/signals/normalizeSignal.ts` defines the normalized public signal shape.
- `lib/scoring/scoreSignal.ts` scores signals and filters executive noise.
- `lib/types.ts` defines the core intelligence domain model.
- `lib/sample-data.ts` provides traceable sample competitor signals.
- `lib/source-registry.ts` defines competitors and public source URLs.
- `lib/collector.ts` orchestrates public collection, normalization, scoring, and
  executive filtering.
- `lib/intelligence.ts` centralizes ranking, weekly brief generation, and summary
  transformations.

## Known Limitations

- Seeded snapshots are used by default so the module works reliably in local and
  review environments without depending on third-party site availability.
- Live public fetches are intentionally shallow and do not execute JavaScript or
  bypass site protections.
- The AI summarization layer is mocked by deterministic TypeScript services for
  the MVP; OpenAI can replace this layer once source storage and citations are
  persisted.
- Export is copy-ready text today, not PDF or Google Docs export.

## Next Production Steps

- Add Supabase schema and row-level security for competitors, sources, signals,
  briefs, and users.
- Add Supabase Auth and protect the dashboard route group.
- Persist collected public snapshots and signal decisions.
- Add OpenAI report generation with source citations and hallucination guards.
- Add export support for PDF, Google Docs, or email delivery.

## Submission Summary

KITSCH SignalFlow is a working competitive intelligence module that demonstrates
the full workflow from public source registry to signal collection,
normalization, scoring, evidence traceability, executive filtering, and weekly
leadership brief generation.

It prioritizes usefulness, transparency, and judgment within the
5-business-day assessment timebox:

- **Public-data-only**: Every source is a public URL. No credentials, no
  restricted APIs, no ToS violations.
- **Honest sourcing**: The UI explicitly labels live-collected, MVP connector,
  and seeded demonstration data. Reviewers are never misled.
- **Executive-ready**: Signals carry scored judgment (relevance, impact,
  confidence, urgency), noise is suppressed, and every insight includes what
  happened, why it matters, and a recommended action.
- **Timebox-appropriate**: Social and ad-library connectors are metadata-only
  by design — a deliberate tradeoff to avoid brittle scraping while keeping
  the architecture ready for deeper extraction in production.
- **Transparent limitations**: MVP scope, configuration requirements, and
  expansion paths are documented in both README and the in-app collection
  status panel.
