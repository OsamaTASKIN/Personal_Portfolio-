import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/constants";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/ui/Cursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url), title: { default: siteConfig.title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description, alternates: { canonical: "/" },
  openGraph: { title: siteConfig.title, description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, type: "website" },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Person", name: siteConfig.name, url: siteConfig.url, email: `mailto:${siteConfig.email}`, sameAs: [siteConfig.socials.linkedin], jobTitle: "Creative Developer", address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" } };
  return <html lang="en"><body suppressHydrationWarning><SmoothScroll><Navbar /><ScrollIndicator /><PageTransition>{children}</PageTransition><Cursor /><div className="grain" aria-hidden="true" /></SmoothScroll><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
