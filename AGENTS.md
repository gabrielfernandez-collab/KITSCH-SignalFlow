# AGENTS.md

# KITSCH SignalFlow

## AI-Powered Competitive Intelligence Engine

### Mission

Build a production-quality competitive intelligence platform capable of monitoring competitor websites, social channels, and public advertising sources to generate actionable weekly intelligence briefs for KITSCH leadership.

This project is being developed as a functional business application, not a design exercise or prototype.

---

# Business Objective

KITSCH needs a system capable of:

* Monitoring competitor activity
* Detecting new product launches
* Tracking pricing changes
* Identifying campaign themes
* Detecting emerging market trends
* Generating executive-level weekly intelligence reports

The output must help leadership make better business decisions.

---

# Product Name

KITSCH SignalFlow

Tagline:

AI-Powered Competitive Intelligence Engine

---

# Core Principles

## Principle 1: Signal Over Noise

Never collect data simply because it exists.

Only surface information that may influence:

* Product strategy
* Marketing strategy
* Pricing strategy
* Competitive positioning

Every feature must increase signal quality.

---

## Principle 2: Actionable Intelligence

Do not display raw data whenever intelligence can be generated.

Always answer:

* Why does this matter?
* What changed?
* What should KITSCH pay attention to?
* What action may be required?

---

## Principle 3: Executive First

The primary audience is:

* COO
* Executive Leadership
* Merchandising Teams
* Marketing Teams

Insights must be understandable in less than 60 seconds.

---

## Principle 4: Production Quality

All code should be:

* Modular
* Typed
* Documented
* Maintainable

Avoid hacks.

Avoid one-off scripts.

Build reusable services.

---

# Technology Stack

Frontend:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

Backend:

* Next.js API Routes

Database:

* Supabase PostgreSQL

Authentication:

* Supabase Auth

AI Layer:

* OpenAI API

Deployment:

* Vercel

Version Control:

* GitHub

---

# Initial Scope

## Dashboard

Create the following pages:

### Executive Dashboard

Displays:

* Weekly summary
* Major launches
* Pricing changes
* Campaign themes
* Recommendations

---

### Competitors

Displays:

* Competitor profiles
* Activity history
* Recent launches

---

### Product Launch Radar

Displays:

* New products detected
* Launch dates
* Categories

---

### Pricing Intelligence

Displays:

* Current pricing
* Historical pricing
* Promotions
* Discounts

---

### Campaign Intelligence

Displays:

* Messaging themes
* Ad concepts
* Social campaigns

---

### Weekly Brief Generator

Generate executive reports automatically.

Output:

* Executive Summary
* Product Launches
* Pricing Intelligence
* Campaign Intelligence
* Market Trends
* Recommendations

---

# Data Sources

Only public sources may be used.

Examples:

* Shopify stores
* Competitor websites
* Instagram
* TikTok
* Facebook Ad Library
* Pinterest
* YouTube

No private data.

No scraping that violates terms of service.

---

# AI Responsibilities

AI should:

* Summarize competitor activity
* Identify trends
* Detect strategic shifts
* Rank importance
* Generate recommendations

AI should not:

* Invent facts
* Hallucinate launches
* Create unsupported conclusions

All insights must be traceable to collected data.

---

# UI Guidelines

Visual Style:

* Modern SaaS
* Premium
* Executive-grade
* Dark mode preferred

Inspiration:

* Linear
* Stripe
* Vercel
* Retool
* Notion

Avoid:

* Clutter
* Excessive charts
* Consumer-app aesthetics

---

# Deliverables

Must produce:

1. Functional dashboard

2. Sample competitor dataset

3. Weekly intelligence report

4. README

5. Deployment-ready application

---

# Success Criteria

The project is successful if a KITSCH executive can open the dashboard on Monday morning and immediately understand:

* What competitors launched
* What competitors changed
* What competitors are promoting
* What trends are emerging
* What actions KITSCH should consider

without performing any manual research.
