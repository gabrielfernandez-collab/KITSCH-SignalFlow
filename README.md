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

- `app/(dashboard)` contains the authenticated dashboard route group.
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
