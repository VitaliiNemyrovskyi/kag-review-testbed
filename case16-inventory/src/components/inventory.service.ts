import { Store } from "../store/store";

export class InventoryService {
  constructor(private readonly store: Store) {}

  reserve(sku: string, qty: number) {
    // Hold stock for a pending order.
    this.store.dispatch({ type: "inventory/reserved", sku, qty });
  }

  release(sku: string, qty: number) {
    this.store.dispatch({ type: "inventory/released", sku, qty });
  }

  restock(sku: string, qty: number) {
    this.store.dispatch({ type: "inventory/restocked", sku, qty });
  }
}
