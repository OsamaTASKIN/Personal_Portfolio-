import Link from "next/link";
import { projects } from "@/data/projects";
export function ProjectIndex() { return <nav aria-label="Project index">{projects.map((project) => <Link key={project.slug} href={`/work/${project.slug}`}>{project.number} — {project.title}</Link>)}</nav>; }
