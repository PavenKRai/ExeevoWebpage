import { ImageResponse } from "next/og";
import { orgFacts } from "@/content/seo";

export const alt = "Exeevo: life sciences CRM built natively on Microsoft";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand share card (1200x630): ink ground, a soft brand-gradient glow, the name and the one-line positioning. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#182026",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -140,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "linear-gradient(135deg, #DF1995, #0762C8 55%, #00C389)",
            opacity: 0.55,
            filter: "blur(80px)",
          }}
        />
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{orgFacts.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 860 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Life sciences CRM, built natively on Microsoft
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#B6C1C8" }}>{orgFacts.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
