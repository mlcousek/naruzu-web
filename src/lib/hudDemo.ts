/**
 * The model behind the home page HUD demo. Deliberately simple and labelled as
 * a demo on the page: steady-state speed on a gradient in still air, solved
 * from power = (rolling + gravity + air drag) x speed. Zone thresholds and
 * colours are the app's (apps/web/src/hud.ts `powerZones`).
 */
export const DEMO = {
  riderKg: 75,
  bikeKg: 9,
  ftp: 250,
  crr: 0.004,
  cda: 0.32,
  rho: 1.225,
  g: 9.81,
} as const;

/** Steady speed in km/h for `watts` on `gradePercent`, by bisection. */
export function demoSpeed(watts: number, gradePercent: number): number {
  const mass = DEMO.riderKg + DEMO.bikeKg;
  const slope = Math.atan(gradePercent / 100);
  const resist = (v: number) =>
    (mass * DEMO.g * (DEMO.crr * Math.cos(slope) + Math.sin(slope)) +
      0.5 * DEMO.rho * DEMO.cda * v * v) *
    v;
  let lo = 0;
  let hi = 30; // m/s
  // Coasting downhill: speed where gravity balances drag.
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (resist(mid) < Math.max(0, watts)) lo = mid;
    else hi = mid;
  }
  return Math.min(90, lo * 3.6);
}

const ZONES = [
  { zone: 1, name: "Recovery", upTo: 0.55, color: "#9aa4b2" },
  { zone: 2, name: "Endurance", upTo: 0.75, color: "#3b9dff" },
  { zone: 3, name: "Tempo", upTo: 0.9, color: "#35d07f" },
  { zone: 4, name: "Threshold", upTo: 1.05, color: "#ffd23f" },
  { zone: 5, name: "VO2 max", upTo: 1.2, color: "#ff8a3d" },
  { zone: 6, name: "Anaerobic", upTo: Infinity, color: "#ff4d5e" },
] as const;

export type DemoZone = (typeof ZONES)[number];

export function demoZone(watts: number): DemoZone {
  const share = Math.max(0, watts) / DEMO.ftp;
  return ZONES.find((z) => share < z.upTo) ?? ZONES[5];
}
