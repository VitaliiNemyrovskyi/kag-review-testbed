import { Store } from "../store/store";

export class NotifyComponent {
  constructor(private readonly store: Store) {}

  push(payload?: any) { this.store.dispatch({ type: "notify/push", payload }); }
  email(payload?: any) { this.store.dispatch({ type: "notify/email", payload }); }
  sms(payload?: any) { this.store.dispatch({ type: "notify/sms", payload }); }
  markRead(payload?: any) { this.store.dispatch({ type: "notify/markRead", payload }); }
  dismiss(payload?: any) { this.store.dispatch({ type: "notify/dismiss", payload }); }
}
