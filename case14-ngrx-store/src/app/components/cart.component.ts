import { Store } from "../store/store";

export class CartComponent {
  constructor(private store: Store) {}

  addToCart(id: string) {
    this.store.dispatch({ type: "cart/addItem", id });
  }

  removeFromCart(id: string) {
    this.store.dispatch({ type: "cart/removeItem", id });
  }

  checkout() {
    this.store.dispatch({ type: "cart/checkout" });
  }
}
