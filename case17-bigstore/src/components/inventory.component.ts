import { Store } from "../store/store";

export class InventoryComponent {
  constructor(private readonly store: Store) {}

  reserve(payload?: any) { this.store.dispatch({ type: "inventory/reserve", payload }); }
  release(payload?: any) { this.store.dispatch({ type: "inventory/release", payload }); }
  restock(payload?: any) { this.store.dispatch({ type: "inventory/restock", payload }); }
  adjust(payload?: any) { this.store.dispatch({ type: "inventory/adjust", payload }); }
  audit(payload?: any) { this.store.dispatch({ type: "inventory/audit", payload }); }
}
