export async function apiFetch<T>(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    credentials: "include",
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({ error: `Request failed: ${response.status}` }))) as {
      error?: string;
    };
    throw new Error(payload.error ?? `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
