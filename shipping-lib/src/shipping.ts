export interface Parcel {
  weightKg: number;
  zone: string;
}

/** Public API: computes the shipping cost for a parcel. Consumed by client apps. */
export function calculateShipping(parcel: Parcel): number {
  const base = parcel.zone === "domestic" ? 5 : 20;
  return base + parcel.weightKg * 2;
}

export function formatParcelLabel(parcel: Parcel): string {
  return `${parcel.zone}-${parcel.weightKg}kg`;
}
