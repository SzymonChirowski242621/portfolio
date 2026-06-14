---
name: "4-Channel RT-DETR for Overlapping Roots"
client: "NPEC — research (in progress)"
clientType: "Research / Computer Vision"
clientUrl: "https://www.npec.nl/"
context: "Publication"
status: "Research in progress"
impact: "Ongoing research tackling a known blind spot in high-throughput phenotyping: current frameworks discard any image with touching or overlapping plants. I'm testing whether encoding root-intersection points as a spatial topological prior in a 4-channel RT-DETR can recover that lost data."
mlops: "Research in progress — preliminary EDA, gap analysis against current state-of-the-art frameworks, and a defined research question driving controlled experiments."
mlopsLabel: "Research"
stack: ["PyTorch", "RT-DETR", "SegFormer", "OpenCV"]
domain: ["Vision", "Research"]
year: "2026"
featured: false
order: 7
---

## Context

This is the next phase of my [root phenotyping work](/projects/root-phenotyping/) for NPEC, and
it is **actively in progress**. The earlier system assumed roots don't overlap — a fair
assumption early in an experiment, but one that breaks down fast.

## The gap

State-of-the-art phenotyping frameworks are excellent at automating analysis, but in
high-throughput mode they discard *every* image containing at least one touching or
overlapping plant. For *Arabidopsis thaliana*, plants begin overlapping around day 30 — and
experiments often run 50–60 days — so a large, valuable slice of the data is simply thrown
away.

The core difficulty is optical: at a root-crossing point, the RGB values and root widths are
almost identical to ordinary, un-entangled root, so a standard detector has nothing obvious to
separate one plant from another.

## Research question

*How does integrating a spatial topological layer — encoding root-intersection points as
geometric priors — affect the mean Average Precision (mAP) of an RT-DETR model when identifying
individual plants in high-density Petri dishes with moderate-to-heavy root crossing?*

## Status

Currently in the research phase: preliminary exploratory analysis is done, the gap is
characterised against existing frameworks, and the experimental design around the 4-channel
RT-DETR approach is underway. Results and a write-up will follow — this card will be updated as
the work progresses.