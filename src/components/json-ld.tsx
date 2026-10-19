import type { JsonLdDocument } from "@/lib/seo";

interface JsonLdProps {
  data: JsonLdDocument;
}

/**
 * Renders schema.org structured data. `<` is escaped so content pulled from
 * external sources (e.g. GitHub descriptions) can't close the script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
