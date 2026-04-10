type RecordLike = Record<string, unknown>;

export function toRecordLike(input: unknown) {
  return (input ?? {}) as RecordLike;
}

export function requireString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

export function requireBoolean(value: unknown) {
  return Boolean(value);
}

export function requireNumber(value: unknown, field: string) {
  const next = Number(value);
  if (!Number.isFinite(next)) {
    throw new Error(`${field} must be a valid number`);
  }
  return next;
}
