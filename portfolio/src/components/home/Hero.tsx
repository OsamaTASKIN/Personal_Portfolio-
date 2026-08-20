"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig, withBasePath } from "@/lib/constants";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".hero-name", { yPercent: 110, duration: 1.2, stagger: .1, ease: "power4.out", delay: .12 });
      gsap.from(".hero-meta > *", { opacity: 0, y: 18, duration: .7, stagger: .07, delay: .65 });
      gsap.to(".hero-type", { yPercent: -20, opacity: .12, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => context.revert();
  }, []);

  return <section ref={root} className="hero" aria-labelledby="hero-title">
    <div className="hero-type"><h1 id="hero-title"><span className="hero-line"><span className="hero-name">OSAMA</span></span><span className="hero-line"><span className="hero-name">KOLACHI</span></span></h1></div>
    <div className="hero-visual">
      <Image className="hero-portrait" src={withBasePath("/images/portraits/osama-cutout.webp")} alt="Osama Kolachi" width={1240} height={1269} priority sizes="(max-width: 800px) 88vw, 48vw" />
    </div>
    <div className="hero-meta"><p>{siteConfig.location}<br />Available for selected projects</p><p>Creative Developer<br />Systems × AI × Digital Experiences</p><p className="hero-scroll">Scroll</p></div>
  </section>;
}
