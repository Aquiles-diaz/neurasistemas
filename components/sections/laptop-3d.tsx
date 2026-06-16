"use client";

import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

export type ScrollState = { progress: number; velocity: number };

// Low metalness so the body reads under plain lights (no environment map needed
// — environment maps are what make pure metals look lit, and we want this to be
// bulletproof across GPUs). Mid grey so it stands out against the near-black bg.
const ALU = "#7b828e";
const DARK = "#1a1d22";
const TAU = Math.PI * 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Backlit screen wallpaper — a subtle glow, drawn to a canvas. */
function useScreenTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 640;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 640);
    g.addColorStop(0, "#15202e");
    g.addColorStop(1, "#070b12");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1024, 640);
    const rg = ctx.createRadialGradient(512, 300, 20, 512, 300, 560);
    rg.addColorStop(0, "rgba(90,150,255,0.18)");
    rg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, 1024, 640);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

/** A grid of keyboard keys as a single instanced mesh (one draw call). */
function Keyboard() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const cols = 14;
  const rows = 5;
  const count = cols * rows;

  useLayoutEffect(() => {
    if (!ref.current) return;
    const o = new THREE.Object3D();
    const kw = 0.2;
    const kd = 0.2;
    const gx = 0.052;
    const gz = 0.058;
    const spanX = cols * (kw + gx) - gx;
    const spanZ = rows * (kd + gz) - gz;
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        o.position.set(
          -spanX / 2 + kw / 2 + c * (kw + gx),
          0,
          -spanZ / 2 + kd / 2 + r * (kd + gz)
        );
        o.updateMatrix();
        ref.current.setMatrixAt(i++, o.matrix);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, count]}
      position={[0, 0.082, -0.28]}
    >
      <boxGeometry args={[0.2, 0.035, 0.2]} />
      <meshStandardMaterial color="#2a2e36" metalness={0.2} roughness={0.7} />
    </instancedMesh>
  );
}

/**
 * A MacBook, built procedurally. The outer group spins and descends driven by
 * Lenis scroll progress (read from a ref since R3F's Canvas does not share the
 * Lenis React context).
 */
