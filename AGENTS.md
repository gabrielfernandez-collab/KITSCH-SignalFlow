Read AGENTS.md and implement the following enhancement.

GOAL

Upgrade KITSCH SignalFlow so it demonstrates real public data collection from competitor sources rather than relying solely on seeded data.

This is an assessment project.

The objective is not large-scale scraping infrastructure.

The objective is to demonstrate a practical and maintainable approach to collecting public competitive intelligence.

REQUIREMENTS

Create a Public Signal Collection Layer.

The system should support three source categories:

1. Competitor Websites
2. Public Social Sources
3. Public Ad Library Sources

Implement a configurable source registry.

Create:

data/competitors.json

Each competitor should contain:

{
"name": "",
"website": "",
"instagram": "",
"tiktok": "",
"facebookAds": "",
"category": ""
}

INITIAL COMPETITORS

Add several competitors relevant to KITSCH.

Examples:

* Slip
* Invisibobble
* Scunci
* Goody
* Teleties
* Crown Affair

PUBLIC WEBSITE COLLECTION

Implement:

lib/collectors/websiteCollector.ts

Capabilities:

* Fetch public HTML pages
* Extract:

  * Page title
  * Product title
  * Price
  * Promotional copy
  * Meta description

Generate normalized signals.

Signal examples:

{
type: "product_launch",
competitor: "Slip",
title: "...",
sourceUrl: "...",
evidence: "...",
collectedAt: "..."
}

SOCIAL SIGNAL COLLECTION

Implement:

lib/collectors/socialCollector.ts

For MVP:

Collect public page information only.

Examples:

* Profile descriptions
* Recent visible post titles if available
* Public metadata

If live collection is unreliable, create a connector structure that demonstrates how public social sources are ingested.

The architecture must support future expansion.

AD LIBRARY COLLECTION

Implement:

lib/collectors/adLibraryCollector.ts

For MVP:

Support public ad library URLs.

Capture:

* Ad source URL
* Campaign headline
* Campaign copy if available
* Campaign theme

Normalize results into signals.

SIGNAL NORMALIZATION

Create:

lib/signals/normalizeSignal.ts

Every signal should contain:

id
competitor
sourceType
signalType
title
summary
evidence
sourceUrl
collectedAt

JUDGMENT LAYER

Create:

lib/scoring/scoreSignal.ts

Score every signal on:

* Relevance
* Impact
* Confidence
* Urgency

Return:

Low
Medium
High

EXECUTIVE FILTER

Create logic that prioritizes:

High relevance
High impact

and suppresses low-value noise.

WEEKLY BRIEF

Update the Weekly Brief Generator.

Each insight must include:

WHAT HAPPENED

WHY IT MATTERS

RECOMMENDED ACTION

Example:

Competitor:
Slip

Signal:
New premium silk styling collection

Why it matters:
Signals continued premium positioning in hair care accessories.

Recommended action:
Monitor overlap with KITSCH premium product roadmap.

UI ENHANCEMENTS

Add:

Source Type badges:

* Website
* Social
* Ad Library

Add:

Evidence links

Add:

Collected timestamp

README UPDATE

Add a section:

Public Data Collection Strategy

Explain:

* What sources are collected live
* What sources are simulated for MVP purposes
* Why this approach was chosen
* How it could be expanded in production

IMPORTANT

Do not build aggressive scraping infrastructure.

Do not require private credentials.

Do not use restricted APIs.

Do not over-engineer.

Focus on demonstrating a realistic public intelligence collection workflow that satisfies the KITSCH assessment requirements.

The final result should clearly show that SignalFlow can collect, normalize, analyze, and report on public competitive signals.
