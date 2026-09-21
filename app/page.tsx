import { Section } from "@/components/primitives/section";
import { Capabilities, Principles } from "@/components/home/capabilities";
import { Contact, SiteFooter } from "@/components/home/contact";
import { ExperienceList } from "@/components/home/experience-list";
import { Hero } from "@/components/home/hero";
import { OwnershipTable } from "@/components/home/ownership";
import { FeaturedProject, ProjectCard } from "@/components/home/project-card";
import { featuredProjects, otherProjects } from "@/content/projects";

/**
 * Section order is the argument. See CLAUDE.md §A3.
 *
 * Frontend depth lands before breadth: depth is what makes him competitive
 * against other frontend candidates, breadth is what unlocks the scope he
 * wants. Reversed, he reads as a generalist and loses on both counts.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <main id="main">
        <Section id="work" label="Selected work">
          <div className="space-y-16">
            {featuredProjects.map((project, i) => (
              <FeaturedProject key={project.slug} project={project} index={i} />
            ))}
          </div>
        </Section>

        <Section id="ownership" label="How far I take a product">
          <OwnershipTable />
        </Section>

        <Section id="more" label="More work">
          <div className="grid gap-10 md:grid-cols-2">
            {otherProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>

        <Section id="experience" label="Experience">
          <ExperienceList />
        </Section>

        <Section id="capabilities" label="Capabilities">
          <Capabilities />
        </Section>

        <Section id="approach" label="How I work">
          <Principles />
        </Section>

        <Section id="contact" label="Contact">
          <Contact />
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