function MacBook({
  scroll,
  reduce,
}: {
  scroll: RefObject<ScrollState>;
  reduce: boolean;
}) {
  const spin = useRef<THREE.Group>(null);
  const eased = useRef(0);
  const easedVel = useRef(0);

  const screenTex = useScreenTexture();
  const [mark, monogram] = useTexture([
    "/logo/neurasistemas-mark.png",
    "/logo/neurasistemas-monogram.png",
  ]) as THREE.Texture[];
  const markImg = mark.image as { width: number; height: number };
  const markAspect = markImg.height / markImg.width;

  useFrame((state, delta) => {
    if (!spin.current) return;
    const k = Math.min(1, delta * 5);
    const targetP = reduce ? 0.04 : scroll.current.progress;
    const targetV = reduce ? 0 : scroll.current.velocity;
    eased.current = lerp(eased.current, targetP, k);
    easedVel.current = lerp(easedVel.current, targetV, k);

    const t = state.clock.elapsedTime;
    // The whole laptop turns a full 360° across the page as you scroll, plus a
    // whisper of idle drift so it's never frozen. Velocity adds a little kick.
    spin.current.rotation.y = reduce
      ? 0
      : eased.current * TAU + Math.sin(t * 0.4) * 0.05 + easedVel.current * 0.0005;
    // ...and descends while it spins.
    spin.current.position.y =
      lerp(0.5, -1.2, eased.current) + (reduce ? 0 : Math.sin(t * 0.7) * 0.06);
    spin.current.position.x = reduce ? 0 : Math.sin(eased.current * Math.PI) * 0.6;
    spin.current.rotation.x = 0.06;
  });

  return (
    <group ref={spin}>
      {/* recenter the open laptop around the origin so it spins about its middle */}
      <group position={[0, -1.3, 0]} scale={0.85}>
        {/* ---------- base / unibody ---------- */}
        <RoundedBox args={[4, 0.13, 2.7]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color={ALU} metalness={0.25} roughness={0.5} />
        </RoundedBox>
        {/* recessed keyboard well */}
        <RoundedBox args={[3.5, 0.05, 1.55]} radius={0.03} smoothness={3} position={[0, 0.055, -0.28]}>
          <meshStandardMaterial color={DARK} metalness={0.2} roughness={0.75} />
        </RoundedBox>
        <Keyboard />
        {/* trackpad */}
        <RoundedBox args={[1.55, 0.03, 1.0]} radius={0.04} smoothness={3} position={[0, 0.07, 0.78]}>
          <meshStandardMaterial color="#343a44" metalness={0.2} roughness={0.6} />
        </RoundedBox>
        {/* hinge */}
        <mesh position={[0, 0.02, -1.34]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 3.9, 24]} />
          <meshStandardMaterial color="#15171c" metalness={0.3} roughness={0.6} />
        </mesh>

        {/* ---------- lid — fixed at a clean vertical 90° "L" ---------- */}
        <group position={[0, 0.05, -1.34]} rotation={[0, 0, 0]}>
          {/* aluminium back */}
          <RoundedBox args={[4, 2.7, 0.08]} radius={0.05} smoothness={4} position={[0, 1.35, -0.05]}>
            <meshStandardMaterial color={ALU} metalness={0.25} roughness={0.48} />
          </RoundedBox>
          {/* etched logo on the back */}
          <mesh position={[0, 1.35, -0.092]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.7, 0.7]} />
            <meshBasicMaterial map={monogram} transparent opacity={0.35} color="#aeb6c2" />
          </mesh>
          {/* black screen bezel */}
          <RoundedBox args={[3.84, 2.54, 0.03]} radius={0.04} smoothness={3} position={[0, 1.35, 0.0]}>
            <meshStandardMaterial color="#070a0f" metalness={0.2} roughness={0.5} />
          </RoundedBox>
          {/* backlit screen */}
          <mesh position={[0, 1.37, 0.02]}>
            <planeGeometry args={[3.6, 2.28]} />
            <meshBasicMaterial map={screenTex} toneMapped={false} />
          </mesh>
          {/* glowing brand mark on screen */}
          <mesh position={[0, 1.37, 0.03]}>
            <planeGeometry args={[1.5, 1.5 * markAspect]} />
            <meshBasicMaterial map={mark} transparent toneMapped={false} opacity={0.85} />
          </mesh>
          {/* notch */}
          <mesh position={[0, 2.52, 0.02]}>
            <boxGeometry args={[0.5, 0.07, 0.02]} />
            <meshBasicMaterial color="#070a0f" toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/** TEMP: a big rainbow cube that always renders (no lights/textures needed). */
function DebugCube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.6;
      ref.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshNormalMaterial />
    </mesh>
  );
}

/**
 * Full-viewport WebGL MacBook behind the whole page: a rotating, descending
 * sub-background lit by a neutral key plus two blue rim lights on the left and
 * right. No environment map (so it can never silently fail to light on a given
 * GPU) — plain lights only.
 */
export default function Laptop3D({
  scroll,
  reduce,
}: {
  scroll: RefObject<ScrollState>;
  reduce: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.2, 10], fov: 33 }}
    >
      {/* base visibility */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 6, 7]} intensity={2.2} />
      <directionalLight position={[-2, 3, 5]} intensity={0.8} color="#dfe6f2" />

      {/* LEFT blue rim */}
      <spotLight position={[-8, 1, 5]} angle={0.9} penumbra={1} intensity={500} distance={45} color="#3a86ff" />
      <pointLight position={[-6, 0, 3]} intensity={60} distance={30} color="#4f9bff" />
      {/* RIGHT blue rim */}
      <spotLight position={[8, 1, 5]} angle={0.9} penumbra={1} intensity={500} distance={45} color="#5a7dff" />
      <pointLight position={[6, 0, 3]} intensity={60} distance={30} color="#6f8cff" />

      {/* ===== TEMP DEBUG CUBE ===== rainbow, needs no lights/textures. If you see
          this spinning, WebGL renders fine and the issue is the laptop's look. */}
      <DebugCube />

      <MacBook scroll={scroll} reduce={reduce} />
    </Canvas>
  );
}
