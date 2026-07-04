import { Store } from "../store/store";

export class CartComponent {
  constructor(private readonly store: Store) {}

  add(payload?: any) { this.store.dispatch({ type: "cart/add", payload }); }
  remove(payload?: any) { this.store.dispatch({ type: "cart/remove", payload }); }
  checkout(payload?: any) { this.store.dispatch({ type: "cart/checkout", payload }); }
  clear(payload?: any) { this.store.dispatch({ type: "cart/clear", payload }); }
  applyCoupon(payload?: any) { this.store.dispatch({ type: "cart/applyCoupon", payload }); }
}
