"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const curtain = useRef<HTMLDivElement>(null); const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeline = gsap.timeline();
    timeline.fromTo(curtain.current, { scaleY: 1, transformOrigin: "top" }, { scaleY: 0, duration: .78, ease: "power4.inOut" })
      .fromTo(content.current, { opacity: 0 }, { opacity: 1, duration: .35 }, "-=.35");
    return () => { timeline.kill(); };
  }, [pathname]);
  return <><div ref={curtain} className="route-curtain" aria-hidden="true" /><div ref={content}>{children}</div></>;
}
