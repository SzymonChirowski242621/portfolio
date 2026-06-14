// Work history — most recruiter-relevant first.
export const experience = [
  {
    when: "Feb 2026 — Present",
    role: "Research Assistant",
    org: "Breda University of Applied Sciences",
    desc: "Working on the Tangible Landscape project, focused on geospatial data projection and processing — including 3D scanning and point-cloud workflows that turn physical terrain models into live, analysable data.",
    tags: ["3D Scanning", "Point Cloud Processing", "Python", "Geospatial Data"],
  },
  {
    when: "Apr 2025 — Present",
    role: "AI Chatbot Developer · Student Assistant",
    org: "Breda University of Applied Sciences",
    desc: "Commissioned by the university administration, I led end-to-end development of an AI chatbot that helps prospective students with program discovery, application tracking and admissions questions. I designed the inclusive, adaptive conversation flows and built the web-scraping and API-based data pipelines that keep its answers accurate against official university data — working directly with academic and administrative staff to translate their needs into features.",
    tags: ["LangChain", "Ollama", "PostgreSQL", "Python"],
  },
  {
    when: "Aug — Sep 2023",
    role: "SOC Trainee",
    org: "DAGMA Bezpieczeństwo IT · Katowice",
    desc: "Summer apprenticeship in a Security Operations Center. Worked with the ELK Stack (Elasticsearch, Logstash, Kibana) and SIEM tooling for security-event monitoring and threat detection, gaining hands-on experience in log analysis and incident-triage workflows.",
    tags: ["ELK Stack", "SIEM", "Log Analysis"],
  },
];

// Publications — compact, lives inside the Experience section.
export const publications = [
  {
    title: "When Text Is Not Enough: Structural Limits of Text-Only Transformer-Based Emotion Classification",
    venue: "39th Bled eConference",
    date: "2026",
    link: "https://doi.org/10.18690/um.fov.4.2026.44",
  },
];

// Education.
export const education = [
  {
    when: "2024 — 2028 (expected)",
    degree: "B.Sc. Applied Data Science & Artificial Intelligence",
    institution: "Breda University of Applied Sciences",
    focus: "Applied ML · Computer vision · MLOps · Production data systems",
  },
  {
    when: "2019 — 2024",
    degree: "IT Technician (Technical Secondary School)",
    institution: "Technikum Lotnicze, Katowice",
    focus: "IT infrastructure · Server administration (Windows & Linux) · Programming fundamentals",
  },
];

// High-signal certifications only (cloud / ML / infra).
// Empty for now — the Certificates section auto-hides until you add one.
// `mark` is a short badge label/initials shown in the card (e.g. "AWS").
export const certificates: { name: string; issuer: string; mark: string; year?: string; link?: string }[] = [
];