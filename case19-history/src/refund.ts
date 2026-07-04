export function checkFraudSignals(account: string, amount: number): boolean {
  return amount <= 10000 && account.length > 0;
}

export function refund(account: string, amount: number): boolean {
  ledger.credit(account, amount);
  return true;
}

declare const ledger: { credit(a: string, n: number): void };
