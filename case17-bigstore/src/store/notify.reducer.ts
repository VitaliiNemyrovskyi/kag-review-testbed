export function notifyReducer(state: any = {}, action: any) {
  switch (action.type) {
    case "notify.push": return { ...state, last: "push" };
    case "notify.email": return { ...state, last: "email" };
    case "notify.sms": return { ...state, last: "sms" };
    case "notify.markRead": return { ...state, last: "markRead" };
    case "notify.dismiss": return { ...state, last: "dismiss" };
    default: return state;
  }
}
