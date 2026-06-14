---
name: "BUas Study Choice Assistant"
client: "Breda University of Applied Sciences"
clientType: "LLM / RAG · Production System"
context: "Client"
status: "In development — pre-deployment QA complete, awaiting deployment sign-off"
impact: "Designed and built a production RAG chatbot, commissioned by the BUas administration, that answers prospective-student questions on programmes, admissions, fees, housing and visas — reducing student-office load. A formal 26-tester QA round measured an 81.6% functional and 90.0% adversarial pass rate ahead of deployment."
mlops: "A multi-service system with its own data ingestion pipeline (Selenium-based scrapers + PDF ingestion into a Chroma vector store), an LLM-supervisor moderation layer, an async PostgreSQL store with Alembic migrations, a feedback admin panel, and a Dockerised multi-container deployment."
mlopsLabel: "Systems"
stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Anthropic Claude", "PostgreSQL", "Selenium", "Docker", "React"]
domain: ["NLP", "MLOps"]
year: "2026"
featured: true
order: 2
---

## Context

Prospective students ask the BUas student office the same questions over and over —
programme details, application deadlines, tuition, housing, visa procedures. Commissioned by
the university administration, I led development of a chatbot that answers those questions
directly and accurately, so the student office can focus on the cases that genuinely need a
human. It is **currently in development**: a full pre-deployment QA round is complete and the
system is awaiting deployment sign-off.

## The system

It's a retrieval-augmented (RAG) assistant, not a thin wrapper around an LLM:

- **Grounded answers** — a LangChain agent answers from a curated knowledge base (a Chroma
  vector store) rather than from the model's own memory, with the programme database defined as
  the single source of truth so it won't invent programmes that don't exist.
- **Specialised tools** — dedicated handlers for diploma-equivalency lookups, tuition fees,
  campus events and contact/escalation, so structured questions get structured answers.
- **Live data ingestion** — Selenium-based scrapers and a PDF ingestion pipeline keep the
  knowledge base current (programme pages, scholarships, housing manual, visa procedures),
  on a 24-hour refresh cycle.
- **A moderation layer** — an LLM-supervisor and input validator screen messages before and
  after generation.
- **Supporting services** — an async PostgreSQL store with Alembic-managed migrations, a
  feedback admin panel, and the whole thing deployed as Dockerised, multi-container services.

## Built for adversarial robustness

Because it speaks on behalf of the university, the chatbot has to hold its ground. The QA round
specifically tested — and hardened it against — social-pressure erosion (conceding to
persistent pushback), tone manipulation (mirroring a user's slang or persona), and false
authority injection (users claiming to be staff to extract exceptions). It stays in
consistent, professional English, refuses to confirm facts not in its data, and never leaks its
internal tooling.

## Validation

A structured QA round with **26 student testers** produced 452 functional and 447 adversarial
test cases, measuring an **81.6% functional** and **90.0% adversarial** pass rate, with tone and
professionalism the highest-scoring dimension (4.64/5). Every issue surfaced was triaged into a
documented remediation phase before deployment.

## What I took from it

This is my deepest production-systems project: not just prompting an LLM, but building the
retrieval, tooling, data pipeline, moderation and deployment around it — and then validating it
against real users and adversarial testing before it goes anywhere near production. It's also
where I learned how much of a real LLM product is everything *except* the model.