import { createApp, processInboundEmail, runCleanup } from "./app/create-app";
import type { AppBindings } from "./core/bindings";
import { createD1Store } from "./infrastructure/persistence/d1";

const app = createApp();

export default {
  fetch: app.fetch,
  async email(message: { to: string; raw: ReadableStream<Uint8Array> }, env: AppBindings) {
    if (!env.DB) return;
    await processInboundEmail(env, createD1Store(env.DB), message);
  },
  async scheduled(_controller: ScheduledController, env: AppBindings) {
    if (!env.DB) return;
    await runCleanup(createD1Store(env.DB), env);
  }
};
