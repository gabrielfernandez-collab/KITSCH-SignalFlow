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
- Public-source collection endpoint with seeded fallback snapshots
- Scored signal model with relevance, impact, confidence, and urgency
- Filterable dashboard-ready weekly brief module
- Copy-ready executive report output
- Sample competitor intelligence dataset

The MVP uses local sample data in `lib/sample-data.ts` and source configuration
in `lib/source-registry.ts`. The collection service can return seeded public
snapshots by default, or attempt live public URL fetches when
`SIGNALFLOW_LIVE_FETCH=true` is set.

## Data Sources Used

Configured public source examples:

- Heatless Hair storefront and TikTok profile
- Dae website and Instagram profile
- Crown Affair website
- Slip storefront and Meta Ad Library entry point

No credentials, private APIs, private data, or restricted sources are used.

## API Routes

- `GET /api/weekly-brief` returns the structured weekly brief.
- `GET /api/source-registry` returns configured competitors and public sources.
- `GET /api/collect` returns source snapshots. By default it uses seeded public
  snapshots for a reliable demo; set `SIGNALFLOW_LIVE_FETCH=true` to attempt
  public URL fetches.

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
- `lib/types.ts` defines the core intelligence domain model.
- `lib/sample-data.ts` provides traceable sample competitor signals.
- `lib/source-registry.ts` defines competitors and public source URLs.
- `lib/collector.ts` handles public snapshot collection with seeded fallback.
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
