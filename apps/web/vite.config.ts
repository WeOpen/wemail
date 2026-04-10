import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"]
  }
});
