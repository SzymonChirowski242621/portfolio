---
name: "Automated Root Phenotyping & Inoculation"
client: "Netherlands Plant Eco-phenotyping Centre"
clientType: "Research / Robotics"
context: "Client"
impact: "Built a computer-vision and reinforcement-learning system that segments plant roots and drives a liquid-handling robot to inoculate them — reaching 0.18mm targeting accuracy and cutting time per Petri dish 21×, from ~3.5 minutes to roughly 10 seconds."
mlops: "Tracked every training run in Weights & Biases — loss curves, segmentation metrics and model comparisons — and built a baseline-first pipeline that made each modelling decision reproducible and auditable."
mlopsLabel: "MLOps"
stack: ["PyTorch", "SegFormer", "OpenCV", "Stable-Baselines3", "Gymnasium", "Weights & Biases", "Opentrons"]
domain: ["Vision", "Robotics"]
year: "2026"
featured: true
order: 3
clientUrl: "https://www.npec.nl/"
presentation: "/files/Presentation-Automated_Root_Phenotyping.pdf"
---

## Context

NPEC studies how plant genetics and environment interact, screening for robust,
disease-resistant genotypes using automated growth modules. Those modules generate huge
volumes of imagery — but the downstream analysis was still manual, creating a bottleneck where
valuable genetic data was lost to fatigue, human error and sheer processing speed.

My task, as an end-to-end individual project, was to automate the inoculation step for
*Arabidopsis thaliana* using computer vision, deep-learning segmentation and a simulated
robotic workflow.

## Approach

The system runs as a pipeline from raw image to robot movement:

- **Segmentation** — a SegFormer model classifies each pixel as root, shoot or seed, trained
  on hand-annotated, peer-reviewed labels with clean splits to avoid data leakage.
- **Classical CV front-end** — OpenCV colour-thresholding and contour detection isolate the
  Petri dish and standardise inputs before the model sees them.
- **Robotic control** — a Soft Actor-Critic agent, trained in a custom Gymnasium simulation of
  an Opentrons OT-2 robot, learns to drive the pipette to each target. Pixel coordinates from
  the vision model map to physical robot coordinates for end-to-end validation.

## MLOps & experiment tracking

Every run was logged in Weights & Biases — loss curves, F1 scores and side-by-side model
comparisons — on top of a baseline-first workflow, so each step was measured against the last
and the whole development trail stayed reproducible.

## Results

- Root segmentation **F1 0.81**, shoot segmentation **F1 0.93**.
- RL controller reached **0.18mm** targeting accuracy at ~1.2s per plant, beating a PID
  baseline (0.32mm, ~3s).
- **21× faster** per dish than a skilled scientist, with consistent, scalable throughput.

## What I took from it

This project is the root of my interest in applied computer vision and ML that touches the
physical world — and it taught me how sensitive RL agents are to reward design, and how much
careful annotation and integration logic matter once a model has to drive real hardware.