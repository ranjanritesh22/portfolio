import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";

import { profile } from "@/content/profile";
import "./globals.css";

/**
 * A serif display face over a sans body is what makes "editorial" legible in
 * under a second. Sans-only reads as product UI; this site is meant to be
 * read, not operated.
 *
 * next/font self-hosts these at build time and emits size-adjust fallback
 * metrics, so there is no third-party request, no flash of unstyled text and
 * no layout shift when the real face swaps in.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  // Italic is used for pull quotes in the case studies.
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.positioning,
  authors: [{ name: profile.name, url: profile.links.github }],
};

/**
 * Runs before first paint, so a dark-mode visitor never sees a white flash.
 *
 * It reads the stored choice first and the OS preference second, which is the
 * order that makes an explicit toggle stick across navigations. Wrapped in
 * try/catch because a browser with site data blocked throws on localStorage
 * access, and a theme script must never be the reason a page fails to render.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // Set by the script below before paint; React must not warn about the mismatch.
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
