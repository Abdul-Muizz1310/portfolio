import Link from "next/link";

export function HomeCta() {
  return (
    <section className="text-center py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <p className="font-mono text-foreground-muted text-lg">
          $ ping abdul-muizz --message &quot;let&apos;s work together&quot;
        </p>
        <Link
          href="/contact"
          className="gradient-bg text-white font-medium px-8 py-3 rounded-full hover:shadow-glow-lg transition-shadow mt-4 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
