export default {
  testDir: "./e2e",
  retries: 0,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true
  },
  webServer: {
    command: "pnpm exec vite preview --host 127.0.0.1 --port 4173",
    port: 4173,
    reuseExistingServer: true,
    cwd: "."
  }
};
