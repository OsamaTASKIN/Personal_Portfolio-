"use client";
import Link from "next/link";
import type { Project } from "@/types/project";

export function ProjectCard({ project, onEnter, onLeave }: { project: Project; onEnter?: (project: Project) => void; onLeave?: () => void }) {
  return <Link href={`/work/${project.slug}`} className="project-row" onPointerEnter={() => onEnter?.(project)} onPointerLeave={onLeave}><span className="project-number">{project.number}</span><h3 className="project-title">{project.title}</h3><span className="project-category">{project.category}</span><span className="project-year">{project.year}</span></Link>;
}
