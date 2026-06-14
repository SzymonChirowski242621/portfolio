---
name: "Emotion Classification in TV Content"
client: "Content Intelligence Agency"
clientType: "Media / NLP"
context: "Client"
impact: "Built an end-to-end NLP pipeline that turns raw video into timestamped emotion labels across six emotions — a local, transparent alternative to expensive cloud LLM services, with the final Transformer model reaching an F1 of 0.75."
mlops: "Compared transcription engines on Word Error Rate and classical-vs-Transformer models on a common evaluation, then wired explainability (attention visualisation) into the loop to diagnose failure modes."
mlopsLabel: "Focus"
stack: ["PyTorch", "Transformers", "BERT", "RoBERTa", "Whisper", "AssemblyAI", "scikit-learn"]
domain: ["NLP"]
year: "2025"
featured: true
order: 4
clientUrl: "https://www.contentintelligence.nl/"
presentation: "/files/Emotion-in-TV-Shows.pdf"
repo: "https://github.com/BredaUniversityADSAI/fae2-nlpr-group-group-9/tree/main/src/krzycz_trybson"
---

## Context

The Content Intelligence Agency wanted to understand the emotional arc of television content
without leaning on expensive, opaque cloud LLM services. The brief: something local,
affordable and interpretable, with balanced emotional representation and room for cultural
adaptation. I worked on this in a team of three from BUas, owning the modelling and pipeline
engineering.

## Approach

The pipeline processes raw video end to end:

- **Speech-to-text** — Whisper and AssemblyAI were both evaluated on Word Error Rate;
  AssemblyAI won on transcription quality and cost. Transcripts were translated to English and
  cleaned for balanced emotional representation.
- **Modelling** — I benchmarked Logistic Regression, SVMs, Naive Bayes and LSTMs against
  Transformer models (BERT, RoBERTa). The Transformer approach won, reaching **F1 0.75**.
- **Explainability** — attention visualisation showed *how* the model read emotional context,
  exposing weaknesses like lost context and misclassified short sentences that then guided
  improvements.

## Outcome

The finished system takes a video and returns structured output — timestamps, transcribed
text and emotion labels across happiness, sadness, anger, surprise, fear and disgust —
demonstrating that affordable, interpretable emotion analysis is achievable on local
infrastructure rather than paid cloud APIs.

This work later fed into a peer-reviewed publication on the structural limits of text-only
emotion classification.

## What I took from it

Owning the modelling and pipeline across a three-person team taught me to make defensible
model choices on evidence — WER for transcription, a shared evaluation for classifiers — rather
than reaching for the biggest model by default.