const token = localStorage.getItem("accessToken");

export async function getOrders() {
  const res = await fetch("/api/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
