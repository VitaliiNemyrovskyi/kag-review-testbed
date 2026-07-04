export interface CartState {
  items: string[];
  checkedOut: boolean;
}

const initial: CartState = { items: [], checkedOut: false };

export function cartReducer(state: CartState = initial, action: any): CartState {
  switch (action.type) {
    case "cart/add":
      return { ...state, items: [...state.items, action.sku] };
    case "cart/checkout":
      return { ...state, checkedOut: true };
    case "cart/clear":
      return { ...state, items: [], checkedOut: false };
    default:
      return state;
  }
}
