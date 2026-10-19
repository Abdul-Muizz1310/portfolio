import { ContactClient } from "@/app/contact/contact-client";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Abdul-Muizz Anwar about AI agents, RAG systems, full-stack web development, job opportunities or consulting.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
