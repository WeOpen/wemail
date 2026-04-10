export function formatAttachmentSize(size: number) {
  return `${Math.round(size / 1024)} KB`;
}

export function formatReceivedAt(value: string) {
  return new Date(value).toLocaleString();
}
