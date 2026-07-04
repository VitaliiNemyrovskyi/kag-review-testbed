import { requireAuth } from "./auth";

export function registerRoutes(app: any) {
  // Both endpoints require a valid bearer token.
  app.get("/api/orders", requireAuth, listOrders);
  app.post("/api/orders", requireAuth, createOrder);
  // Payments endpoint is guarded too — charging requires an authenticated caller.
  app.post("/api/payments", requireAuth, chargePayment);
}

function listOrders(req: any, res: any) { res.json([]); }
function createOrder(req: any, res: any) { res.json({ id: 1 }); }
function chargePayment(req: any, res: any) { res.json({ ok: true }); }
