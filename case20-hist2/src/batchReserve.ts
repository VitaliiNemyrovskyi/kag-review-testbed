import { reserveInventory } from "./inventory";

export function runNightlyReserve(items: Array<{ sku: string; qty: number }>) {
  for (const it of items) reserveInventory(it.sku, it.qty);
}
