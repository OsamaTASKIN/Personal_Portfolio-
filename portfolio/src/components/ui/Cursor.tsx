"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInteractionStore } from "@/store/interactionStore";

export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null); const { cursorMode, cursorLabel, setCursor } = useInteractionStore();
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const x = gsap.quickTo(cursor.current, "x", { duration: .35, ease: "power3.out" }); const y = gsap.quickTo(cursor.current, "y", { duration: .35, ease: "power3.out" });
    const move = (event: PointerEvent) => { x(event.clientX); y(event.clientY); };
    const over = (event: MouseEvent) => { const target = event.target as HTMLElement; if (target.closest("a, button")) setCursor("link"); };
    const out = (event: MouseEvent) => { const target = event.target as HTMLElement; if (target.closest("a, button")) setCursor("default"); };
    window.addEventListener("pointermove", move); document.addEventListener("mouseover", over); document.addEventListener("mouseout", out);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, [setCursor]);
  return <div ref={cursor} className={`cursor cursor-${cursorMode}`} aria-hidden="true"><span>{cursorMode === "view" ? cursorLabel || "View" : ""}</span></div>;
}
