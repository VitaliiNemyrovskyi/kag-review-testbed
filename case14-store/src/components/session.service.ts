import { Store } from "../store/store";

export class SessionService {
  constructor(private readonly store: Store) {}

  logout() {
    // On logout we must empty the cart so the next user starts fresh.
    this.store.dispatch({ type: "cart/clear" });
  }
}
