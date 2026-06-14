---
name: "Real-Time Sign Language Recognition"
client: "Academic group project · BUas"
clientType: "Computer Vision / MLOps"
context: "Academic"
impact: "Built a real-time Dutch Sign Language (NGT) recognition system — from a MediaPipe + EfficientNet-B0 model to a fully deployed, authenticated inference API — wrapped in a production MLOps stack with an automated Azure ML training pipeline, a versioned model registry, CI/CD and multi-target Docker deployment."
mlops: "An end-to-end production pipeline: Azure ML training with accuracy/F1 quality gates, automatic model versioning in a registry the API pulls from on startup, GitHub Actions CI/CD, multi-target Docker deploys (Azure + on-prem via Portainer GitOps), and an enforced 90% test-coverage bar."
mlopsLabel: "MLOps"
stack: ["PyTorch", "EfficientNet-B0", "MediaPipe", "FastAPI", "Azure ML", "MLflow", "Docker", "PostgreSQL", "GitHub Actions"]
domain: ["Vision", "MLOps"]
year: "2026"
featured: true
order: 1
repo: "https://github.com/BredaUniversityADSAI/2025-26d-fai2-adsai-group-researchgroup2"
---

## Context

A BUas group project (Block D) to recognise Dutch Sign Language (NGT) gestures in real time —
but the real focus, and what sets this project apart, is everything *around* the model: taking
it from a notebook to a deployed, monitored, reproducible service the way a production ML team
would.

## The system

The model itself reads a hand image through **MediaPipe** hand-landmark detection and an
**EfficientNet-B0** classifier, served behind a **FastAPI** inference API that supports both
HTTP and WebSocket (for live, frame-by-frame prediction). Authentication is JWT-based with
tiered access — anonymous users still get full prediction functionality, while authenticated
calls are attributed for future progress tracking — backed by an async PostgreSQL store with
Alembic-managed schema.

## MLOps pipeline

This is the heart of the project:

- **Training on Azure ML** — a two-step pipeline (stratified split + offline augmentation, then
  fine-tuning) that **gates on quality**: a model is only registered if it clears accuracy ≥
  0.85 and F1 ≥ 0.80.
- **Model registry** — passing models are versioned automatically as `ngt-sign-language`; the
  inference API can pull the latest registered model on startup and cache it locally, so
  promoting a new model needs no code change.
- **Experiment tracking** — MLflow logging and autologging across training runs.
- **CI/CD** — GitHub Actions for code-quality checks, Docker build-and-push, and on-prem
  deployment via a Portainer GitOps workflow.
- **Multi-target deployment** — separate Docker Compose targets for Azure and on-prem,
  with CPU-only inference images by default.
- **Quality bar** — Black, Flake8, MyPy and a required **90% test coverage** enforced in CI,
  plus Sphinx API documentation.

## What I took from it

This project is my clearest demonstration of MLOps end to end — not just training a model, but
building the pipeline, gates, registry and deployment path that decide whether a model can be
trusted in production and shipped safely. It's the difference between a model that works once
in a notebook and one a team can retrain, evaluate and redeploy with confidence.
