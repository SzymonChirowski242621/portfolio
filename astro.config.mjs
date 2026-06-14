import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

// Update this to your real domain before deploying.
// Used for canonical URLs, Open Graph absolute URLs, and the sitemap.
const SITE = "https://szymonchirowski.com";

// https://astro.build
export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "ignore",
  integrations: [
    vue(),
    sitemap(),
  ],
  build: {
    inlineStylesheets: "auto",
  },
});
