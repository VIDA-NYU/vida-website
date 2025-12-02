"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function SpinningCube() {
  return (
    <mesh rotation={[0.4, 0.6, 0]}> 
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#38bdf8" />
    </mesh>
  );
}

export function ThreeScene() {
  return (
    <div className="h-64 w-full rounded-2xl bg-slate-900/80 p-2 shadow-lg">
      <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <SpinningCube />
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}
