# KITSCH SignalFlow — Project Constitution

## Original KITSCH Assessment Objective

Build a working competitive intelligence module that monitors competitor websites, social media channels, and public advertising libraries to generate actionable weekly market intelligence for KITSCH leadership.

## Requirements (from Assessment Email)

- Pull only publicly available data
- Monitor competitor websites
- Monitor public social sources
- Monitor public ad library sources
- Configurable competitor/source registry
- Normalized signal model
- Scored signal model (relevance, impact, confidence, urgency)
- Executive filtering (high-relevance / high-impact signals surfaced, low-value suppressed)
- Weekly brief generation with executive summary, what happened, why it matters, recommended action
- Evidence traceability (source links, timestamps, evidence text)
- Configurable collection workflow
- Live collection toggle (enabled by env var or query param)
- Assessment compliance page
- README documentation with requirement mapping

## Evaluation Criteria

- Public-data-only constraint strictly followed
- Signal normalization and scoring correctness
- Executive filtering usefulness (noise suppression)
- Evidence traceability completeness
- Weekly brief quality and actionability
- Code quality and architecture clarity
- README completeness and honesty
- Assessment compliance page accuracy
- No overclaimed functionality

## Deliverables

1. Next.js app with executive dashboard, weekly brief, workspace navigation, and collection workflow
2. Public-source collection layer (website, social, ad-library connectors)
3. Normalization and scoring pipeline
4. Configurable competitor registry (`data/competitors.json`)
5. Sample competitor intelligence dataset with scored signals
6. README with architecture, strategy, requirement mapping, limitations
7. Assessment compliance page at `/assessment`
8. AGENTS.md (this file) as project source of truth

## Product Purpose

KITSCH SignalFlow provides KITSCH leadership with a Monday-morning operating view of competitor moves — product launches, pricing changes, campaign angles, and market trends — distilled from public sources into an executive-ready weekly brief, organized into focused workspaces for rapid consumption.

## Data Source Rules

- All sources must be publicly accessible URLs
- No credentials, API keys, tokens, or private endpoints
- No scraping of login-gated or ToS-restricted content
- Website collection uses public HTTP GET for HTML extraction
- Social sources use public profile URLs and metadata only (no post scraping)
- Ad library sources use public entry points and inferred campaign themes

## Public-Data-Only Constraint

This is the hard constraint of the assessment. The app must function entirely on:
- Public HTML pages
- Public social profile URLs (Instagram, TikTok)
- Public Meta Ad Library URLs
- Metadata derived from those public entry points

No private APIs, no authenticated scraping, no credential-based collection.

## MVP Limitations

- Seeded snapshots are used by default for reliable demo in local/review environments
- Live website collection must be explicitly enabled (`SIGNALFLOW_LIVE_FETCH=true`)
- Social collection is a metadata connector (profile URLs + category context), not post-level extraction
- Ad library collection is a reference connector (entry point URL + inferred theme), not creative extraction
- AI summarization is deterministic TypeScript (not LLM-based) for the MVP
- Report export is copy-to-clipboard text, not PDF or Google Docs
- No persistence layer — everything runs in-memory
- No authentication — dashboard route group is unprotected

## Executive Intelligence Design Principles

1. **Executive-first**: The weekly brief and signal cards prioritize what leadership needs to know, not raw data volume.
2. **Noise suppression**: Low-relevance and low-impact signals are suppressed from the executive view.
3. **Actionable output**: Every signal includes what happened, why it matters, and a recommended action.
4. **Evidence transparency**: All signals link back to source URLs with collection timestamps and observed text.
5. **Scored judgment**: Signals carry relevance, impact, confidence, and urgency scores to support triage.
6. **Honest sourcing**: The UI clearly labels whether data is live-collected, connector-based, or seeded demonstration data.
7. **Workspace organization**: Content is organized into focused workspaces (Brief, Actions, Signals, Evidence, Collection) for rapid executive scanning without infinite scrolling.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with `tailwind-variants`, CSS modules
- **UI Primitives**: Radix UI primitives (`@radix-ui/react-select`, etc.)
- **Icons**: Lucide React
- **State**: React hooks, localStorage for workspace persistence
- **Linting**: ESLint with Next.js + TypeScript config
- **Build**: Next.js standalone output

## Definition of Done

- [x] Public-source registry (`data/competitors.json`) with 6 competitors and 3 source types each
- [x] Website collector with live fetch toggle and safe simulated fallback
- [x] Social collector (MVP metadata connector — Instagram/TikTok profile URLs)
- [x] Ad library collector (MVP reference connector — Meta Ad Library entry points)
- [x] Signal normalization into stable contract (`NormalizedSignal`)
- [x] Signal scoring (relevance, impact, confidence, urgency)
- [x] Executive filtering (`prioritizeExecutiveSignals`)
- [x] Weekly brief generation with executive summary, what matters, what to ignore, recommendations
- [x] Copy-ready report output
- [x] Evidence traceability (badges, links, timestamps, observed text)
- [x] Dashboard with workspace navigation (Brief, Actions, Signals, Evidence, Collection)
- [x] Brief workspace: executive summary, market story, concise leadership attention items
- [x] Actions workspace: detailed leadership recommendations with why-it-matters context
- [x] Signals workspace: searchable signal cards with data-origin badges
- [x] Evidence workspace: collection log, source registry, traceability details
- [x] Collection workspace: mode, live status, source/signal KPIs, log, info box
- [x] Data Collection Status panel with source/signal counts, live/MVP status
- [x] Collection mode clearly shown (live-public-fetch vs mvp-public-connectors)
- [x] Assessment compliance page with requirement, notes, and status mapping
- [x] README with architecture, strategy, limitations, requirement mapping
- [x] Public-data-only constraint satisfied throughout
- [x] No overclaimed functionality
- [x] Build passes (`npm run build`)
- [x] Lint passes (`npm run lint`)

## Design Philosophy

- **Honesty over flash**: Never claim functionality that does not exist. Label sample data. Distinguish live from MVP from seeded.
- **Executives are customers**: Prioritize speed of understanding over data density. A COO should grasp the competitive landscape within 30 seconds.
- **Workspace not waterfall**: Instead of a single long-scroll page, organize into focused workspaces that the executive can switch between.
- **Credibility through transparency**: Show collection mode, source status, failure counts, timestamps. Hide nothing. A reviewer should trust what they see.
- **Expansion-ready architecture**: The normalized signal contract, connector interface, and workspace system are designed to absorb deeper extraction, authentication, and LLM summarization without structural rewrites.
