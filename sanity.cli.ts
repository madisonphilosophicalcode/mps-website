import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "mps-website",
  deployment: {
    appId: "ih0z4b9aqs03a7g5c57781l3",
  },
});
