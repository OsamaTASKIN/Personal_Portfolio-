"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AnimatedHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => { gsap.registerPlugin(ScrollTrigger); const animation = gsap.from(ref.current, { y: 80, opacity: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }); return () => { animation.kill(); }; }, []);
  return <h2 ref={ref} className={className}>{children}</h2>;
}
