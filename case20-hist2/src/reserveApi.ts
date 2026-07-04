import { reserveInventory } from "./inventory";

export function handleReserveRequest(req: { sku: string; qty: number }) {
  reserveInventory(req.sku, req.qty);
  return { status: 200 };
}
