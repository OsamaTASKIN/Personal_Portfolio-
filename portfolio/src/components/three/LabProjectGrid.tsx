"use client";

import type { CSSProperties, PointerEvent } from "react";
import Link from "next/link";
import { experiments } from "@/data/experiments";
import type { Experiment } from "@/types/project";

type LabStyle = CSSProperties & {
  "--card-color": string;
  "--pointer-x": string;
  "--pointer-y": string;
};

export function ExperimentVisual({ experiment }: { experiment: Experiment }) {
  return <div className={`experiment-visual visual-${experiment.visual}`} aria-hidden="true">
    {experiment.visual === "orbit" && <><i /><i /><i /></>}
    {experiment.visual === "grid" && Array.from({ length: 25 }, (_, index) => <i key={index} />)}
    {experiment.visual === "wave" && Array.from({ length: 14 }, (_, index) => <i key={index} />)}
    {experiment.visual === "type" && <><b>S</b><b>O</b><b>F</b><b>T</b></>}
    {experiment.visual === "cursor" && Array.from({ length: 9 }, (_, index) => <i key={index} />)}
    {experiment.visual === "stack" && Array.from({ length: 7 }, (_, index) => <i key={index} />)}
    {experiment.visual === "bloom" && <><b>A</b><i /><i /><i /></>}
    {experiment.visual === "scan" && <><i /><i /><span /></>}
  </div>;
}

function LabProject({ experiment }: { experiment: Experiment }) {
  const move = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };

  const style: LabStyle = { "--card-color": experiment.color, "--pointer-x": "50%", "--pointer-y": "50%" };

  return <Link href={`/lab/${experiment.slug}`} className="experiment-card" style={style} onPointerMove={move} aria-label={`Open ${experiment.title} experiment`}>
    <div className="experiment-top eyebrow"><span>{experiment.number}</span><span>{experiment.field}</span></div>
    <ExperimentVisual experiment={experiment} />
    <div className="experiment-copy">
      <p className="experiment-status"><i /> {experiment.status}</p>
      <h2>{experiment.title}</h2>
      <p>{experiment.description}</p>
    </div>
    <span className="experiment-open eyebrow">Open experiment ↗</span>
  </Link>;
}

export function LabProjectGrid() {
  return <div className="experiment-grid">{experiments.map((experiment) => <LabProject experiment={experiment} key={experiment.number} />)}</div>;
}
