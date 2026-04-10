import type { AppBindings, AppStore } from "../../core/bindings";
import { createD1Store } from "../../infrastructure/persistence/d1";

export async function resolveStore(env: AppBindings, injected?: AppStore) {
  if (injected) return injected;
  if (env.DB) return createD1Store(env.DB);
  throw new Error("DB binding is required");
}
