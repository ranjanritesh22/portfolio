import type { Profile } from "./types";

export const profile: Profile = {
  name: "Ritesh Ranjan",
  role: "Software Engineer – Frontend",

  /**
   * The hero intro, and the meta description. Leads with frontend depth; the
   * end-to-end ownership is evidenced by the work below rather than claimed
   * here — see CLAUDE.md §A3.
   */
  positioning:
    "Frontend engineer with 4+ years building enterprise SaaS products and web platforms in React, Next.js and TypeScript. I build the design systems and frontend platforms other teams ship on, and own features from architecture to production. I build with Claude Code every day, and every repo carries the spec and tests that keep agent-written code honest.",

  location: "India",
  availability: "Open to remote roles, and to hybrid or on-site roles in Hyderabad, Bangalore, Pune or Delhi NCR",

  email: "reachranjanritesh@gmail.com",
  phone: "+91 9431877305",

  links: {
    github: "https://github.com/ranjanritesh22",
    linkedin: "https://www.linkedin.com/in/ranjanritesh22/",
    // twitter: add the handle here once confirmed — it renders only when set.
  },

  resumePath: "/resume.pdf",

  photo: { src: "/ritesh-ranjan.jpg", alt: "Ritesh Ranjan" },
};
