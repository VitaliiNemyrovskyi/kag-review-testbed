const token = localStorage.getItem("accessToken");

export async function getOrders() {
  const res = await fetch("/api/orders");
  return res.json();
}

export async function createOrder(payload: any) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
