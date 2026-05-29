# KITSCH SignalFlow

## Product Purpose

KITSCH SignalFlow is a working weekly competitive intelligence module designed to help KITSCH leadership understand what competitors are launching, how pricing is moving, what campaign angles are emerging, and what actions leadership should consider.

It is designed as an executive intelligence module, not a generic dashboard.

## Original Assessment Objective

Build a working module that can be plugged into KITSCH's current dashboard to provide weekly competitive intelligence on hair accessories, on-brand consumables, and products in the competitive landscape.

## Original Requirements

- Pull only public data from competitor sites, social sources, and ad libraries
- Output a structured brief on competitor launches, pricing moves, and campaign angles
- Demonstrate research depth, judgment calls, and clear output structure
- Be useful in week one
- Stay within a 5-business-day scope
- Build something real without over-engineering
- Deliver a clean working module that can be iterated on

## Evaluation Criteria

- How the candidate thinks through real problems
- Taste in what matters and what to ignore
- How output is structured so leadership can act on it
- Quality of code/build versus template polish
- Communication and check-ins during the assessment window

## Deliverables

- Working module committed to an accessible repository
- Sample weekly brief output
- Brief README explaining how to run it

## Public Data Rules

Only public data sources may be used.

Allowed sources:

- Competitor websites
- Public social profile/source metadata
- Public ad library references

Do not use:

- Private APIs
- Paid data
- Credentials
- Non-public sources
- ToS-risky or brittle scraping patterns

## MVP Data Collection Strategy

Website sources:

- Support live public website fetching when enabled
- Extract available public HTML metadata, page titles, descriptions, prices, promo text, and other visible public signals when technically feasible
- Use fallback extraction or seeded demonstration signals when live collection is blocked

Social sources:

- Implemented as MVP public metadata/source connectors
- Designed for expansion into deeper public extraction if appropriate later

Ad library sources:

- Implemented as public reference connectors
- Designed to demonstrate source registration, traceability, and future expansion

Seeded/fallback data:

- May be used to demonstrate the full workflow when live sources are unavailable
- Must be clearly labeled and never presented as unsupported live intelligence

## Intelligence Framework

Every surfaced signal should answer:

1. What happened?
2. Why it matters?
3. What action should KITSCH consider?
4. What evidence supports the conclusion?
5. How confident is the system?

## Executive Design Principles

The application should feel like:

- Executive intelligence
- Strategic decision support
- Monday leadership briefing
- Evidence-backed competitive analysis

It should not feel like:

- A generic dashboard
- A static report
- A prompt library
- A template-only submission

## Workspace Model

The Executive Dashboard should organize content into focused workspaces:

- Brief
- Actions
- Signals
- Evidence
- Collection

Brief:
Fast leadership summary.

Actions:
Recommended leadership actions and supporting rationale.

Signals:
Detailed competitive intelligence.

Evidence:
Source traceability and confidence.

Collection:
Public collection status and operational transparency.

## Technical Expectations

Prioritize:

- Working application
- Clean architecture
- Clear components
- Transparent README
- Evidence traceability
- Build stability

Avoid:

- Over-engineering
- Unsupported claims
- Broken routes
- Excessive complexity
- Cosmetic polish without business value

## Definition of Done

The project is complete when:

- The app runs locally
- The deployed app renders correctly
- Executive workspace navigation works
- /assessment exists and renders
- /api/collect works
- Public collection behavior is clearly described
- Signals include source, evidence, confidence, priority, and recommended action
- README accurately matches the implementation
- npm run lint passes
- npm run build passes
