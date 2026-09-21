import type { Profile } from "./types";

export const profile: Profile = {
  name: "Ritesh Ranjan",
  role: "Senior Frontend Engineer",

  /**
   * The one sentence that has to do the most work on this site.
   *
   * It leads with frontend because that is the real depth, and it ends at the
   * schema and the deploy because that is the full-stack claim. The claim is
   * made once, here, and then evidenced for the rest of the page rather than
   * repeated — see CLAUDE.md §A3.
   */
  positioning:
    "I build enterprise commerce and SaaS frontends in React, Next.js and TypeScript — and own them end to end, through the Postgres schema and the deploy.",

  location: "India",
  availability: "Open to remote, and to Hyderabad, Bangalore, Pune or Delhi NCR",

  email: "reachranjanritesh@gmail.com",
  phone: "+91 9431877305",

  links: {
    github: "https://github.com/ranjanritesh22",
    linkedin: "https://www.linkedin.com/in/ranjanritesh22/",
    // twitter: add the handle here once confirmed — it renders only when set.
  },

  resumePath: "/resume.pdf",
};
