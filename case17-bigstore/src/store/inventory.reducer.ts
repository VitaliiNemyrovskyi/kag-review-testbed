export function inventoryReducer(state: any = {}, action: any) {
  switch (action.type) {
    case "inventory/reserve": return { ...state, last: "reserve" };
    case "inventory/release": return { ...state, last: "release" };
    case "inventory/restock": return { ...state, last: "restock" };
    case "inventory/adjust": return { ...state, last: "adjust" };
    case "inventory/audit": return { ...state, last: "audit" };
    default: return state;
  }
}
