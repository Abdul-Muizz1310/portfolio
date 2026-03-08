"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 3;
const REPEL_RADIUS = 2.5;
const REPEL_STRENGTH = 0.03;
const RETURN_STRENGTH = 0.01;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { pointer, viewport } = useThree();

  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const origPos = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 30; // -15 to 15
      const y = (Math.random() - 0.5) * 20; // -10 to 10
      const z = (Math.random() - 0.5) * 10; // -5 to 5

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
    }

    return { positions: pos, originalPositions: origPos };
  }, []);

  const linePositions = useMemo(() => {
    // Max possible line segments: each pair of particles
    const maxLines = PARTICLE_COUNT * (PARTICLE_COUNT - 1) / 2;
    return new Float32Array(maxLines * 6); // 2 vertices * 3 coords per line
  }, []);

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    // Convert pointer to world coordinates
    const mouseX = pointer.x * (viewport.width / 2);
    const mouseY = pointer.y * (viewport.height / 2);

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // Update particle positions with mouse repulsion and return force
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const dx = posArray[ix] - mouseX;
      const dy = posArray[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repel from mouse
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const force = (REPEL_RADIUS - dist) * REPEL_STRENGTH;
        posArray[ix] += (dx / dist) * force;
        posArray[iy] += (dy / dist) * force;
      }

      // Return to original position
      posArray[ix] += (originalPositions[ix] - posArray[ix]) * RETURN_STRENGTH;
      posArray[iy] += (originalPositions[iy] - posArray[iy]) * RETURN_STRENGTH;
      posArray[iz] += (originalPositions[iz] - posArray[iz]) * RETURN_STRENGTH;
    }

    posAttr.needsUpdate = true;

    // Update connecting lines
    const lineAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineArray = lineAttr.array as Float32Array;
    let lineIndex = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const ix = i * 3;
        const jx = j * 3;

        const dx = posArray[ix] - posArray[jx];
        const dy = posArray[ix + 1] - posArray[jx + 1];
        const dz = posArray[ix + 2] - posArray[jx + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          lineArray[lineIndex * 6] = posArray[ix];
          lineArray[lineIndex * 6 + 1] = posArray[ix + 1];
          lineArray[lineIndex * 6 + 2] = posArray[ix + 2];
          lineArray[lineIndex * 6 + 3] = posArray[jx];
          lineArray[lineIndex * 6 + 4] = posArray[jx + 1];
          lineArray[lineIndex * 6 + 5] = posArray[jx + 2];
          lineIndex++;
        }
      }
    }

    lineAttr.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
  });

  return (
    <>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          color="#22D3EE"
          size={2.5}
          sizeAttenuation={false}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          color="#1E1E2E"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export function ParticleField({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
