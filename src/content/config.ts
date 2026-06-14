import { defineCollection, z } from "astro:content";

// Projects collection — one Markdown file per project in src/content/projects/.
// Frontmatter is validated against this schema at build time.
const projects = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    client: z.string(),
    clientType: z.string(), // sector / dataset descriptor
    context: z.string(), // "Client" | "Academic" | "Publication" | "Personal"
    status: z.string().optional(), // e.g. "In development — awaiting deployment". Shown as a badge when present.
    impact: z.string(), // one-line outcome/impact, recruiter-facing
    mlops: z.string().optional(), // the MLOps angle — OPTIONAL: omit on projects where it doesn't apply
    mlopsLabel: z.string().default("MLOps"), // label for the callout, e.g. "MLOps", "Research", "Focus"
    stack: z.array(z.string()),
    domain: z.array(z.string()), // tags for filtering: "NLP", "Vision", "Forecasting"...
    year: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    clientUrl: z.string().optional(), // link to the client / organisation
    presentation: z.string().optional(), // slide deck / presentation PDF
    repo: z.string().optional(), // source code repository
    link: z.string().optional(), // any other external case-study link
  }),
});

export const collections = { projects };