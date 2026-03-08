import { Hero } from "@/components/sections/hero";
import { UsesStack } from "@/components/sections/uses-stack";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Testimonials } from "@/components/sections/testimonials";
import { HomeCta } from "@/components/sections/home-cta";
import { PageTransition } from "@/components/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <UsesStack />
      <FeaturedProjects />
      <Testimonials />
      <HomeCta />
    </PageTransition>
  );
}
