export function handleRequest(token, payload) {
  if (!(typeof token === "string" && token.length >= 32)) {
    return { status: 401 };
  }
  return { status: 200, payload };
}
