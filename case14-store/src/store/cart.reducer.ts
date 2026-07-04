export interface CartState {
  items: string[];
  checkedOut: boolean;
}

const initial: CartState = { items: [], checkedOut: false };

export function cartReducer(state: CartState = initial, action: any): CartState {
  switch (action.type) {
    case "cart/add":
      return { ...state, items: [...state.items, action.sku] };
    case "cart/remove":
      return { ...state, items: state.items.filter((s) => s !== action.sku) };
    default:
      return state;
  }
}
