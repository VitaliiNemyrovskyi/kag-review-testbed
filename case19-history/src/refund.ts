export function checkFraudSignals(account: string, amount: number): boolean {
  return amount <= 10000 && account.length > 0;
}

export function refund(account: string, amount: number): boolean {
  if (!checkFraudSignals(account, amount)) {
    throw new Error("refund blocked by fraud check");
  }
  ledger.credit(account, amount);
  return true;
}

declare const ledger: { credit(a: string, n: number): void };
