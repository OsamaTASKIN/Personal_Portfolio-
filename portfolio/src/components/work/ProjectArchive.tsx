"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import type { Project } from "@/types/project";

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const [preview, setPreview] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const positionPreview = (event: React.PointerEvent) => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, {
      x: event.clientX + 28,
      y: event.clientY - previewRef.current.offsetHeight / 2,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const showPreview = (event: React.PointerEvent, project: Project) => {
    if (project.slug !== "pipora" || event.pointerType === "touch") return;
    setPreview(project);
    if (previewRef.current) {
      gsap.set(previewRef.current, { x: event.clientX + 28, y: event.clientY - previewRef.current.offsetHeight / 2 });
    }
  };

  return (
    <section className="pad archive-list" aria-label="Projects" onPointerMove={positionPreview}>
      {projects.map((project) => (
        <Link
          className="archive-row"
          href={`/work/${project.slug}`}
          key={project.slug}
          onPointerEnter={(event) => showPreview(event, project)}
          onPointerLeave={() => project.slug === "pipora" && setPreview(null)}
        >
          <span className="eyebrow">{project.number}</span>
          <h2>{project.title}</h2>
          <p className="archive-description">{project.description}</p>
          <span className="eyebrow">{project.year} ↗</span>
        </Link>
      ))}
      <div ref={previewRef} className={`archive-hover-preview ${preview ? "is-visible" : ""}`} aria-hidden="true">
        {preview && <Image src={preview.thumbnail} alt="" fill priority sizes="clamp(18rem, 30vw, 34rem)" />}
      </div>
    </section>
  );
}
