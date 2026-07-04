export interface Parcel {
  weightKg: number;
  zone: string;
}

/** Public API: computes the shipping cost for a parcel. Consumed by client apps. */
export function computeShippingCost(parcel: Parcel): number {
  const base = parcel.zone === "domestic" ? 5 : 20;
  return base + parcel.weightKg * 2;
}
