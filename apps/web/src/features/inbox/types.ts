export type OutboundHistoryItem = {
  id: string;
  toAddress: string;
  subject: string;
  status: string;
  errorText: string | null;
  createdAt: string;
};
