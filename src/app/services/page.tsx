import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/sections/service-card";
import { SERVICES } from "@/lib/services";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <SectionHeader command="$ cat services.md" />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="font-mono text-lg text-foreground-muted">
          $ get-quote --project &quot;your idea&quot;
        </p>
        <Link
          href="/contact"
          className="gradient-bg mt-4 inline-block rounded-full px-8 py-3 font-medium text-white transition-shadow hover:shadow-glow-lg"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
