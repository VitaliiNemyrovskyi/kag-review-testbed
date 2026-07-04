export function cartReducer(state: any = {}, action: any) {
  switch (action.type) {
    case "cart/add": return { ...state, last: "add" };
    case "cart/remove": return { ...state, last: "remove" };
    case "cart/checkout": return { ...state, last: "checkout" };
    case "cart/clear": return { ...state, last: "clear" };
    case "cart/applyCoupon": return { ...state, last: "applyCoupon" };
    default: return state;
  }
}
