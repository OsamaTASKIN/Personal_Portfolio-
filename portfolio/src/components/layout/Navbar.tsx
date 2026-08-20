"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { navItems, siteConfig, withBasePath } from "@/lib/constants";
import { useInteractionStore } from "@/store/interactionStore";

export function Navbar() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useInteractionStore();
  useEffect(() => { setMenuOpen(false); }, [pathname, setMenuOpen]);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  return <><header className={`site-nav ${menuOpen ? "menu-open" : ""}`}><Link className="brand" href="/" aria-label={`${siteConfig.name} — Home`}><Image className="brand-logo" src={withBasePath("/images/portraits/logo.ico")} alt="" width={48} height={48} unoptimized /></Link><nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <Link key={item.href} className="nav-link" href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu"><span>{menuOpen ? "Close" : "Menu"}</span><span className="menu-icon" aria-hidden="true"><i /><i /></span></button></header><nav id="mobile-menu" className={`menu-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}><div className="menu-links">{navItems.map((item, index) => <Link key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1}><span>0{index + 1}</span>{item.label}</Link>)}</div><div className="menu-meta"><span>{siteConfig.location}</span><span>© {new Date().getFullYear()}</span></div></nav></>;
}
