import { requireAuth } from "./auth";

export function registerRoutes(app: any) {
  // Both order endpoints are protected: caller must send a valid bearer token.
  app.get("/api/orders", requireAuth, listOrders);
  app.post("/api/orders", requireAuth, createOrder);
}

function listOrders(req: any, res: any) { res.json([]); }
function createOrder(req: any, res: any) { res.json({ id: 1 }); }
