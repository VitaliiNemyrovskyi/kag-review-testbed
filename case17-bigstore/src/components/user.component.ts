import { Store } from "../store/store";

export class UserComponent {
  constructor(private readonly store: Store) {}

  login(payload?: any) { this.store.dispatch({ type: "user/login", payload }); }
  logout(payload?: any) { this.store.dispatch({ type: "user/logout", payload }); }
  updateProfile(payload?: any) { this.store.dispatch({ type: "user/updateProfile", payload }); }
  verifyEmail(payload?: any) { this.store.dispatch({ type: "user/verifyEmail", payload }); }
  deleteAccount(payload?: any) { this.store.dispatch({ type: "user/deleteAccount", payload }); }
}
