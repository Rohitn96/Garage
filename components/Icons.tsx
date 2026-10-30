import type { ServiceId } from "@/content/services";

/** Line icons, 24 px grid, drawn in currentColor. Decorative: always aria-hidden. */
const PATHS = {
  battery: "M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm2-2h2M13 4h2M12 9l-2 4h4l-2 4",
  powertrain: "M4 12h3m10 0h3M7 8h10v8H7zM10 8V5h4v3M9.5 12h5",
  brakes: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-4.5c1.7 1.2 2.8 3 3.2 5",
  suspension: "M12 2v3m0 14v3M8 6l8 2-8 2 8 2-8 2 8 2-8 2",
  tyres: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v5m0 8v5M3 12h5m8 0h5",
  electrical: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  climate: "M12 2v20M4.9 6.9l14.2 10.2M19.1 6.9 4.9 17.1M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5",
  experience: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5 4L12 15l3.5 4L14 22l-2-2-2 2-1.5-3ZM12 6.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.3 1-2Z",
  procedure: "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z",
  estimate: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  shield: "M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Zm-3 9 2 2 4-4",
  scanner: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 3h6v5H9zM9 14h1m2 0h1m2 0h0M9 17h1m2 0h1m2 0h0M10 21v2m4-2v2",
  parts: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM12 2l1.6 2.6 3-.6.6 3 2.6 1.6-1.4 2.7 1.4 2.7-2.6 1.6-.6 3-3-.6L12 22l-1.6-2.6-3 .6-.6-3-2.6-1.6 1.4-2.7-1.4-2.7 2.6-1.6.6-3 3 .6L12 2Z",
  workshop: "M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6M8 13h8",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={PATHS[name]} />
    </svg>
  );
}

export const SERVICE_ICON: Record<ServiceId, IconName> = {
  "svc-brakes": "brakes",
  "svc-suspension": "suspension",
  "svc-tyres": "tyres",
  "svc-electrical": "electrical",
  "svc-climate": "climate",
};
