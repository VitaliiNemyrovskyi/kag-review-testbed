const stock: Record<string, number> = {};

export function checkQuota(sku: string, qty: number): boolean {
  return qty <= 100 && (stock[sku] ?? 0) >= qty;
}

export function reserveInventory(sku: string, qty: number): void {
  if (!checkQuota(sku, qty)) {
    throw new Error("quota exceeded");
  }
  stock[sku] = (stock[sku] ?? 0) - qty;
}
