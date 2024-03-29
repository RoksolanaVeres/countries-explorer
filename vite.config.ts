/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
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
