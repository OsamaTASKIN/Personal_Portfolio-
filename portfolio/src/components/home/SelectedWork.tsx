import Link from "next/link";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SelectedWork() { return <section className="section selected-work"><div className="section-head"><SectionLabel number="02">Selected work</SectionLabel><Link className="eyebrow" href="/work">View archive ↗</Link></div><ProjectGrid /></section>; }
