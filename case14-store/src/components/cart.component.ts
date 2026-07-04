import { Store } from "../store/store";

export class CartComponent {
  constructor(private readonly store: Store) {}

  addItem(sku: string) {
    this.store.dispatch({ type: "cart/add", sku });
  }

  removeItem(sku: string) {
    this.store.dispatch({ type: "cart/remove", sku });
  }

  checkout() {
    // Fires the checkout action; the reducer computes totals and marks the order.
    this.store.dispatch({ type: "cart/checkout" });
  }
}
