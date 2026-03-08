"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const CONNECTION_DISTANCE = 3;
const REPEL_RADIUS = 2.5;
const REPEL_STRENGTH = 0.03;
const RETURN_STRENGTH = 0.01;
const GRAVITY_STRENGTH = 0.005;

interface PlaygroundParticlesProps {
  count: number;
  color: string;
  gravity: boolean;
}

function PlaygroundParticles({ count, color, gravity }: PlaygroundParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { pointer, viewport } = useThree();

  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      /* eslint-disable react-hooks/purity -- Intentional: one-time random initialization for particle positions */
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      /* eslint-enable react-hooks/purity */

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
    }

    return { positions: pos, originalPositions: origPos };
  }, [count]);

  const linePositions = useMemo(() => {
    const maxLines = (count * (count - 1)) / 2;
    return new Float32Array(maxLines * 6);
  }, [count]);

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

    const mouseX = pointer.x * (viewport.width / 2);
    const mouseY = pointer.y * (viewport.height / 2);

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const dx = posArray[ix] - mouseX;
      const dy = posArray[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPEL_RADIUS && dist > 0.01) {
        const force = (REPEL_RADIUS - dist) * REPEL_STRENGTH;
        posArray[ix] += (dx / dist) * force;
        posArray[iy] += (dy / dist) * force;
      }

      posArray[ix] += (originalPositions[ix] - posArray[ix]) * RETURN_STRENGTH;
      posArray[iy] += (originalPositions[iy] - posArray[iy]) * RETURN_STRENGTH;
      posArray[iz] += (originalPositions[iz] - posArray[iz]) * RETURN_STRENGTH;

      if (gravity) {
        posArray[iy] -= GRAVITY_STRENGTH;
      }
    }

    posAttr.needsUpdate = true;

    const lineAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineArray = lineAttr.array as Float32Array;
    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const ix = i * 3;
        const jx = j * 3;

        const ddx = posArray[ix] - posArray[jx];
        const ddy = posArray[ix + 1] - posArray[jx + 1];
        const ddz = posArray[ix + 2] - posArray[jx + 2];
        const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

        if (d < CONNECTION_DISTANCE) {
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
          color={color}
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

interface ParticlePlaygroundSceneProps {
  count: number;
  color: string;
  gravity: boolean;
  className?: string;
}

export function ParticlePlaygroundScene({
  count,
  color,
  gravity,
  className,
}: ParticlePlaygroundSceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <PlaygroundParticles count={count} color={color} gravity={gravity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
