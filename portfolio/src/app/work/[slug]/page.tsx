import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { ProjectHero } from "@/components/work/ProjectHero";
import { ProjectDetails } from "@/components/work/ProjectDetails";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { PiporaCaseStudy } from "@/components/work/PiporaCaseStudy";
import { wrapIndex } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const project = getProject((await params).slug); return project ? { title: project.title, description: project.description } : {}; }

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug); if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug); const next = projects[wrapIndex(index + 1, projects.length)];
  const schema = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.description, creator: { "@type": "Person", name: "Osama Kolachi" }, dateCreated: project.year };
  return <main className="page-shell">{project.slug === "pipora" ? <PiporaCaseStudy project={project} /> : <><ProjectHero project={project} /><div className="project-cover"><Image src={project.heroImage} alt={`${project.title} art direction`} fill priority sizes="100vw" /></div><div className="project-meta pad"><p>{project.description}</p><p className="eyebrow">Role<br />{project.role}</p><p className="eyebrow">Services<br />{project.services.join(" / ")}</p></div><ProjectDetails project={project} /><ProjectGallery project={project} /></>}<Link className="next-project" href={`/work/${next.slug}`}><span className="eyebrow">Next project / {next.number}</span><strong>{next.title} →</strong></Link><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></main>;
}
