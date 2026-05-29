Read AGENTS.md and review the current implementation of KITSCH SignalFlow.

GOAL

Perform a final assessment-readiness pass.

The objective is not to add more features.

The objective is to strengthen compliance with the assessment requirements and improve credibility for reviewers.

Focus on transparency, usability, and demonstrating a realistic public intelligence workflow.

---

TASK 1

Improve Public Data Collection Transparency

Review the current data collection implementation.

Create a dedicated section in the UI called:

"Data Collection Status"

Display:

* Live Website Collection Enabled/Disabled
* Social Source Collection Status
* Ad Library Collection Status
* Last Collection Timestamp

Explain clearly:

* Which sources are collected live
* Which sources are currently using public metadata
* Which sources are operating in MVP mode

This information should be visible from the dashboard.

The goal is to help reviewers immediately understand the collection strategy.

---

TASK 2

Add Public Collection Execution Workflow

Create a new dashboard action:

"Run Public Collection"

Requirements:

* Trigger the collection pipeline
* Collect data from configured public sources
* Refresh signals
* Regenerate the weekly brief

Provide:

* Progress indicator
* Collection summary
* Number of signals collected
* Sources processed

The user should be able to run a collection cycle directly from the dashboard.

---

TASK 3

Improve Source Traceability

Every signal must include:

* Source Type
* Source URL
* Collection Timestamp

Ensure every card and detail view exposes this information.

Add badges:

Website
Social
Ad Library

The reviewer should always be able to trace a signal back to its origin.

---

TASK 4

Strengthen Weekly Brief Credibility

Review the Weekly Brief Generator.

Every insight must contain:

WHAT HAPPENED

WHY IT MATTERS

RECOMMENDED ACTION

Do not allow unsupported conclusions.

If data is sample or simulated:

Label it clearly.

Examples:

"Sample Signal"

"Seeded Demonstration Data"

"MVP Demonstration"

The goal is to avoid any appearance of fabricated intelligence.

---

TASK 5

Assessment Readiness Panel

Create a dedicated page:

/assessment

Display:

Assessment Compliance Checklist

Show:

✓ Public Data Sources
✓ Competitor Websites
✓ Social Sources
✓ Ad Library Sources
✓ Signal Normalization
✓ Signal Scoring
✓ Weekly Brief Generation
✓ Executive Recommendations
✓ Evidence Traceability
✓ Dashboard Integration
✓ README Documentation

For each item:

Display implementation notes.

This page should help a reviewer verify compliance in less than two minutes.

---

TASK 6

README Improvement

Add a section:

Assessment Requirement Mapping

Create a table:

Requirement
Implementation
Status

Map every requirement from the assessment email.

Example:

Requirement:
Pulls only public data

Implementation:
Website collector, social source connectors, ad library connectors

Status:
Implemented

Repeat for all requirements.

---

TASK 7

Live Collection Verification

Review the current collection pipeline.

Ensure:

* Live website collection can be enabled through configuration
* Errors are handled gracefully
* Failed sources do not break the dashboard
* Collection results are logged

Provide a collection summary after each run.

Example:

Collection Complete

Sources Processed: 12
Signals Generated: 47
Failed Sources: 1

---

TASK 8

Executive Polish

Review the entire application.

Prioritize:

* Clarity
* Credibility
* Traceability
* Actionability

Do not add unnecessary features.

Do not redesign the application.

Do not introduce complexity.

The final result should feel like a practical competitive intelligence module that a COO could evaluate and understand immediately.

SUCCESS CRITERIA

A reviewer should be able to:

1. Open the application
2. Understand where data comes from
3. Run a collection cycle
4. Review collected signals
5. Trace evidence to sources
6. Read the weekly brief
7. Understand why insights matter
8. Verify assessment compliance

All within five minutes.
