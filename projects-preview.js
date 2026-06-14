// Projects page preview — mirrors the Astro /projects ProjectFilter island.
// Renders all projects and filters them by domain tag.
const PROJECTS = [
  { slug: "01-fraud-detection", name: "Real-Time Fraud Detection Platform", client: "Veridian Bank", context: "Client",
    impact: "Built a real-time fraud-scoring prototype during my internship — flagging risky transactions in under 100ms and folded into the team's evaluation pipeline.",
    mlops: "Online/offline feature parity, latency budgeting and a drift-monitoring dashboard for the scoring service.",
    stack: ["Python","PyTorch","Kafka","Feast","KServe","Kubernetes","Prometheus"], domain: ["Fraud / Risk","Streaming"], year: "2024" },
  { slug: "02-demand-forecasting", name: "Demand Forecasting Pipeline", client: "Northwind Logistics", context: "Client",
    impact: "Replaced manual notebook forecasts with an automated retraining pipeline that improved backtest accuracy over the existing baseline.",
    mlops: "Scheduled retraining with CI checks, backtesting and an easy rollback to the last good model.",
    stack: ["Python","LightGBM","Airflow","dbt","MLflow","AWS SageMaker"], domain: ["Forecasting","Tabular"], year: "2023" },
  { slug: "03-clinical-nlp", name: "Clinical NLP Triage Assistant", client: "BUAS × Helio Health", context: "Publication",
    impact: "Message-triage classifier reaching 94% accuracy on held-out data — written up as a workshop publication.",
    mlops: "Model registry plus offline/online evaluation, with privacy-aware logging on sensitive text.",
    stack: ["Python","Hugging Face","Transformers","FastAPI","Docker","GCP Vertex AI"], domain: ["NLP","Healthcare"], year: "2023" },
  { slug: "04-reco-engine", name: "Recommendation Engine Revamp", client: "Cartø Retail", context: "Client",
    impact: "Two-tower recommender that beat the existing 'also-bought' baseline on offline recall, in an A/B-ready setup.",
    mlops: "Online/offline feature parity and automated offline evals gating each model version.",
    stack: ["TensorFlow","Vertex AI","BigQuery","Vertex Pipelines","Redis"], domain: ["Recommenders","Retrieval"], year: "2024" },
  { slug: "05-predictive-maintenance", name: "Predictive Maintenance for Wind Turbines", client: "BUAS Capstone × GreenGrid", context: "Academic",
    impact: "Team capstone predicting turbine failures from sensor data — multi-day early warning in evaluation.",
    mlops: "Streaming feature engineering with monitoring of feature freshness and calibration.",
    stack: ["Python","XGBoost","Spark","Delta Lake","Databricks","MLflow"], domain: ["Forecasting","Streaming","IoT"], year: "2023" },
  { slug: "06-churn", name: "Churn Propensity Modelling", client: "Course Project · Lumen dataset", context: "Academic",
    impact: "Course project: a calibrated churn model with a reproducible weekly scoring pipeline and clear intervention thresholds.",
    mlops: "GitHub Actions pipeline that validates data, scores and publishes audiences automatically.",
    stack: ["Python","scikit-learn","Snowflake","dbt","GitHub Actions","Azure ML"], domain: ["Tabular","Marketing"], year: "2022" },
  { slug: "07-document-intelligence", name: "Document Intelligence for Claims", client: "Meridian Insurance", context: "Client",
    impact: "Proof-of-concept OCR + LLM extraction pipeline that automated most of the manual claims data-entry in testing.",
    mlops: "Containerised GPU inference with a regression eval harness on every model change.",
    stack: ["Python","LayoutLMv3","LangChain","Triton","Kubernetes","Redis"], domain: ["NLP","Vision","Document AI"], year: "2024" },
  { slug: "08-dynamic-pricing", name: "Dynamic Pricing Service", client: "Personal Project", context: "Personal",
    impact: "Personal project exploring RL-based dynamic pricing with safety guardrails and a low-latency serving demo.",
    mlops: null, // ← no MLOps callout: demonstrates the optional subcard
    stack: ["Python","Ray","Redis","gRPC","Terraform","AWS"], domain: ["Reinforcement Learning","Optimisation"], year: "2024" },
  { slug: "09-content-moderation", name: "Content Moderation at Scale", client: "BUAS Coursework", context: "Academic",
    impact: "Coursework build: a multi-modal moderation classifier with a human-in-the-loop active-learning loop, evaluated at high precision.",
    mlops: "Active-learning retraining with drift alerts on category mix and score distributions.",
    stack: ["PyTorch","ONNX Runtime","Kafka","KServe","Grafana"], domain: ["NLP","Vision","Trust & Safety"], year: "2023" },
  { slug: "10-defect-detection", name: "Edge Defect Detection Vision System", client: "BUAS × Foundry Mfg.", context: "Publication",
    impact: "Edge vision model spotting surface defects at 60 fps on Jetson — the basis for a short paper.",
    mlops: "Over-the-air model updates and edge monitoring across the device fleet.",
    stack: ["PyTorch","TensorRT","NVIDIA Jetson","MLflow","Docker"], domain: ["Vision","Edge"], year: "2022" },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const pad = (n) => String(n).padStart(2, "0");

// Filter by context category (Client / Academic / Publication / Personal), in a fixed order.
const CONTEXT_ORDER = ["Client", "Academic", "Publication", "Personal"];
const FILTERS = CONTEXT_ORDER.filter((c) => PROJECTS.some((p) => p.context === c));

let active = "All";

function cardHTML(p, i) {
  const mlops = p.mlops
    ? `<div class="pcard__mlops"><span class="label">${esc(p.mlopsLabel || "MLOps")}</span><p>${esc(p.mlops)}</p></div>`
    : "";
  return `
  <article class="pcard" data-reveal>
    <span class="pcard__index">${pad(i + 1)}</span>
    <div class="pcard__left">
      <p class="pcard__client">${esc(p.client)} <span class="tag-pill" data-context="${esc(p.context)}">${esc(p.context)}</span></p>
      <h3 class="pcard__name">${esc(p.name)}</h3>
      <p class="pcard__impact">${esc(p.impact)}</p>
    </div>
    <div class="pcard__right">
      ${mlops}
      <ul class="stack" aria-label="Tech stack">${p.stack.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
      <div class="pcard__foot"><a class="link-inline" href="Project Detail Preview.html">Project details <span aria-hidden="true">↗</span></a></div>
    </div>
  </article>`;
}

function render() {
  const visible = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.context === active);
  document.getElementById("projectsGrid").innerHTML = visible.map(cardHTML).join("");
  document.getElementById("filterCount").textContent = `${visible.length} / ${PROJECTS.length}`;
  // re-reveal freshly injected cards
  document.querySelectorAll("#projectsGrid [data-reveal]").forEach((el) => { el.style.transition = "none"; el.classList.add("is-in"); });
}

function renderFilters() {
  const tabs = ["All", ...FILTERS];
  document.getElementById("filterTabs").innerHTML = tabs.map((t) =>
    `<button class="filterbar__chip${t === active ? " is-active" : ""}" role="tab" aria-selected="${t === active}" data-tag="${esc(t)}">${esc(t)}</button>`
  ).join("");
  document.querySelectorAll("#filterTabs .filterbar__chip").forEach((btn) => {
    btn.addEventListener("click", () => { active = btn.getAttribute("data-tag"); renderFilters(); render(); });
  });
}

renderFilters();
render();
