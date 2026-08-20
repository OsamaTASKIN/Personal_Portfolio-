"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";

export function MagneticButton({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: React.PointerEvent<HTMLAnchorElement>) => { if (matchMedia("(pointer: coarse)").matches) return; const bounds = event.currentTarget.getBoundingClientRect(); gsap.to(ref.current, { x: (event.clientX - bounds.left - bounds.width / 2) * .24, y: (event.clientY - bounds.top - bounds.height / 2) * .24, duration: .4, ease: "power3.out" }); };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: .7, ease: "elastic.out(1,.4)" });
  return <Link ref={ref} href={href} className={className} onPointerMove={move} onPointerLeave={leave}>{children}</Link>;
}
