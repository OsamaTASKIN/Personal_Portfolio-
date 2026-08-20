import Image from "next/image";
import type { Project } from "@/types/project";
export function ProjectGallery({ project }: { project: Project }) { return <section aria-label="Project gallery">{project.gallery.slice(1).map((image) => <div className="project-cover" key={image}><Image src={image} alt={`${project.title} interface detail`} fill sizes="100vw" /></div>)}</section>; }
