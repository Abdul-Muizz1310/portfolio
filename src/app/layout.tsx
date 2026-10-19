import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { StatusBar } from "@/components/status-bar";
import { CustomCursor } from "@/components/custom-cursor";
import { KonamiTerminal } from "@/components/konami-terminal";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ParticleBackground } from "@/components/three/particle-background";
import { SITE_CONFIG } from "@/lib/constants";
import { PERSONAL_INFO } from "@/lib/resume-data";
import { OPEN_GRAPH_DEFAULTS, SITE_KEYWORDS, TITLE_TEMPLATE } from "@/lib/seo";
import "@/lib/boneyard";
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

// Canonical URLs are set per page (see pageMetadata in @/lib/seo) — a canonical
// here would be inherited by every route that forgot to set its own.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: TITLE_TEMPLATE,
  },
  description: SITE_CONFIG.description,
  applicationName: PERSONAL_INFO.name,
  keywords: SITE_KEYWORDS,
  authors: [{ name: PERSONAL_INFO.name, url: SITE_CONFIG.url }],
  creator: PERSONAL_INFO.name,
  publisher: PERSONAL_INFO.name,
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    title: SITE_CONFIG.name,
    statusBarStyle: "black-translucent",
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:p-2 focus:bg-surface focus:text-foreground focus:rounded-md"
        >
          Skip to content
        </a>
        {/* Site-wide animated particle background — client-only to avoid SSR style mismatch */}
        <ParticleBackground />
        <CustomCursor />
        <KonamiTerminal />
        <Navigation />
        <main id="main-content" className="min-h-screen pt-16 pb-7">
          {children}
        </main>
        <StatusBar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
