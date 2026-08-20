import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Start a project or conversation with creative developer Osama Kolachi." };
export default function ContactPage() { return <main className="contact-page">
  <header className="contact-intro">
    <div><p className="eyebrow">Contact / Available for selected projects</p><h1 className="display-medium">Let&apos;s make<br /><span className="serif">something matter.</span></h1></div>
    <p className="contact-lede">Have a product, website, CRM, or AI idea in mind? Share the rough version. We can shape the rest together.</p>
  </header>
  <div className="contact-layout">
    <aside className="contact-details">
      <p className="eyebrow">Direct contact</p>
      <a className="contact-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email} <span>↗</span></a>
      <div className="contact-availability"><i aria-hidden="true" /><span>Currently available<br />for selected projects</span></div>
    </aside>
    <ContactForm />
  </div>
  <div className="menu-meta contact-meta"><span>{siteConfig.location}</span><span><Link href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</Link></span></div>
</main>; }
