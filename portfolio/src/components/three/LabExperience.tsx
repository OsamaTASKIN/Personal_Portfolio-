"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import type { Experiment } from "@/types/project";
import { ExperimentVisual } from "./LabProjectGrid";
import { WeatherPhysics } from "./WeatherPhysics";

type ExperienceStyle = CSSProperties & {
  "--card-color": string;
  "--pointer-x": string;
  "--pointer-y": string;
  "--shift-x": string;
  "--shift-y": string;
  "--energy": number;
};

export function LabExperience({ experiment }: { experiment: Experiment }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [energy, setEnergy] = useState(0);

  const move = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  };

  const style: ExperienceStyle = {
    "--card-color": experiment.color,
    "--pointer-x": `${position.x}%`,
    "--pointer-y": `${position.y}%`,
    "--shift-x": `${(position.x - 50) * .22}px`,
    "--shift-y": `${(position.y - 50) * .22}px`,
    "--energy": energy,
  };

  if (experiment.slug === "weather-physics") return <WeatherPhysics />;

  return <section
    className={`experience-stage experience-${experiment.visual} ${energy % 2 ? "is-energized" : ""}`}
    style={style}
    onPointerMove={move}
    onPointerDown={() => setEnergy((value) => value + 1)}
    aria-label={`Interactive animation: ${experiment.title}`}
  >
    <div className="experience-glow" aria-hidden="true" />
    <ExperimentVisual experiment={experiment} />
    <div className="experience-coordinates eyebrow" aria-hidden="true">
      <span>X {position.x.toFixed(0).padStart(2, "0")}</span>
      <span>Y {position.y.toFixed(0).padStart(2, "0")}</span>
    </div>
    <p className="experience-instruction eyebrow">{experiment.interaction}</p>
  </section>;
}
