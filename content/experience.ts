import type { Role } from "./types";

/**
 * Reverse chronological.
 *
 * The Knack Systems entry is the only place on this site where the storefront
 * framework, the 72-primitive design system, the seven gateway adapters, the
 * 706-case suite and Smart Quick Order appear. That work is an employer's
 * internal platform: it is not `storefront-ui` and it is not `hermes`, both of
 * which are separate personal projects with their own, smaller numbers.
 *
 * tests/no-conflation.test.ts enforces the separation in both directions.
 * See CLAUDE.md §C1.
 */
export const experience: Role[] = [
  {
    company: "Knack Systems",
    title: "Associate Consultant, Frontend Engineer",
    start: "Dec 2024",
    end: null,
    location: "Remote",
    bullets: [
      "Architected a backend-agnostic Next.js storefront framework that was adopted as the internal platform for commerce builds, using slot and outlet composition so teams override any page region without forking templates or inheriting upgrade breakage.",
      "Designed its design system of 72 production UI primitives — design tokens, light and dark theming, and full WCAG support across keyboard operability, ARIA and reduced motion — documented in 74 Storybook stories as the single source of truth for consuming teams.",
      "Built the data layer as 7 gateway adapters with a composable normalizer chain and a mock adapter, so the storefront runs offline in development and swaps backends behind one environment flag.",
      "Set the platform's engineering standards — strict TypeScript, Turborepo orchestration and a 706-case Vitest and React Testing Library suite — and wrote the integration guide that onboards new teams.",
      "Shipped Smart Quick Order solo: an LLM-powered bulk-ordering flow that parses free-form input into validated SKUs, cutting order-entry effort by 40% and approved by the client to replace manual entry in their Spartacus storefront.",
      "Migrated the Electrolux B2B storefront to SAP Spartacus and Avantor's legacy ATG frontend to Angular, owning Quick Order end to end and improving PDP render performance by 25% through variant switching and an image normalizer that cut redundant API calls.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Turborepo", "Storybook", "SAP Spartacus", "Angular", "Vitest"],
  },

  {
    company: "Brane Enterprises",
    title: "SDE 1, Frontend",
    start: "Sep 2023",
    end: "Dec 2024",
    location: "Hyderabad",
    bullets: [
      "Migrated the platform to a micro-frontend architecture with Webpack Module Federation, reducing build and deployment times by 25%.",
      "Built features end to end for a low-code / no-code platform, extracting shared component patterns that consuming teams reused across modules.",
      "Implemented NgRx state management and RxJS-based API integration across platform modules, standardising async data flow and error handling.",
    ],
    tech: ["Angular", "NgRx", "RxJS", "Webpack Module Federation", "TypeScript"],
  },

  {
    company: "Keka HR",
    title: "Frontend Developer → SDE 1, Frontend",
    start: "Aug 2022",
    end: "Sep 2023",
    location: "Hyderabad",
    bullets: [
      "Built and shipped features across the Workforce, Timesheet and ATS modules of a B2B HRMS platform, owning them from development through deployment.",
      "Designed data-driven FusionCharts dashboards, GPT-powered job description generation, and a drag-and-drop Kanban board for the ATS hiring pipeline.",
      "Reviewed 30+ code submissions per sprint, mentoring junior engineers on review standards and frontend patterns.",
    ],
    tech: ["Angular", "TypeScript", "FusionCharts", "RxJS"],
  },
];

export const education = {
  school: "Chandigarh Group of Colleges, Chandigarh",
  degree: "B.Tech, Computer Science and Engineering",
  period: "2018 — 2022",
};
