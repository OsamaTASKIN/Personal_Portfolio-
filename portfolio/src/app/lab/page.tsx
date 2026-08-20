import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { LabProjectGrid } from "@/components/three/LabProjectGrid";

export const metadata: Metadata = { title: "Lab", description: "WebGL, shader, AI, motion and interaction experiments by Osama Kolachi." };
export default function LabPage() { return <main className="page-shell"><header className="page-hero"><div className="page-kicker eyebrow"><span>Research / Play</span><span>Eight active curiosities</span></div><h1 className="display">Unfinished <span className="serif">ideas</span></h1></header><section className="pad" style={{ paddingBottom: "var(--section-space)" }}><LabProjectGrid /></section><Footer /></main>; }
