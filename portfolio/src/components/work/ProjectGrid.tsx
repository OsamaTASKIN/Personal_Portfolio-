"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { useInteractionStore } from "@/store/interactionStore";

export function ProjectGrid() {
  const [active, setActive] = useState<Project | null>(null); const preview = useRef<HTMLDivElement>(null); const setCursor = useInteractionStore((state) => state.setCursor);
  const move = (event: React.PointerEvent) => { if (!preview.current) return; gsap.to(preview.current, { x: event.clientX, y: event.clientY, duration: .65, ease: "power3.out" }); };
  return <div className="project-list" onPointerMove={move}>{projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.slug} project={project} onEnter={(item) => { setActive(item); setCursor("view", "View"); }} onLeave={() => { setActive(null); setCursor("default"); }} />)}<div ref={preview} className={`floating-preview ${active ? "visible" : ""}`} aria-hidden="true">{active && <Image key={active.thumbnail} src={active.thumbnail} alt="" fill sizes="27vw" />}</div></div>;
}
