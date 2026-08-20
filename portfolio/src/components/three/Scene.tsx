"use client";
import { Canvas } from "@react-three/fiber";
import { HeroObject } from "./HeroObject";

export default function Scene() {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.4], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}><HeroObject /></Canvas>;
}
