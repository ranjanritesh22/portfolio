"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * The only client component on the home page.
 *
 * It renders a stable, correctly-labelled button on the server and syncs the
 * icon after mount. Reading the DOM attribute rather than re-deriving the
 * theme keeps this in agreement with the pre-paint script in layout.tsx —
 * two sources of truth for the theme is how a flash gets reintroduced.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Site data blocked. The theme still applies for this page view, which
      // is the whole of what the toggle promised.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // Before mount the icon is a guess, so the accessible name stays neutral
      // rather than claiming a direction that might be wrong for one frame.
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border-default text-text-2 transition-colors hover:bg-bg-subtle hover:text-text-1"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable="false"
        className="size-[18px]"
      >
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
          </>
        ) : (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        )}
      </svg>
    </button>
  );
}
