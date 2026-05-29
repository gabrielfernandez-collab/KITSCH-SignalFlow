# AGENTS.md

# KITSCH SignalFlow

## Weekly Competitive Intelligence Module

### Objective

Build a working module that can be plugged into an existing dashboard to generate weekly competitive intelligence for KITSCH.

The module should monitor public market signals across hair accessories, on-brand consumables, and adjacent products in the KITSCH competitive landscape.

This is not a prompt library, mockup, or template exercise. It must be a working software module.

---

# Assessment Requirements

The module must:

1. Pull only public data from:

   * Competitor websites
   * Public social channels
   * Public ad libraries

2. Produce a structured weekly brief covering:

   * Competitor launches
   * Pricing moves
   * Campaign angles

3. Demonstrate:

   * Research depth
   * Judgment calls
   * Clear output structure
   * Ability to separate signal from noise

4. Be useful in week one:

   * The module should generate an output KITSCH could review immediately.
   * Avoid over-engineering.
   * Prioritize a clean, working, useful system.

---

# Evaluation Criteria

The build will be evaluated on:

* How the candidate thinks through real problems
* Taste in what matters and what to ignore
* How the output is structured so KITSCH can act on it
* Quality of code and build
* Practical usefulness over polished templates
* Communication and check-ins during the 5-day window

---

# Deliverables

The final submission must include:

1. Working module committed to an accessible GitHub repository

2. Sample weekly competitive intelligence brief

3. Brief README explaining:

   * What the module does
   * How to run it
   * Data sources used
   * Architecture overview
   * Known limitations
   * Suggested next iterations

---

# Product Definition

KITSCH SignalFlow is a weekly competitive intelligence module that collects public market signals, analyzes them, and produces an executive-ready brief.

The module should help KITSCH answer:

* What did competitors launch this week?
* What pricing or promotional moves occurred?
* What campaign angles are competitors using?
* What matters?
* What can be ignored?
* What should KITSCH consider doing next?

---

# Core Product Flow

1. Collect public competitor data

2. Normalize the data into structured records

3. Analyze the records for meaningful changes

4. Generate an executive weekly brief

5. Display the brief in a dashboard-ready format

---

# Recommended MVP Scope

Build only what is necessary to satisfy the assessment.

## MVP Features

### 1. Competitor Source Registry

Create a configurable list of competitors and public sources.

Each competitor should include:

* Competitor name
* Website URL
* Product/category focus
* Social source URL if available
* Ad library URL if available
* Notes on why this competitor matters

---

### 2. Public Data Pull

Implement a working data pull from public sources.

For the MVP, prioritize reliability over breadth.

Recommended approach:

* Pull product/page data from selected competitor websites
* Use public URLs
* Store collected snapshots locally or in a simple database
* Include seeded/sample data if live source access is limited

Do not use private data, credentials, or restricted APIs.

---

### 3. Competitive Signal Model

Normalize findings into a consistent structure.

Each signal should include:

* Competitor
* Signal type
* Source URL
* Date collected
* Summary
* Evidence
* Strategic relevance
* Confidence level
* Recommended action

Signal types:

* Product launch
* Pricing move
* Promotion
* Campaign angle
* Category trend
* Messaging shift

---

### 4. Judgment Layer

Every signal should be scored.

Use a simple scoring model:

* Relevance to KITSCH: 1-5
* Potential business impact: 1-5
* Confidence level: Low / Medium / High
* Urgency: Low / Medium / High

Only high-quality signals should appear in the executive summary.

This demonstrates taste in what matters and what to ignore.

---

### 5. Weekly Brief Generator

Generate a structured weekly brief with the following sections:

1. Executive Summary

2. Top Signals This Week

3. Competitor Launches

4. Pricing Moves

5. Campaign Angles

6. What Matters

7. What to Ignore

8. Recommended Actions

9. Source Log

The brief must be clear, concise, and actionable.

---

### 6. Dashboard-Ready UI

Create a clean dashboard module with:

* Weekly brief view
* Signal cards
* Competitor filter
* Signal type filter
* Relevance/impact indicators
* Source links
* Export or copy-ready report format

The UI should look like a module that could be embedded into an existing internal dashboard.

---

# Recommended Technical Approach

Use a practical stack that can be built within 5 business days.

Recommended stack:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Local JSON or SQLite for MVP storage
* Optional Supabase if time allows
* OpenAI API or mock AI summarization layer if API setup is limited

Prioritize:

* Working flow
* Clean architecture
* Clear README
* Sample output

Do not prioritize:

* Complex authentication
* Large-scale scraping infrastructure
* Overly complex database design
* Perfect automation
* Too many integrations

---

# Suggested Project Structure

```text
kitsch-signalflow/
├── app/
│   ├── page.tsx
│   ├── brief/
│   ├── competitors/
│   └── signals/
├── components/
│   ├── dashboard/
│   ├── brief/
│   └── signals/
├── lib/
│   ├── collectors/
│   ├── analyzers/
│   ├── brief-generator/
│   ├── scoring/
│   └── data/
├── data/
│   ├── competitors.json
│   ├── sample-signals.json
│   └── sample-weekly-brief.json
├── docs/
│   ├── assessment-notes.md
│   ├── data-sources.md
│   └── weekly-brief-sample.md
├── README.md
└── AGENTS.md
```

---

# Data Collection Guidance

Because this is a timeboxed assessment, build the module so it can support live public collection but also works with seeded sample data.

Acceptable MVP pattern:

1. Use configured public competitor URLs

2. Fetch available public page content where technically feasible

3. Parse simple signals such as:

   * Product title
   * Price
   * Promo text
   * Page title
   * Meta description
   * Campaign copy

4. Store normalized results

5. Generate analysis and brief

6. Include seeded examples to demonstrate the full workflow

Be transparent in the README about what is live, what is sample, and what would be automated in the next iteration.

---

# Competitor Examples

Use competitors relevant to KITSCH’s landscape, such as:

* Hair accessories brands
* Heatless styling brands
* Beauty consumables brands
* Wellness/personal care brands
* Beauty lifestyle brands

Do not hardcode conclusions without evidence.

Every finding should include a source URL or sample evidence.

---

# Output Quality Standard

The weekly brief should read like something a COO or merchandising leader can use immediately.

Avoid vague observations.

Weak output:

“Competitor A posted on Instagram.”

Strong output:

“Competitor A is emphasizing heatless styling as a damage-prevention solution, suggesting continued consumer demand for low-heat hair routines. KITSCH should monitor whether this messaging overlaps with its own heatless curl positioning.”

---

# README Requirements

The README must include:

1. Project name and short description

2. What problem it solves

3. Features

4. Tech stack

5. How to run locally

6. How to generate the sample weekly brief

7. Data source approach

8. Architecture

9. Tradeoffs made due to the 5-day timebox

10. Suggested next steps

---

# Communication Expectations

During the build, maintain clear documentation of decisions.

Include a short section in the README or docs explaining:

* What was prioritized
* What was intentionally ignored
* What assumptions were made
* What would be improved with more time

This directly addresses the evaluation criteria around judgment, communication, and problem-solving.

---

# Definition of Done

The project is complete when:

* The app runs locally
* The dashboard displays competitive signals
* The module generates or displays a weekly brief
* Signals include evidence and source references
* The repo includes a clear README
* A sample weekly brief is included
* The implementation is clean enough to iterate on
* The project demonstrates practical judgment, not over-engineering
