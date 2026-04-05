import { Hero } from "@/components/sections/hero";
import { UsesStack } from "@/components/sections/uses-stack";
import { SkillsShowcase } from "@/components/sections/skills-showcase";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HomeTerminal } from "@/components/sections/home-terminal";
import { HomeCta } from "@/components/sections/home-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsShowcase />
      <UsesStack />
      <FeaturedProjects />
      <HomeTerminal />
      <HomeCta />
    </>
  );
}
