import { ImageResponse } from "next/og";
import { SITE_NAME } from "./lib/site";

// Megosztási előnézet (Facebook, Messenger, WhatsApp, LinkedIn stb.).
export const alt = `${SITE_NAME} – Egynapos gázkészülék csere`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f2a5e 0%, #2b5fd0 100%)",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(127,196,232,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            💧
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "76px", fontWeight: 800, lineHeight: 1.05 }}>
            Egynapos gázkészülék csere
          </div>
          <div style={{ fontSize: "34px", color: "#c9dcff" }}>
            Fix ár · 100% garancia · 50 év tapasztalat
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "28px",
            fontWeight: 600,
            color: "#7fc4e8",
          }}
        >
          Azonnali online árajánlat →
        </div>
      </div>
    ),
    { ...size },
  );
}
