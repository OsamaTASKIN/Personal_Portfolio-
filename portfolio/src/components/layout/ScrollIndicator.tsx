"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollIndicator() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
        setShowTop(window.scrollY > Math.min(window.innerHeight * .65, 560));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return <>
    <div className="scroll-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
    <button className={`back-to-top ${showTop ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
      <span aria-hidden="true">↑</span>
    </button>
  </>;
}
