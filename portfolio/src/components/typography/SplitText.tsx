"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SplitText({ lines, className = "" }: { lines: string[]; className?: string }) {
  const root = useRef<HTMLParagraphElement>(null);
  useEffect(() => { gsap.registerPlugin(ScrollTrigger); const context = gsap.context(() => { gsap.from(".split-inner", { yPercent: 110, duration: 1, stagger: .09, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 80%" } }); }, root); return () => context.revert(); }, []);
  return <p ref={root} className={className}>{lines.map((line) => <span className="split-line" key={line}><span className="split-inner" style={{ display: "block" }}>{line}</span></span>)}</p>;
}
