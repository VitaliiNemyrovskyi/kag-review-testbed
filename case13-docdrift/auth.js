export function validateSession(token) {
  return typeof token === "string" && token.length >= 32;
}

export function handleRequest(token, payload) {
  if (!validateSession(token)) {
    return { status: 401 };
  }
  return { status: 200, payload };
}
