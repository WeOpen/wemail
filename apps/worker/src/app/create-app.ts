import { Hono } from "hono";
import { cors } from "hono/cors";

import type { AppContext } from "./context";
import { registerAdminRoutes } from "./routes/admin-routes";
import { registerAuthRoutes } from "./routes/auth-routes";
import { registerMailboxRoutes } from "./routes/mailbox-routes";
import { registerMessageRoutes } from "./routes/message-routes";
import { registerOutboundRoutes } from "./routes/outbound-routes";
import { registerSettingsRoutes } from "./routes/settings-routes";
import { jsonError } from "./services/audit-service";
import { defaultFeatureToggles } from "./services/config-service";
import { getUserFromApiKey, getUserFromSession, resolveFeatureToggles } from "./services/session-service";
import { resolveStore } from "./services/store-service";
import { processInboundEmail, runCleanup } from "./runtime";

export function createApp(options?: { store?: AppContext["Variables"]["store"] }) {
  const app = new Hono<AppContext>();
  app.use("*", cors());

  app.use("*", async (c, next) => {
    const store = await resolveStore(c.env, options?.store);
    const featureToggles = await resolveFeatureToggles(store, c.env);
    const sessionUser = await getUserFromSession(c, store);
    const apiKeyUser = sessionUser ? null : await getUserFromApiKey(c, store);

    c.set("store", store);
    c.set("featureToggles", featureToggles);
    c.set("user", sessionUser ?? apiKeyUser);
    c.set("authMode", sessionUser ? "session" : apiKeyUser ? "apiKey" : "anonymous");

    if (c.env.RATE_LIMITER) {
      const ip = c.req.header("cf-connecting-ip") ?? "local";
      const limited = ["/auth/register", "/auth/login", "/api/mailboxes", "/api/outbound/send", "/api/keys"].includes(
        c.req.path
      );
      if (limited) {
        const result = await c.env.RATE_LIMITER.limit({ key: `${c.req.path}:${ip}` });
        if (!result.success) return jsonError("Rate limit exceeded", 429);
      }
    }

    return next();
  });

  app.get("/health", (c) =>
    c.json({
      ok: true,
      environment: c.env.ENVIRONMENT ?? "local",
      appName: c.env.APP_NAME,
      featureToggles: c.get("featureToggles") ?? defaultFeatureToggles(c.env)
    })
  );

  registerAuthRoutes(app);
  registerMailboxRoutes(app);
  registerMessageRoutes(app);
  registerOutboundRoutes(app);
  registerSettingsRoutes(app);
  registerAdminRoutes(app);

  return app;
}

export { processInboundEmail, runCleanup };
