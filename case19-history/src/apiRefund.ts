import { refund } from "./refund";

// New HTTP endpoint handler for user-initiated refunds.
export function handleRefundRequest(req: { account: string; amount: number }) {
  const ok = refund(req.account, req.amount);
  return { status: ok ? 200 : 400 };
}
