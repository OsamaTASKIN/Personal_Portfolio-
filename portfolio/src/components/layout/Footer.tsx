import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-heading">
      <div className="footer-kicker"><span>Have a project in mind?</span><span className="footer-status"><i aria-hidden="true" />Available for selected work</span></div>
      <Link className="footer-cta" href="/contact"><span>Let&apos;s work</span><span><em>together.</em><b aria-hidden="true">↗</b></span></Link>
    </div>
    <div className="footer-directory">
      <div className="footer-contact"><span className="eyebrow">Start a conversation</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}<span aria-hidden="true">↗</span></a></div>
      <nav className="footer-nav" aria-label="Footer navigation"><span className="eyebrow">Explore</span><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/lab">Lab</Link><Link href="/contact">Contact</Link></nav>
      <div className="footer-socials"><span className="eyebrow">Follow</span><Link href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</Link></div>
    </div>
    <div className="footer-base"><strong>{siteConfig.shortName}</strong><span>{siteConfig.location}</span><span>© {new Date().getFullYear()} / All rights reserved</span></div>
  </footer>;
}
