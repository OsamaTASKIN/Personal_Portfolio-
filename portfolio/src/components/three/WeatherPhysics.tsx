"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type Weather = "sunny" | "rain";
type Drop = { x: number; y: number; vx: number; vy: number; length: number };
type Splash = { x: number; y: number; vx: number; vy: number; life: number };
type Domino = { x: number; angle: number; velocity: number };

const DROP_COUNT = 240;
const DOMINO_COUNT = 18;

export function WeatherPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const weatherRef = useRef<Weather>("sunny");
  const gravityRef = useRef(true);
  const forceRef = useRef(1.25);
  const dominoTrigger = useRef(0);
  const [weather, setWeather] = useState<Weather>("sunny");
  const [gravity, setGravity] = useState(true);
  const [force, setForce] = useState(1.25);

  const changeWeather = (next: Weather) => { weatherRef.current = next; setWeather(next); };
  const changeGravity = () => { gravityRef.current = !gravityRef.current; setGravity(gravityRef.current); };
  const changeForce = (value: number) => { forceRef.current = value; setForce(value); };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const drops: Drop[] = [];
    const splashes: Splash[] = [];
    const dominoes: Domino[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = performance.now();
    let observedTrigger = dominoTrigger.current;

    const makeDrop = (drop?: Drop) => {
      const target = drop ?? { x: 0, y: 0, vx: 0, vy: 0, length: 0 };
      target.x = Math.random() * width;
      target.y = -Math.random() * height;
      target.vx = 35 + Math.random() * 22;
      target.vy = 430 + Math.random() * 260;
      target.length = 10 + Math.random() * 18;
      if (!drop) drops.push(target);
    };

    const layoutDominoes = () => {
      dominoes.length = 0;
      const gap = Math.min(44, (width - 64) / DOMINO_COUNT);
      const start = (width - gap * (DOMINO_COUNT - 1)) / 2;
      for (let index = 0; index < DOMINO_COUNT; index++) dominoes.push({ x: start + index * gap, angle: 0, velocity: 0 });
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      while (drops.length < DROP_COUNT) makeDrop();
      layoutDominoes();
    };

    const drawSunny = (time: number) => {
      const sun = { x: width * .76, y: height * .22 };
      const radius = Math.min(width, height) * .07;
      const rayCount = width < 700 ? 42 : 76;
      const cursorRadius = 48 + forceRef.current * 12;
      context.save();
      context.globalCompositeOperation = "screen";
      for (let index = 0; index < rayCount; index++) {
        const angle = (index / rayCount) * Math.PI * 2 + time * .000018;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const maxLength = Math.hypot(width, height);
        let rayLength = maxLength;
        if (pointer.current.active) {
          const relativeX = pointer.current.x - sun.x;
          const relativeY = pointer.current.y - sun.y;
          const projection = relativeX * dx + relativeY * dy;
          const perpendicularSquared = relativeX * relativeX + relativeY * relativeY - projection * projection;
          if (projection > radius && perpendicularSquared < cursorRadius * cursorRadius) {
            rayLength = Math.max(radius, projection - Math.sqrt(cursorRadius * cursorRadius - perpendicularSquared));
          }
        }
        const gradient = context.createLinearGradient(sun.x, sun.y, sun.x + dx * rayLength, sun.y + dy * rayLength);
        gradient.addColorStop(0, "rgba(255,225,89,.55)");
        gradient.addColorStop(1, "rgba(255,225,89,0)");
        context.strokeStyle = gradient;
        context.lineWidth = index % 5 === 0 ? 2.2 : .75;
        context.beginPath();
        context.moveTo(sun.x + dx * radius, sun.y + dy * radius);
        context.lineTo(sun.x + dx * rayLength, sun.y + dy * rayLength);
        context.stroke();
      }
      const glow = context.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, radius * 3.2);
      glow.addColorStop(0, "rgba(255,247,188,1)");
      glow.addColorStop(.24, "rgba(255,216,77,.95)");
      glow.addColorStop(1, "rgba(255,216,77,0)");
      context.fillStyle = glow;
      context.beginPath(); context.arc(sun.x, sun.y, radius * 3.2, 0, Math.PI * 2); context.fill();
      context.restore();

      if (pointer.current.active) {
        context.strokeStyle = "rgba(17,17,17,.48)";
        context.setLineDash([3, 5]);
        context.beginPath(); context.arc(pointer.current.x, pointer.current.y, cursorRadius, 0, Math.PI * 2); context.stroke();
        context.setLineDash([]);
      }
    };

    const createSplash = (x: number, y: number, impact: number) => {
      for (let index = 0; index < 3; index++) splashes.push({ x, y, vx: (Math.random() - .5) * impact * .22, vy: -Math.random() * impact * .16, life: 1 });
      if (splashes.length > 320) splashes.splice(0, splashes.length - 320);
    };

    const drawRain = (delta: number) => {
      context.lineCap = "round";
      for (const drop of drops) {
        if (gravityRef.current) drop.vy += 260 * delta;
        const dx = drop.x - pointer.current.x;
        const dy = drop.y - pointer.current.y;
        const distance = Math.hypot(dx, dy);
        if (pointer.current.active && distance < 95) {
          const strength = (1 - distance / 95) * forceRef.current;
          const normalX = dx / Math.max(distance, 1);
          const normalY = dy / Math.max(distance, 1);
          drop.vx += normalX * strength * 1300 * delta;
          drop.vy = Math.min(drop.vy, 100) + normalY * strength * 900 * delta;
          if (distance < 58 && drop.vy > 0) { drop.vy *= -.38; createSplash(drop.x, drop.y, Math.abs(drop.vy)); }
        }
        drop.x += drop.vx * delta;
        drop.y += drop.vy * delta;
        drop.vx *= .997;
        if (drop.y > height - 43 || drop.x > width + 40 || drop.x < -40) { if (drop.y > height - 50) createSplash(drop.x, height - 42, drop.vy); makeDrop(drop); }
        const speed = Math.hypot(drop.vx, drop.vy);
        context.strokeStyle = `rgba(115,165,225,${Math.min(.72, .2 + speed / 1200)})`;
        context.lineWidth = 1.15;
        context.beginPath(); context.moveTo(drop.x, drop.y); context.lineTo(drop.x - (drop.vx / speed) * drop.length, drop.y - (drop.vy / speed) * drop.length); context.stroke();
      }
      for (let index = splashes.length - 1; index >= 0; index--) {
        const splash = splashes[index]; splash.vy += 700 * delta; splash.x += splash.vx * delta; splash.y += splash.vy * delta; splash.life -= delta * 1.8;
        context.fillStyle = `rgba(130,185,240,${Math.max(0, splash.life)})`; context.beginPath(); context.arc(splash.x, splash.y, 1.7, 0, Math.PI * 2); context.fill();
        if (splash.life <= 0) splashes.splice(index, 1);
      }
      if (pointer.current.active) {
        context.strokeStyle = "rgba(105,155,220,.7)"; context.lineWidth = 1;
        context.beginPath(); context.arc(pointer.current.x, pointer.current.y, 58, Math.PI, Math.PI * 2); context.stroke();
      }
    };

    const drawDominoes = (delta: number) => {
      if (observedTrigger !== dominoTrigger.current) { observedTrigger = dominoTrigger.current; dominoes.forEach((domino) => { domino.angle = 0; domino.velocity = 0; }); dominoes[0].velocity = 2.8 * forceRef.current; }
      const floor = height - 42;
      for (let index = 0; index < dominoes.length; index++) {
        const domino = dominoes[index];
        if (pointer.current.active && Math.abs(pointer.current.x - domino.x) < 24 && Math.abs(pointer.current.y - (floor - 28)) < 75) domino.velocity += (pointer.current.x >= domino.x ? 1 : -1) * forceRef.current * delta * 4;
        if (Math.abs(domino.angle) > .02 && Math.abs(domino.angle) < 1.38) {
          domino.velocity += Math.sin(domino.angle) * (gravityRef.current ? 5.8 : 1.3) * delta;
          domino.angle += domino.velocity * delta;
        }
        domino.angle = Math.max(-1.38, Math.min(1.38, domino.angle));
        if (domino.angle > .55 && index < dominoes.length - 1 && dominoes[index + 1].angle === 0) dominoes[index + 1].velocity = 2.15 * forceRef.current;
        context.save(); context.translate(domino.x, floor); context.rotate(domino.angle);
        context.fillStyle = index % 3 === 0 ? "#ffd84d" : "#111111"; context.fillRect(-5, -56, 10, 56); context.restore();
      }
      context.strokeStyle = "rgba(17,17,17,.35)"; context.beginPath(); context.moveTo(0, floor); context.lineTo(width, floor); context.stroke();
    };

    const animate = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, .032); previousTime = time;
      context.clearRect(0, 0, width, height);
      context.fillStyle = weatherRef.current === "sunny" ? "#f3edd9" : "#121923"; context.fillRect(0, 0, width, height);
      if (weatherRef.current === "sunny") drawSunny(time); else drawRain(delta);
      drawDominoes(delta);
      frame = requestAnimationFrame(animate);
    };

    resize(); window.addEventListener("resize", resize); frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  const movePointer = (event: PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: true };
  };

  return <section className={`weather-physics weather-${weather}`}>
    <div className="weather-controls" aria-label="Weather physics controls">
      <div className="weather-segmented"><button className={weather === "sunny" ? "active" : ""} onClick={() => changeWeather("sunny")}>Sunny</button><button className={weather === "rain" ? "active" : ""} onClick={() => changeWeather("rain")}>Rain</button></div>
      <button className={`weather-control ${gravity ? "active" : ""}`} onClick={changeGravity}>Gravity {gravity ? "On" : "Off"}</button>
      <label className="force-control"><span>Force {force.toFixed(1)}</span><input aria-label="Pointer force" type="range" min="0.5" max="2.5" step="0.1" value={force} onChange={(event) => changeForce(Number(event.target.value))} /></label>
      <button className="weather-control domino-button" onClick={() => { dominoTrigger.current += 1; }}>Trigger domino →</button>
    </div>
    <canvas ref={canvasRef} onPointerMove={movePointer} onPointerEnter={movePointer} onPointerLeave={() => { pointer.current.active = false; }} aria-label="Interactive weather physics simulation" />
    <p className="weather-hint eyebrow">{weather === "sunny" ? "Move between the sun and its rays to cast a shadow" : "Hover through the rain to reflect and redirect each drop"}</p>
  </section>;
}
