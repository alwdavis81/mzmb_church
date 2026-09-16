import { defineConfig } from "sanity";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  projectId: "0vl0p2sp",
  dataset: "production",
  plugins: [],
  schema: {
    types: schemaTypes,
  },
});