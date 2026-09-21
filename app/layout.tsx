import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import EmergencyBanner from "@/components/EmergencyBanner";
import { SanityLive } from "@/sanity/lib/live";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Mt. Zion Missionary Baptist Church",
  description: "Bold. Contemporary. Welcoming.",
  metadataBase: new URL("https://www.mzmbchurch.org"),
  openGraph: {
    title: "Mt. Zion Missionary Baptist Church",
    description: "Bold. Contemporary. Welcoming.",
    url: "https://www.mzmbchurch.org",
    siteName: "Mt. Zion MBC",
    images: [{ url: "/assets/hero.jpg" }],
  },
  icons: { icon: "/assets/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <EmergencyBanner />
        <SanityLive />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <Breadcrumbs />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
