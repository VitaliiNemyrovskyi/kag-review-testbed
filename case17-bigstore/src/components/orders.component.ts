import { Store } from "../store/store";

export class OrdersComponent {
  constructor(private readonly store: Store) {}

  create(payload?: any) { this.store.dispatch({ type: "orders/create", payload }); }
  cancel(payload?: any) { this.store.dispatch({ type: "orders/cancel", payload }); }
  ship(payload?: any) { this.store.dispatch({ type: "orders/ship", payload }); }
  refund(payload?: any) { this.store.dispatch({ type: "orders/refund", payload }); }
  archive(payload?: any) { this.store.dispatch({ type: "orders/archive", payload }); }
}
