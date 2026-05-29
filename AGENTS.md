Read AGENTS.md.

Review the Data Collection Status section.

The current layout has severe usability issues:

* Cards are too narrow
* Labels wrap excessively
* Badges overflow card boundaries
* Timestamps overflow
* Information density is poor
* Visual hierarchy is unclear

GOAL

Redesign the Data Collection Status section to look like a premium executive intelligence platform.

Do not change the information being displayed.

Only improve layout, responsiveness, readability, and visual hierarchy.

---

ISSUES TO FIX

Current problems:

* Text wraps into multiple lines unnecessarily
* Cards are not sized appropriately
* Status badges overflow
* Timestamp is unreadable
* Metrics grid is too dense
* Important information is difficult to scan

---

NEW LAYOUT REQUIREMENTS

Top Row:

Display:

Data Collection Status

Run Public Collection button

on a single horizontal row.

The button should align right.

---

Second Row:

Display:

Collection Summary

Example:

Collection Mode
Live Website Collection
Social Sources
Ad Library Sources
Last Collection

Use a responsive 5-column grid on desktop.

Use 2-column grid on tablet.

Use 1-column stack on mobile.

---

Third Row:

Display KPI cards:

Sources Processed
Signals Generated
Failed Sources
MVP Sources

These should look like executive KPI cards.

Large values.

Smaller labels.

No text wrapping.

---

BADGES

Status badges must:

* Fit inside containers
* Never overflow
* Support long labels
* Use consistent sizing

Examples:

MVP Public Connector

Live Enabled

Metadata Connector

Reference Connector

Use pill badges with proper padding.

---

TIMESTAMPS

Convert timestamps to readable format.

Example:

May 29, 2026
3:16 PM

Avoid showing long raw timestamps inside small cards.

---

CARD DESIGN

Use:

* Consistent height
* Better spacing
* Improved padding
* Stronger visual hierarchy

The section should feel similar to:

Stripe Dashboard
Linear
Vercel
Palantir

Avoid:

* Tiny cards
* Compressed layouts
* Excessive wrapping

---

RESPONSIVENESS

Desktop:

Clean horizontal layout.

Tablet:

2-column layout.

Mobile:

Single-column stack.

No clipping.

No overflow.

No overlapping elements.

---

EXECUTIVE EXPERIENCE

A COO should be able to scan this section in less than 5 seconds and understand:

* Is collection running?
* What mode is active?
* How many signals were generated?
* Were there failures?
* When was the last collection?

The section should feel operationally important and visually polished.

SUCCESS CRITERIA

No text overlap.
No badge overflow.
No timestamp clipping.
Readable at all breakpoints.
Looks like a premium intelligence platform.
