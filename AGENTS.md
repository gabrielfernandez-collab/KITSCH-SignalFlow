# KITSCH SignalFlow

## Product Purpose

KITSCH SignalFlow is a weekly competitive intelligence module designed to help KITSCH leadership understand:

- competitor launches
- pricing changes
- campaign angles
- emerging opportunities
- competitive risks

and identify what actions leadership should consider.

The product is intended as an Executive Intelligence Module rather than a traditional dashboard.

## Original Assessment Objective

Build a working module we can plug into our current dashboard — weekly competitive intel on hair accessories, consumables on-brand, and products in our landscape.

## Original Requirements

- Pulls only public data:
  - competitor sites
  - social
  - ad libraries
- Outputs a structured brief on:
  - competitor launches
  - pricing moves
  - campaign angles
- Demonstrates:
  - research depth
  - judgment calls
  - clear output structure
- Useful in week one
- Timebox:
  - 5 business days
  - something real
  - not over-engineered
  - clean and working
  - can be iterated on

## Evaluation Criteria

- How the candidate thinks through real problems
- Taste in what matters and what to ignore
- How output is structured so we can act on it
- Quality of build versus template polish
- Communication

## Deliverables

- Working module
- Sample weekly brief
- README explaining how to run it

## Public Data Rules

Only public data sources.

No private APIs.

No credentials.

No non-public information.

No ToS-risky scraping.

## MVP Collection Strategy

### Website Sources

- Support live public website collection when enabled
- Extract publicly available metadata and page signals
- Use fallback extraction when collection is blocked

### Social Sources

- Implemented as public metadata/source connectors
- Expansion-ready architecture

### Ad Library Sources

- Implemented as public reference connectors
- Expansion-ready architecture

### Seeded Demonstration Signals

- Allowed when clearly labeled
- Never represented as unsupported live intelligence

## Intelligence Framework

Every surfaced signal should answer:

1. What happened?
2. Why it matters?
3. Recommended action
4. Evidence
5. Confidence

## Executive Design Principles

- Executive intelligence
- Decision support
- Evidence traceability
- Strategic signal prioritization
- Clarity over complexity

Avoid:

- Generic dashboards
- Over-engineering
- Unsupported claims

## Workspace Model

Brief

Actions

Signals

Evidence

Collection

## Definition of Done

- Application runs
- Dashboard renders
- Workspace navigation functions
- /assessment exists
- /api/collect functions
- README matches implementation
- Signals include evidence and confidence
- Build passes
- Lint passes
