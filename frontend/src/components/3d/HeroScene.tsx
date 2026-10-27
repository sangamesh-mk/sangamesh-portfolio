import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { WebGLBoundary } from "@/components/3d/WebGLBoundary";

function NodeField({ interactive }: { interactive: boolean }) {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const positions = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < 18; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / 18);
      const theta = Math.sqrt(18 * Math.PI) * phi;
      points.push([Math.cos(theta) * Math.sin(phi) * 1.7, Math.sin(theta) * Math.sin(phi) * 1.7, Math.cos(phi) * 1.7]);
    }
    return points;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += 0.0022;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    if (interactive) {
      group.current.rotation.y += state.pointer.x * 0.004;
      group.current.rotation.x += state.pointer.y * 0.003;
    }
    if (core.current) {
      core.current.rotation.y -= 0.01;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#7c6cff" roughness={0.35} metalness={0.2} wireframe />
      </mesh>
      {positions.map((position, index) => (
        <Float key={index} speed={1.2} floatIntensity={0.4} rotationIntensity={0.2}>
          <mesh position={position}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color={index % 2 ? "#3ecfc0" : "#f3efe7"} roughness={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();

  if (reduced) {
    return <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_62%)]" />;
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <WebGLBoundary>
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[3, 2, 4]} intensity={18} color="#7c6cff" />
          <pointLight position={[-3, -1, 2]} intensity={10} color="#3ecfc0" />
          <NodeField interactive={fine} />
        </Canvas>
      </Suspense>
      </WebGLBoundary>
    </div>
  );
}
