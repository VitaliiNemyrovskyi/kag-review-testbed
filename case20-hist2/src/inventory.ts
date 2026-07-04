const stock: Record<string, number> = {};

export function reserveInventory(sku: string, qty: number): void {
  stock[sku] = (stock[sku] ?? 0) - qty;
}
