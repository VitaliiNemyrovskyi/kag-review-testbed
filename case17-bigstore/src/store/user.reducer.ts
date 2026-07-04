export function userReducer(state: any = {}, action: any) {
  switch (action.type) {
    case "user/login": return { ...state, last: "login" };
    case "user/logout": return { ...state, last: "logout" };
    case "user/updateProfile": return { ...state, last: "updateProfile" };
    case "user/verifyEmail": return { ...state, last: "verifyEmail" };
    case "user/deleteAccount": return { ...state, last: "deleteAccount" };
    default: return state;
  }
}
