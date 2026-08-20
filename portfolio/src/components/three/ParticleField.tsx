"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { particleFragmentShader, particleVertexShader } from "./ShaderMaterial";

function makePositions() {
  const data = new Float32Array(1800 * 3); let seed = 48271;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let i = 0; i < 1800; i++) { data[i * 3] = (random() - .5) * 9; data[i * 3 + 1] = (random() - .5) * 5; data[i * 3 + 2] = (random() - .5) * 2; }
  return data;
}

const fieldPositions = makePositions();

function Field() {
  const points = useRef<THREE.Points>(null); const material = useRef<THREE.ShaderMaterial>(null); const { pointer } = useThree();
  const previous = useRef(new THREE.Vector2());
  useFrame((state) => { if (!material.current) return; material.current.uniforms.uTime.value = state.clock.elapsedTime; const velocity = previous.current.distanceTo(pointer); material.current.uniforms.uVelocity.value = THREE.MathUtils.lerp(material.current.uniforms.uVelocity.value, velocity * 18, .09); material.current.uniforms.uPointer.value.lerp(pointer, .08); previous.current.copy(pointer); if (points.current) points.current.rotation.z = Math.sin(state.clock.elapsedTime * .08) * .05; });
  return <points ref={points}><bufferGeometry><bufferAttribute attach="attributes-position" args={[fieldPositions, 3]} /></bufferGeometry><shaderMaterial ref={material} transparent depthWrite={false} blending={THREE.AdditiveBlending} vertexShader={particleVertexShader} fragmentShader={particleFragmentShader} uniforms={{ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() }, uVelocity: { value: 0 } }} /></points>;
}

export default function ParticleField() { return <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: false }}><Field /></Canvas>; }
