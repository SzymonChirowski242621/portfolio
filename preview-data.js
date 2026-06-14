// Renders the dynamic bits of the static preview (mirrors the Astro data files).
const featured = [
  { num: "01", client: "Veridian Bank", context: "Client", name: "Real-Time Fraud Detection Platform",
    impact: "Built a real-time fraud-scoring prototype during my internship — flagging risky transactions in under 100ms and folded into the team's evaluation pipeline.",
    mlops: "Online/offline feature parity, latency budgeting and a drift-monitoring dashboard for the scoring service.",
    stack: ["Python","PyTorch","Kafka","Feast","KServe","Kubernetes","Prometheus"] },
  { num: "02", client: "BUAS × Helio Health", context: "Publication", name: "Clinical NLP Triage Assistant",
    impact: "Message-triage classifier reaching 94% accuracy on held-out data — written up as a workshop publication.",
    mlops: "Model registry plus offline/online evaluation, with privacy-aware logging on sensitive text.",
    stack: ["Python","Hugging Face","Transformers","FastAPI","Docker","GCP Vertex AI"] },
  { num: "03", client: "Cartø Retail", context: "Client", name: "Recommendation Engine Revamp",
    impact: "Two-tower recommender that beat the existing 'also-bought' baseline on offline recall, in an A/B-ready setup.",
    mlops: "Online/offline feature parity and automated offline evals gating each model version.",
    stack: ["TensorFlow","Vertex AI","BigQuery","Vertex Pipelines","Redis"] },
  { num: "04", client: "BUAS Capstone × GreenGrid", context: "Academic", name: "Predictive Maintenance for Wind Turbines",
    impact: "Team capstone predicting turbine failures from sensor data — multi-day early warning in evaluation.",
    mlops: "Streaming feature engineering with monitoring of feature freshness and calibration.",
    stack: ["Python","XGBoost","Spark","Delta Lake","Databricks","MLflow"] },
];

const experience = [
  { when: "2025 — Present", role: "Machine Learning Intern", org: "Veridian Bank · Breda",
    desc: "Working in the fraud-analytics team building and evaluating real-time scoring models — and learning first-hand how models get deployed, monitored and rolled back safely once they leave the notebook.",
    tags: ["Python","PyTorch","Feast","Docker"] },
  { when: "2024 — 2025", role: "Research Assistant (part-time)", org: "BUAS AI Lab",
    desc: "Supported applied-ML research on clinical NLP and edge vision: ran experiments, maintained training pipelines, and helped turn results into two workshop publications.",
    tags: ["PyTorch","Transformers","Weights & Biases"] },
  { when: "Summer 2024", role: "Data Science Intern", org: "Northwind Logistics",
    desc: "Built a demand-forecasting pipeline to replace manual notebook forecasts — my first real taste of automating retraining and adding CI checks for models.",
    tags: ["Airflow","dbt","LightGBM"] },
];

const certs = [
  { mark: "AWS", name: "ML — Associate", issuer: "Amazon Web Services" },
  { mark: "GCP", name: "Associate Cloud Engineer", issuer: "Google Cloud" },
  { mark: "K8s", name: "KCNA — Kubernetes & Cloud Native", issuer: "CNCF / Linux Foundation" },
  { mark: "DL", name: "Deep Learning Specialization", issuer: "DeepLearning.AI" },
  { mark: "TF", name: "Developer Certificate", issuer: "TensorFlow" },
];

const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;");

document.getElementById("featuredList").innerHTML = featured.map((p) => `
  <article class="pcard" data-reveal>
    <span class="pcard__index">${p.num}</span>
    <div class="pcard__left">
      <p class="pcard__client">${esc(p.client)} <span class="tag-pill" data-context="${esc(p.context)}">${esc(p.context)}</span></p>
      <h3 class="pcard__name">${esc(p.name)}</h3>
      <p class="pcard__impact">${esc(p.impact)}</p>
    </div>
    <div class="pcard__right">
      <div class="pcard__mlops"><span class="label">MLOps</span><p>${esc(p.mlops)}</p></div>
      <ul class="stack" aria-label="Tech stack">${p.stack.map((t)=>`<li class="chip">${esc(t)}</li>`).join("")}</ul>
      <div class="pcard__foot"><a class="link-inline" href="Project Detail Preview.html">Project details <span aria-hidden="true">↗</span></a></div>
    </div>
  </article>`).join("");

