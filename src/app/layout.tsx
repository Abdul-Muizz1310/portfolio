import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { StatusBar } from "@/components/status-bar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Abdul-Muizz — Software Engineer",
  description:
    "Software Engineer specializing in AI/ML, Full-Stack Development, and Python Automation. Based in Islamabad, Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:p-2 focus:bg-surface focus:text-foreground focus:rounded-md"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="min-h-screen pt-16 pb-7">
          {children}
        </main>
        <StatusBar />
      </body>
    </html>
  );
}
