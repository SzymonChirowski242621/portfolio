---
name: "Wall Plug Defect Detection"
client: "Academic project · BUas"
clientType: "Manufacturing QC / Edge AI"
context: "Academic"
impact: "Built a computer-vision defect-detection system for manufacturing quality control that hit 100% test accuracy across four wall-plug types — matching commercial systems costing $15,000+ while running on a Raspberry Pi at roughly 10% of the cost."
mlops: "Iterated from a baseline network to transfer-learning models against a human-level benchmark, and built Grad-CAM explainability plus a desktop app with confidence scores and decision logs for production auditability."
mlopsLabel: "Focus"
stack: ["TensorFlow", "Keras", "MobileNetV2", "EfficientNetB0", "Grad-CAM", "OpenCV", "Streamlit"]
domain: ["Vision"]
year: "2025"
featured: false
order: 6
presentation: "/files/wall-plugs-final-presentation.pdf"
repo: "https://github.com/BredaUniversityADSAI/2024-25c-fai1-adsai-SzymonChirowski242621/blob/main/Deliverables/deep_learning/Deep-Learning-Szymon_Chirowski_242621.ipynb"
---

## Context

Manual visual inspection on a production line is slow, monotonous and error-prone — fatigue
alone lets defects through, driving waste and rework. As an academic project at BUas, I set out
to reconstruct industrial-grade defect detection cheaply enough to be realistic for small and
medium manufacturers, and transparent enough to trust on a factory floor.

## Approach

I worked against a human-level accuracy benchmark of 95% and improved the model in stages:

- **Baseline** — a simple feedforward network established the floor at 84% accuracy.
- **Custom CNN** — purpose-built for wall-plug features, reaching 90%.
- **Transfer learning** — data augmentation plus pre-trained MobileNetV2 and EfficientNetB0
  (both edge-friendly) pushed the model to **100% accuracy** on the test set across four plug
  types: frame fixing, insulation anchors, ribbed plugs and toggle anchors.

## Trust & deployment

A black-box pass/fail isn't enough on a production line, so I integrated **Grad-CAM** heatmaps
to show which regions drove each decision, and wrapped everything in a desktop app with
single-image and batch classification, confidence scores and decision logs for audit. User
testing with potential operators then guided the interface refinements.

## Results

- **100%** test accuracy, exceeding the 95% human benchmark.
- Real-time inference on a **Raspberry Pi 4**, at roughly **10% of commercial-system cost**
  (~$1,500 vs $15,000+).

## What I took from it

This project convinced me that explainability isn't a nice-to-have in industrial ML — the
Grad-CAM views were what made the system trustworthy — and that modern architectures can run
genuinely useful vision on low-cost edge hardware.