import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { experience } from "@/content/experience";

/** A logo path that points at nothing renders a broken image, silently. */
const publicDir = fileURLToPath(new URL("../public", import.meta.url));

describe("every role's logo is a file that exists", () => {
  it.each(experience.map((role) => [role.company, role.logo]))("%s -> %s", (_company, logo) => {
    expect(existsSync(`${publicDir}${logo}`)).toBe(true);
  });
});
