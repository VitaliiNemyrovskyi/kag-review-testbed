export interface InventoryState {
  reserved: Record<string, number>;
  onHand: Record<string, number>;
}

const initial: InventoryState = { reserved: {}, onHand: {} };

export function inventoryReducer(state: InventoryState = initial, action: any): InventoryState {
  switch (action.type) {
    case "inventory/reserved": {
      const reserved = { ...state.reserved, [action.sku]: (state.reserved[action.sku] ?? 0) + action.qty };
      return { ...state, reserved };
    }
    case "inventory/released": {
      const reserved = { ...state.reserved, [action.sku]: Math.max(0, (state.reserved[action.sku] ?? 0) - action.qty) };
      return { ...state, reserved };
    }
    case "inventory/restocked": {
      const onHand = { ...state.onHand, [action.sku]: (state.onHand[action.sku] ?? 0) + action.qty };
      return { ...state, onHand };
    }
    default:
      return state;
  }
}
