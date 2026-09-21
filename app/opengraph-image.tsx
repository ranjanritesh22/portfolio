import { ImageResponse } from "next/og";

import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "@/components/seo/og-template";
import { profile } from "@/content/profile";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${profile.name} — ${profile.role}`;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow={profile.name}
        title={profile.role}
        subtitle="React, Next.js and TypeScript — owned end to end, through the Postgres schema and the deploy."
        metrics={[
          { value: "4+ yrs", label: "shipping frontend" },
          { value: "2", label: "products built solo" },
          { value: "1,550+", label: "tests written" },
        ]}
      />
    ),
    size,
  );
}
