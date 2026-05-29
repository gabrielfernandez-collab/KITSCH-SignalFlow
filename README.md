# KITSCH SignalFlow

AI-Powered Competitive Intelligence Engine

A competitive intelligence platform designed to monitor competitor websites, social
media channels, and public advertising libraries to generate actionable weekly
market intelligence for KITSCH leadership.

## Current Application Scope

This repository contains a deployment-ready Next.js dashboard shell with:

- Executive Dashboard
- Competitors
- Product Launch Radar
- Pricing Intelligence
- Campaign Intelligence
- Weekly Brief Generator
- Sample competitor intelligence dataset
- Weekly brief API route at `/api/weekly-brief`

The first implementation uses local sample data in `lib/sample-data.ts` and a
service layer in `lib/intelligence.ts`. The structure is ready for Supabase,
Supabase Auth, and OpenAI-backed generation to replace the local dataset.

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
- `components/ui` contains reusable shadcn-style primitives.
- `lib/types.ts` defines the core intelligence domain model.
- `lib/sample-data.ts` provides traceable sample competitor signals.
- `lib/intelligence.ts` centralizes ranking, weekly brief generation, and summary
  transformations.

## Next Production Steps

- Add Supabase schema and row-level security for competitors, sources, signals,
  briefs, and users.
- Add Supabase Auth and protect the dashboard route group.
- Implement public-source ingestion services that respect source terms.
- Add OpenAI report generation with source citations and hallucination guards.
- Add export support for PDF, Google Docs, or email delivery.
