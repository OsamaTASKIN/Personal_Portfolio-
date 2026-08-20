import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Footer } from "@/components/layout/Footer";
import { ProjectArchive } from "@/components/work/ProjectArchive";

export const metadata: Metadata = { title: "Work", description: "Selected digital products, systems and creative-development projects by Osama Kolachi." };

export default function WorkPage() { return <main className="page-shell"><header className="page-hero"><div className="page-kicker eyebrow"><span>Project archive</span><span>2023—2026</span></div><h1 className="display">Selected <span className="serif">work</span></h1></header><ProjectArchive projects={projects} /><Footer /></main>; }
