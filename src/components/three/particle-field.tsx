"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 200;
const CONNECTION_DISTANCE = 3.5;
const REPEL_RADIUS = 4;
const REPEL_STRENGTH = 0.06;
const RETURN_STRENGTH = 0.008;
const DRIFT_SPEED = 0.0003;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { pointer, viewport } = useThree();
  const timeRef = useRef(0);

  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const origPos = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      /* eslint-disable react-hooks/purity -- Intentional: one-time random initialization for particle positions */
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 12;
      /* eslint-enable react-hooks/purity */

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
    }

    return { positions: pos, originalPositions: origPos };
  }, []);

  const velocitiesRef = useRef(new Float32Array(PARTICLE_COUNT * 3));

  const { colors } = useMemo(() => {
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    const cyan = new THREE.Color("#22D3EE");
    const blue = new THREE.Color("#3B82F6");
    const purple = new THREE.Color("#8B5CF6");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      /* eslint-disable react-hooks/purity -- Intentional: one-time random initialization */
      const t = Math.random();
      /* eslint-enable react-hooks/purity */
      const color = t < 0.33
        ? cyan.clone().lerp(blue, t * 3)
        : t < 0.66
          ? blue.clone().lerp(purple, (t - 0.33) * 3)
          : purple.clone().lerp(cyan, (t - 0.66) * 3);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return { colors: cols };
  }, []);

  const linePositions = useMemo(() => {
    const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    return new Float32Array(maxLines * 6);
  }, []);

  const lineColors = useMemo(() => {
    const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    return new Float32Array(maxLines * 6);
  }, []);

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    return geo;
  }, [linePositions, lineColors]);

  useEffect(() => {
    return () => {
      pointsGeometry.dispose();
      linesGeometry.dispose();
    };
  }, [pointsGeometry, linesGeometry]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    timeRef.current += 1;

    const mouseX = pointer.x * (viewport.width / 2);
    const mouseY = pointer.y * (viewport.height / 2);

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Ambient drift — subtle organic movement
      const driftX =
        Math.sin(timeRef.current * DRIFT_SPEED + i * 0.5) * 0.003;
      const driftY =
        Math.cos(timeRef.current * DRIFT_SPEED * 0.7 + i * 0.3) * 0.003;

      posArray[ix] += driftX;
      posArray[iy] += driftY;

      // Mouse repulsion with smooth falloff
      const dx = posArray[ix] - mouseX;
      const dy = posArray[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPEL_RADIUS && dist > 0.01) {
        const strength =
          REPEL_STRENGTH * (1 - dist / REPEL_RADIUS) * (1 - dist / REPEL_RADIUS);
        velocitiesRef.current[ix] += (dx / dist) * strength;
        velocitiesRef.current[iy] += (dy / dist) * strength;
      }

      // Apply velocity with damping
      posArray[ix] += velocitiesRef.current[ix];
      posArray[iy] += velocitiesRef.current[iy];
      posArray[iz] += velocitiesRef.current[iz];

      velocitiesRef.current[ix] *= 0.92;
      velocitiesRef.current[iy] *= 0.92;
      velocitiesRef.current[iz] *= 0.92;

      // Return to original position (spring)
      posArray[ix] +=
        (originalPositions[ix] - posArray[ix]) * RETURN_STRENGTH;
      posArray[iy] +=
        (originalPositions[iy] - posArray[iy]) * RETURN_STRENGTH;
      posArray[iz] +=
        (originalPositions[iz] - posArray[iz]) * RETURN_STRENGTH;
    }

    posAttr.needsUpdate = true;

    // Update connecting lines with gradient colors
    const lineAttr = linesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const lineArr = lineAttr.array as Float32Array;
    const lineColAttr = linesRef.current.geometry.attributes
      .color as THREE.BufferAttribute;
    const lineColArr = lineColAttr.array as Float32Array;
    let lineIndex = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const ix = i * 3;
        const jx = j * 3;

        const ddx = posArray[ix] - posArray[jx];
        const ddy = posArray[ix + 1] - posArray[jx + 1];
        const ddz = posArray[ix + 2] - posArray[jx + 2];
        const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

        if (dist < CONNECTION_DISTANCE) {
          const li = lineIndex * 6;
          lineArr[li] = posArray[ix];
          lineArr[li + 1] = posArray[ix + 1];
          lineArr[li + 2] = posArray[ix + 2];
          lineArr[li + 3] = posArray[jx];
          lineArr[li + 4] = posArray[jx + 1];
          lineArr[li + 5] = posArray[jx + 2];

          // Use particle colors for line endpoints
          lineColArr[li] = colors[ix];
          lineColArr[li + 1] = colors[ix + 1];
          lineColArr[li + 2] = colors[ix + 2];
          lineColArr[li + 3] = colors[jx];
          lineColArr[li + 4] = colors[jx + 1];
          lineColArr[li + 5] = colors[jx + 2];

          lineIndex++;
        }
      }
    }

    lineAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
  });

  return (
    <>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          vertexColors
          size={3}
          sizeAttenuation={false}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export function ParticleField({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 55 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
