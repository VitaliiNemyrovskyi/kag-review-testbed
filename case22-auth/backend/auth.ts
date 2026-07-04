export function requireAuth(req: any, res: any, next: any) {
  const h = req.headers["authorization"];
  if (!h || !h.startsWith("Bearer ")) return res.status(401).json({ error: "unauthorized" });
  next();
}
