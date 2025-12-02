"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function AstronautModel() {
  // Model from modelviewer.dev shared assets, stored under /mock-assets/models
  const { scene } = useGLTF("/mock-assets/models/astronaut.glb");
  return <primitive object={scene} />;
}

export function AstronautScene() {
  return (
    <div className="h-72 w-full rounded-2xl bg-slate-900/80 p-2 shadow-lg">
      <Canvas camera={{ position: [2, 1.5, 3], fov: 45 }}>
        <color attach="background" args={["#020617"]} />
        <Suspense fallback={null}>
          <Stage intensity={1} environment={"city"} adjustCamera>
            <AstronautModel />
          </Stage>
        </Suspense>
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}

// Preload the model for snappier interactions
useGLTF.preload("/mock-assets/models/astronaut.glb");
