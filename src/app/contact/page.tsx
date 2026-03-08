import type { Metadata } from "next";
import { ContactClient } from "@/app/contact/contact-client";

export const metadata: Metadata = {
  title: "Contact — Abdul-Muizz",
  description:
    "Get in touch with Abdul-Muizz for AI/ML solutions, web development, or consulting.",
};

export default function ContactPage() {
  return <ContactClient />;
}
