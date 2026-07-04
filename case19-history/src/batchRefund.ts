import { refund } from "./refund";

// Legacy nightly batch that refunds a list of pending items.
export function runBatch(pending: Array<{ account: string; amount: number }>) {
  for (const p of pending) {
    refund(p.account, p.amount);
  }
}
