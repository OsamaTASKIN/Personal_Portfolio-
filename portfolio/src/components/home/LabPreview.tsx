"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });

export function LabPreview() { return <section className="lab-preview"><div className="lab-canvas" aria-hidden="true"><ParticleField /></div><div className="lab-preview-copy"><p className="eyebrow">Live experiment / Pointer velocity</p><h2>Enter<br /><span className="serif">the</span> Lab</h2><Link href="/lab">Explore experiments →</Link></div></section>; }
