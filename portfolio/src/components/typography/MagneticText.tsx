"use client";
import { useRef } from "react";
import gsap from "gsap";

export function MagneticText({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  return <span ref={ref} onPointerMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); gsap.to(ref.current, { x: (event.clientX - box.left - box.width / 2) * .08, duration: .3 }); }} onPointerLeave={() => gsap.to(ref.current, { x: 0, duration: .5 })}>{children}</span>;
}