document.getElementById("timeline").innerHTML = experience.map((e) => `
  <article class="tl-item">
    <div class="tl-item__when">${esc(e.when)}</div>
    <div class="tl-item__body">
      <h3 class="tl-item__role">${esc(e.role)}</h3>
      <p class="tl-item__org">${esc(e.org)}</p>
      <p class="tl-item__desc">${esc(e.desc)}</p>
      <ul class="tl-item__tags" aria-label="Tools">${e.tags.map((t)=>`<li class="chip">${esc(t)}</li>`).join("")}</ul>
    </div>
  </article>`).join("");

document.getElementById("certs").innerHTML = certs.map((c) => `
  <li class="cert">
    <span class="cert__mark" aria-hidden="true">${esc(c.mark)}</span>
    <span><span class="cert__name">${esc(c.name)}</span><span class="cert__issuer">${esc(c.issuer)}</span></span>
  </li>`).join("");

// Theme toggle (mirrors the Vue island)
const btn = document.getElementById("themeBtn");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
function syncIcon() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  moon.style.display = dark ? "none" : "block";
  sun.style.display = dark ? "block" : "none";
  btn.setAttribute("aria-pressed", String(dark));
}
syncIcon();
btn.addEventListener("click", () => {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  const next = dark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  syncIcon();
});

// Scroll reveal — viewport-position based (reliable across embeds), with failsafe.
(function () {
  document.documentElement.classList.add("js");
  const els = Array.from(document.querySelectorAll("[data-reveal]"));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("is-in")); return;
  }
  function reveal() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    for (const el of els) {
      if (el.classList.contains("is-in")) continue;
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
    }
  }
  requestAnimationFrame(() => { reveal(); requestAnimationFrame(reveal); });
  window.addEventListener("scroll", reveal, { passive: true });
  window.addEventListener("resize", reveal);
  // Failsafe: hard-settle to the visible end-state even where the CSS clock is frozen
  // (screenshot/export contexts). Disabling the transition makes opacity:1 apply instantly.
  setTimeout(() => els.forEach((el) => { el.style.transition = "none"; el.classList.add("is-in"); }), 700);
})();

// Scroll-drawn SVG spine
(function () {
  const svg = document.getElementById("spine");
  const path = document.getElementById("spinePath");
  const tip = document.getElementById("spineTip");
  const main = document.getElementById("main");
  if (!svg || !path || !main) return;
  let len = 0;
  function build() {
    const H = main.offsetHeight, W = 40, cx = W / 2, amp = 11;
    const waves = Math.max(4, Math.round(H / 520));
    const seg = H / waves;
    let d = "M " + cx + " 0", dir = 1;
    for (let i = 0; i < waves; i++) {
      const y0 = i * seg, y1 = (i + 1) * seg, cpy = y0 + seg / 2, x2 = cx + dir * amp;
      d += " Q " + x2 + " " + cpy + " " + cx + " " + y1;
      dir *= -1;
    }
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("width", W);
    svg.setAttribute("height", H);
    svg.style.height = H + "px";
    path.setAttribute("d", d);
    len = path.getTotalLength();
    path.style.strokeDasharray = len;
    update();
  }
  function update() {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const p = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 1;
    path.style.strokeDashoffset = len * (1 - p);
    if (tip && len) {
      const pt = path.getPointAtLength(len * p);
      tip.setAttribute("cx", pt.x);
      tip.setAttribute("cy", pt.y);
      tip.style.opacity = p > 0.003 && p < 0.997 ? 1 : 0;
    }
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", build);
  build();
  setTimeout(build, 350);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
})();
