export function ordersReducer(state: any = {}, action: any) {
  switch (action.type) {
    case "orders/create": return { ...state, last: "create" };
    case "orders/cancel": return { ...state, last: "cancel" };
    case "orders/ship": return { ...state, last: "ship" };
    case "orders/refund": return { ...state, last: "refund" };
    case "orders/archive": return { ...state, last: "archive" };
    default: return state;
  }
}
