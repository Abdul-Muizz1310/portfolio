import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Scraper Lab — Abdul-Muizz",
  description:
    "Animated web scraping pipeline visualization showing URL targeting, HTTP requests, HTML parsing, and structured data extraction.",
};

export default function ScraperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
