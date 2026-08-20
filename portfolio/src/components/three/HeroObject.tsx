"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { monolithFragmentShader, monolithVertexShader } from "./ShaderMaterial";

export function HeroObject() {
  const mesh = useRef<THREE.Mesh>(null); const material = useRef<THREE.ShaderMaterial>(null); const { pointer } = useThree();
  useFrame((state, delta) => {
    if (!mesh.current || !material.current) return;
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uPointer.value.lerp(pointer, .045);
    mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, pointer.x * .25 + state.clock.elapsedTime * .035, 3, delta);
    mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, pointer.y * .12 - .16, 3, delta);
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * .5) * .08;
  });
  return <mesh ref={mesh} rotation={[0, -.55, -.12]} scale={[1.25, 2.35, .72]}><icosahedronGeometry args={[1, 7]} /><shaderMaterial ref={material} vertexShader={monolithVertexShader} fragmentShader={monolithFragmentShader} uniforms={{ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() } }} /></mesh>;
}
