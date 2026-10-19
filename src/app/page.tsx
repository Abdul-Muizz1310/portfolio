import { Hero } from "@/components/sections/hero";
import { UsesStack } from "@/components/sections/uses-stack";
import { SkillsShowcase } from "@/components/sections/skills-showcase";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HomeTerminal } from "@/components/sections/home-terminal";
import { HomeCta } from "@/components/sections/home-cta";
import { JsonLd } from "@/components/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { homeJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description: SITE_CONFIG.description,
  path: "/",
  defaultImage: false,
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <SkillsShowcase />
      <UsesStack />
      <FeaturedProjects />
      <HomeTerminal />
      <HomeCta />
    </>
  );
}
