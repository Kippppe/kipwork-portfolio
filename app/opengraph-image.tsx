import { ImageResponse } from "next/og";
import { SITE_URL } from "./lib/content";

export const alt =
  "kip — Multilingual hotel websites, built to be found. Schema.org, hreflang, and Next.js implementation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#5e6ad2";

export default function OpengraphImage() {
  const host = SITE_URL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(900px circle at 10% 6%, rgba(94,106,210,0.30), transparent 45%), radial-gradient(820px circle at 94% 96%, rgba(139,92,246,0.26), transparent 45%)",
          padding: "76px 84px",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.22)",
              backgroundColor: "rgba(255,255,255,0.05)",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8a8f98", letterSpacing: 2 }}>
            kipwork
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 8,
              color: "#8a8f98",
              marginBottom: 26,
            }}
          >
            HOTEL-SPECIALIZED · MULTILINGUAL WEB
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            <div style={{ display: "flex" }}>Multilingual hotel sites,</div>
            <div style={{ display: "flex", color: ACCENT }}>built to be found.</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {["Schema.org", "hreflang ×5", "Next.js", "Local SEO"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  fontSize: 24,
                  color: "rgba(237,237,237,0.85)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8a8f98" }}>{host}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
