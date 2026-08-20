"use client";
import { useEffect, useRef } from "react";

export function useMouse() {
  const mouse = useRef({ x: 0, y: 0, velocityX: 0, velocityY: 0 });
  useEffect(() => {
    let previousX = window.innerWidth / 2; let previousY = window.innerHeight / 2;
    const onMove = (event: PointerEvent) => { mouse.current = { x: event.clientX, y: event.clientY, velocityX: event.clientX - previousX, velocityY: event.clientY - previousY }; previousX = event.clientX; previousY = event.clientY; };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return mouse;
}
