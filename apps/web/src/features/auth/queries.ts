import { fetchSession } from "./api";

export async function queryCurrentSession() {
  return fetchSession();
}
