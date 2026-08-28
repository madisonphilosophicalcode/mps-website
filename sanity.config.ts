import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// `SANITY_STUDIO_*` is checked first because the standalone deployed studio
// is built with Sanity's own bundler, which only inlines that prefix — not
// `NEXT_PUBLIC_*`, which Next.js inlines for the studio route embedded in the app.
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  "";
const dataset =
  process.env.SANITY_STUDIO_DATASET ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  "production";

export default defineConfig({
  name: "default",
  title: "Madison Philosophical Society",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
