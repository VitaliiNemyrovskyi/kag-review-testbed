export function cartReducer(state: any = { items: [] }, action: any) {
  switch (action.type) {
    case "cart/addItem":
      return { ...state, items: [...state.items, action.id] };
    case "cart/removeItem":
      return { ...state, items: state.items.filter((i: string) => i !== action.id) };
    case "cart/checkout":
      return { ...state, items: [], checkedOut: true };
    default:
      return state;
  }
}
