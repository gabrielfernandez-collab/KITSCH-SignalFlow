Read AGENTS.md and review the current Executive Dashboard implementation.

GOAL

Replace the current long-scroll Executive Dashboard with a premium Executive Intelligence Workspace.

The current dashboard contains excellent content, but too much information is competing for attention on a single page.

Transform the experience into a workspace-driven intelligence platform where executives focus on one context at a time.

This should feel closer to:

* Palantir Foundry
* Bloomberg Terminal
* Stripe Radar
* Linear
* Anduril

and less like a traditional SaaS dashboard.

---

# PRIMARY OBJECTIVE

Create a Workspace Navigation System.

The Executive Dashboard should become an Executive Intelligence Workspace.

Instead of showing every section simultaneously, users should switch between dedicated intelligence workspaces.

---

# WORKSPACE NAVIGATION

Create elevated workspace tabs similar to the attached concept.

The tabs should NOT look like:

* Browser tabs
* Bootstrap tabs
* Generic pill buttons

The tabs SHOULD look like:

* Professional workspace selectors
* Intelligence platform navigation
* Enterprise command-center interfaces

Visual behavior:

Active workspace:

* Elevated
* Higher contrast
* Connected to content panel
* Feels selected

Inactive workspace:

* Lower emphasis
* Clickable
* Clearly secondary

---

# REQUIRED WORKSPACES

## Workspace 1

BRIEF

Purpose:

Executive overview.

Content:

* Monday Leadership Brief
* Leadership Attention Required
* Executive Summary
* This Week's Market Story
* Top Signals Summary

Questions answered:

What changed this week?

Why should leadership care?

What requires immediate attention?

---

## Workspace 2

ACTIONS

Purpose:

Decision support.

Content:

* Recommended Leadership Actions
* Strategic Opportunities
* Competitive Risks
* Supporting Signals
* Confidence Levels

Questions answered:

What should KITSCH consider doing?

What evidence supports the recommendation?

---

## Workspace 3

SIGNALS

Purpose:

Detailed intelligence review.

Content:

* Strategic Signals
* Product Launch Radar
* Pricing Intelligence
* Campaign Intelligence

Each signal must display:

* What Happened
* Why It Matters
* Recommended Action
* Confidence
* Evidence

Questions answered:

What is happening in the market?

Why does it matter?

---

## Workspace 4

EVIDENCE

Purpose:

Traceability and validation.

Content:

* Evidence Feed
* Source URLs
* Collection Timestamps
* Source Types
* Confidence Scores
* Observed Content

Questions answered:

What evidence supports these conclusions?

How trustworthy is the intelligence?

---

## Workspace 5

COLLECTION

Purpose:

Operational transparency.

Content:

* Data Collection Status
* Run Public Collection
* Collection Mode
* Website Collection Status
* Social Source Status
* Ad Library Status
* Sources Processed
* Signals Generated
* Failed Sources
* Last Collection Timestamp

Questions answered:

How is intelligence being collected?

What collection mode is active?

---

# DESIGN SYSTEM

Theme:

Retain premium dark theme.

Enhance:

* Visual hierarchy
* Information density
* Scanability
* Executive readability

---

# WORKSPACE BAR DESIGN

Position:

Directly below page title.

Structure:

┌────────┬────────┬────────┬────────┬────────┐
│ BRIEF  │ACTIONS │SIGNALS │EVIDENCE│COLLECT │
└────────┴────────┴────────┴────────┴────────┘

Behavior:

* Smooth transitions
* Keyboard accessible
* State persistence
* Responsive layout

Desktop:

Full horizontal workspace bar.

Tablet:

Horizontal scrolling workspace bar.

Mobile:

Scrollable workspace selector.

---

# CONTENT TRANSITIONS

Workspace changes should feel intentional.

Use:

* Subtle fade
* Slide
* Motion

Avoid:

* Jarring page reloads
* Full navigation
* Route changes if unnecessary

The workspace should feel like a command center.

---

# EXECUTIVE EXPERIENCE

The application should now behave like an intelligence workstation.

When leadership opens the dashboard:

Default workspace:

BRIEF

They immediately see:

* What changed
* Why it matters
* What needs attention

Then they can drill into:

* Actions
* Signals
* Evidence
* Collection

without scrolling through a massive page.

---

# REMOVE INFORMATION OVERLOAD

The current dashboard is suffering from information competition.

Reduce cognitive load by:

* Showing only one workspace at a time
* Preserving all content
* Improving focus
* Improving readability

Do not remove intelligence.

Reorganize it.

---

# PREMIUM DETAILS

Add:

* Workspace icons
* Active workspace indicator
* Smooth hover states
* Subtle intelligence-platform styling

Consider inspiration from:

* Palantir
* Bloomberg
* Linear
* Vercel
* Stripe Radar

Avoid:

* Generic admin panels
* Bootstrap aesthetics
* Consumer-app styling

---

# TECHNICAL REQUIREMENTS

Create reusable components:

components/dashboard/workspace-tabs.tsx

or equivalent.

Maintain clean architecture.

Use shadcn/ui where appropriate.

Preserve responsiveness.

Run:

npm run lint

npm run build

Fix any issues before completion.

---

# SUCCESS CRITERIA

A COO should be able to:

1. Open SignalFlow
2. Read the Brief workspace
3. Understand what changed
4. Navigate to Actions
5. Review supporting Signals
6. Validate Evidence
7. Review Collection status

without feeling overwhelmed.

The final experience should feel like a world-class Executive Intelligence Platform rather than a dashboard with many sections.
