import { SITE_URL } from "@/lib/site";

/**
 * One layout for every OG card, so the home page and both case studies unfurl
 * as visibly the same system rather than three unrelated images.
 *
 * Dark, because a card sits inside a light feed on both LinkedIn and X and the
 * contrast is what stops it reading as part of the page. Type is deliberately
 * large: LinkedIn renders these at roughly a third of their size in-feed, and
 * anything set for a full-size preview is unreadable there.
 */
export function OgCard({
  eyebrow,
  title,
  subtitle,
  metrics,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  metrics: { value: string; label: string }[];
}) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0c0e",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#797d86",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: title.length > 40 ? 62 : 74,
            lineHeight: 1.1,
            color: "#f2f3f5",
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#a4a8b1",
            // Two lines at most; a third would collide with the metric row.
            maxWidth: 940,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderTop: "1px solid #24262b",
          paddingTop: 32,
        }}
      >
        <div style={{ display: "flex", gap: 56 }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 40, color: "#f2f3f5" }}>{m.value}</div>
              <div style={{ marginTop: 6, fontSize: 22, color: "#797d86" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 24, color: "#8b8df8" }}>
          {SITE_URL.replace("https://", "")}
        </div>
      </div>
    </div>
  );
}

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
