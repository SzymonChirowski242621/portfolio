---
name: "POS Terminal Deployment Analytics"
client: "IKEA Breda"
clientType: "Retail Operations"
context: "Client"
impact: "Turned 1,300+ raw POS-terminal deployment events into a Power BI dashboard that surfaced a 92% compliance rate, flagged anomalous logging across 67 terminals, and gave store operations a clear month-over-month view of where deployments were slipping."
mlops: "Modelled the full terminal lifecycle in DAX and built automated anomaly flags so operations could spot data-integrity and compliance issues without manual review."
mlopsLabel: "Focus"
stack: ["Power BI", "Power Query", "DAX"]
domain: ["Analytics", "Data Visualization"]
year: "2024"
featured: true
order: 5
clientUrl: "https://www.ikea.com/nl/en/stores/breda/"
presentation: "/files/ikea-powerbi.pdf"
---

## Context

IKEA Breda runs a large network of point-of-sale terminals spread across retail floors,
kiosks and food-service areas. Each terminal moves through a lifecycle of deployment,
re-deployment and management — but that activity lived as raw event logs, with no easy way
to see patterns, catch compliance gaps, or tell whether operations were improving.

I was asked to turn three months of that operational data (June–August 2024) into something
the team could actually act on.

## What I built

A five-page Power BI dashboard covering the full terminal lifecycle:

- **Overview** — headline KPIs across 1,337 deployment events and 67 tracked terminals.
- **Deployment frequency** — monthly trends and per-terminal activity, showing deployments
  settling as the rollout matured.
- **Time-gap analysis** — distribution and trend of intervals between deployments, with
  automatic flags for the negative gaps that signalled back-dated or mis-logged entries.
- **Location performance** — comparison across retail, kiosk and food-service zones, which
  turned out to follow distinctly different operational rhythms.
- **Compliance** — weekly compliance tracking that isolated the specific terminals behind the
  7.85% non-compliance rate.

## Outcome

The dashboard gave operations a single, trustworthy view of terminal management: a **92.15%
compliance rate**, clear evidence that time-gap performance was improving month over month,
and a short, specific list of terminals and locations worth investigating — replacing manual
log-reading with something a manager could open and understand in seconds.

## What I took from it

This was where I learned to translate a messy operational dataset into decisions a
non-technical stakeholder could trust — choosing the few metrics that mattered, and making the
anomalies impossible to miss rather than burying them in a table.