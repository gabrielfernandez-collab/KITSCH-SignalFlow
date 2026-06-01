# KITSCH SignalFlow

## Product Purpose

KITSCH SignalFlow is a weekly competitive intelligence module designed to help KITSCH leadership understand:

* Competitor launches
* Pricing moves
* Campaign angles
* Emerging opportunities
* Competitive risks
* Recommended actions

The product should behave like an **Executive Intelligence Module**, not a generic dashboard or static report.

---

## Original Assessment Objective

Build a working module that can plug into KITSCH's current dashboard and provide weekly competitive intelligence on:

* Hair accessories
* Consumables that are on-brand for KITSCH
* Products in the broader competitive landscape

The module should be useful in week one and should be clean enough to iterate on.

---

## Original Assessment Requirements

The solution must:

* Pull only public data from:

  * Competitor sites
  * Public social sources
  * Public ad libraries

* Output a structured brief on:

  * Competitor launches
  * Pricing moves
  * Campaign angles

* Demonstrate:

  * Research depth
  * Judgment calls
  * Clear output structure

* Be useful in week one

* Stay within a 5-business-day timebox

* Be a clean, working module that can be iterated on

* Avoid over-engineering

---

## Evaluation Criteria

The project will be evaluated on:

* Taste in what matters and what to ignore
* How output is structured so KITSCH can act on it
* Quality of code and build versus polish of templates
* Communication and check-ins during the 5-day window

---

## Required Deliverables

The final submission must include:

1. A working module committed to an accessible repository

2. A sample weekly brief output

3. A brief README explaining how to run the project

This must be a working module, not just prompts, templates, or static mockups.

---

## Core Product Flow

SignalFlow should support the following workflow:

1. Register public competitor sources

2. Pull or reference public source data

3. Normalize collected signals

4. Analyze signals for relevance and importance

5. Score signals using judgment criteria

6. Generate a structured executive weekly brief

7. Display evidence, confidence, and recommended actions

---

## Public Data Rules

Only public data may be used.

Allowed:

* Public competitor websites
* Public product pages
* Public landing pages
* Public social profile/source references
* Public ad library references
* Publicly visible campaign messaging

Not allowed:

* Private APIs
* Credentials
* Paid/private datasets
* Non-public information
* Scraping approaches that create unnecessary legal, reliability, or terms-of-service risk

---

## MVP Collection Strategy

Because this is a 5-business-day assessment, the product should demonstrate a practical public intelligence workflow without over-engineering.

### Website Sources

Website collection may support:

* Live public website fetching when enabled
* Page title extraction
* Metadata extraction
* Product or promotion text when available
* Fallback extraction if live collection is blocked

### Social Sources

Social sources may be implemented as:

* Public metadata connectors
* Public source references
* Expansion-ready connectors for future deeper public extraction

### Ad Library Sources

Ad library sources may be implemented as:

* Public ad library references
* Campaign source links
* Expansion-ready connectors for future deeper public extraction

### Seeded or Fallback Data

Seeded or fallback demonstration data is acceptable when:

* It is clearly labeled
* It supports the end-to-end workflow
* It is not presented as unsupported live intelligence

Transparency is required.

---

## Intelligence Framework

Every surfaced competitive signal should answer:

1. **What happened?**

2. **Why it matters?**

3. **What action should KITSCH consider?**

4. **What evidence supports this?**

5. **How confident are we?**

A signal should not be displayed only because data exists. It should be surfaced because it may influence product, pricing, marketing, merchandising, or strategic decisions.

---

## Signal Types

Supported signal types include:

* Product launch
* Pricing move
* Promotion
* Campaign angle
* Messaging shift
* Category trend
* Emerging opportunity
* Competitive risk

---

## Signal Quality Standard

Weak signal:

> Competitor posted on Instagram.

Strong signal:

> A competitor is positioning heatless styling around damage prevention and travel convenience, suggesting continued demand for routine-based, low-heat hair solutions.

Strong signals should include:

* Source
* Evidence
* Confidence
* Priority
* Strategic relevance
* Recommended action

---

## Weekly Brief Structure

The weekly brief should include:

1. Executive Summary

2. Leadership Attention Required

3. Market Story / Intelligence Snapshot

4. Competitor Launches

5. Pricing Moves

6. Campaign Angles

7. Emerging Opportunities

8. Competitive Risks

9. Recommended Actions

10. Evidence / Source Log

The brief should be concise, executive-ready, and action-oriented.

---

## Workspace Model

The Executive Dashboard should organize content into focused workspaces:

### Brief

Purpose:

Give leadership the fastest readout of what matters this week.

Should include:

* Executive summary
* Leadership attention required
* Market story
* Top signals summary

### Actions

Purpose:

Help leadership decide what to do next.

Should include:

* Recommended actions
* Why each action matters
* Supporting signals
* Confidence levels

### Signals

Purpose:

Provide detailed competitive intelligence.

Should include:

* Strategic signals
* Product launches
* Pricing intelligence
* Campaign intelligence

### Evidence

Purpose:

Support traceability and credibility.

Should include:

* Source URLs
* Source type
* Collection timestamp
* Observed evidence
* Confidence level

### Collection

Purpose:

Show operational transparency.

Should include:

* Collection mode
* Live website collection status
* Social source connector status
* Ad library reference status
* Sources processed
* Signals generated
* Last collection timestamp

---

## Executive Design Principles

The application should feel like:

* Executive intelligence
* Strategic decision support
* Monday leadership briefing
* Evidence-backed market analysis

It should not feel like:

* A generic dashboard
* A prompt library
* A static report
* A template-only submission
* An overbuilt scraping platform

Prioritize:

* Clarity
* Traceability
* Business judgment
* Executive readability
* Signal over noise
* Usefulness over complexity

---

## Technical Principles

Prioritize:

* Clean architecture
* Maintainable components
* Honest documentation
* Stable routes
* Build reliability
* Simple public-source collection
* Clear separation between live, connector, fallback, and seeded data

Avoid:

* Unsupported claims
* Broken routes
* Dead components
* Hardcoded conclusions without evidence
* Over-engineering
* Features that do not support the assessment

---

## Documentation Requirements

README must clearly explain:

* What the project does
* How to run it
* What data sources are used
* What is live
* What is MVP connector-based
* What is seeded/fallback demonstration data
* What tradeoffs were made due to the timebox
* How the module could be expanded

README must not claim functionality that does not exist.

---

## Assessment Compliance Page

If `/assessment` exists, it should map the original KITSCH requirements to implementation.

It should include:

* Requirement
* Implementation
* Status
* Notes / tradeoffs

Use honest status labels such as:

* Implemented
* MVP Implemented
* Partially Implemented
* Expansion Ready

Do not overclaim.

---

## Definition of Done

The project is complete when:

* The application runs locally
* The deployed app renders correctly
* The Executive Dashboard works
* Workspace navigation works
* `/api/collect` works
* `/assessment` exists if referenced in README
* README matches the actual implementation
* Signals include evidence, confidence, and recommended actions
* Public-data limitations are transparent
* A sample weekly brief exists
* Build passes
* Lint passes
* The repository is accessible to reviewers

---

## Final Submission Standard

A KITSCH reviewer should be able to:

1. Open the app

2. Understand what SignalFlow does

3. Review the executive brief

4. See competitor launches, pricing moves, and campaign angles

5. Understand why each signal matters

6. See recommended actions

7. Trace evidence back to sources

8. Understand collection limitations

9. Read the README and run the app

10. Verify that the submission is a working module, not a prompt/template package

The final product should feel practical, credible, transparent, and useful in week one.
