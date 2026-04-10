type OutboundRecordLike = {
  id: string;
  toAddress: string;
  subject: string;
  status: string;
  errorText: string | null;
  createdAt: string;
};

export function toOutboundListResponse(messages: OutboundRecordLike[]) {
  return { messages };
}

export function toQuotaResponse(quota: {
  dailyLimit: number;
  sendsToday: number;
  disabled: boolean;
}) {
  return {
    ok: true,
    quota: {
      dailyLimit: quota.dailyLimit,
      sendsToday: quota.sendsToday,
      disabled: quota.disabled
    }
  };
}
