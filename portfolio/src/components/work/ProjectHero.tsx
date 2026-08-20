import type { Project } from "@/types/project";
export function ProjectHero({ project }: { project: Project }) { return <header className="page-hero"><div className="page-kicker eyebrow"><span>Case study / {project.number}</span><span>{project.year}</span></div><h1 className="display-medium">{project.title}</h1></header>; }
