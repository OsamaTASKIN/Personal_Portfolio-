"use client";
import { useEffect, useState } from "react";

export function useViewport() {
  const [viewport, setViewport] = useState({ width: 0, height: 0, isTouch: false });
  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight, isTouch: window.matchMedia("(pointer: coarse)").matches });
    update(); window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return viewport;
}
