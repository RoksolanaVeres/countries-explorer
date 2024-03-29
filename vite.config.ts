/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { visualizer, type PluginVisualizerOptions } from "rollup-plugin-visualizer";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ANALYZE: "true" | undefined;
    }
  }
}

const shouldAnalyze = process.env.ANALYZE === "true";
const visualizerOpts: PluginVisualizerOptions = {
  template: "treemap",
  open: true,
  gzipSize: true,
  filename: "dist/stats.html",
};

export default defineConfig(({ mode }) => ({
  plugins: [react(), shouldAnalyze && visualizer(visualizerOpts)],
  esbuild: {
    pure: mode === "production" ? ["console.log"] : [],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    includeSource: ["src/**/*.ts", "src/**/*.tsx"],
  },
  define: {
    "import.meta.vitest": false,
  },
}));
