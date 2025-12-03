"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

function PointCloudModel() {
  const geometry = useLoader(PLYLoader, "/mock-assets/dust3r_pointcloud.ply");
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Center and scale the geometry
  useMemo(() => {
    geometry.computeBoundingBox();
    geometry.center();
    // Scale to fit nicely in view
    const box = geometry.boundingBox;
    if (box) {
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3 / maxDim;
      geometry.scale(scale, scale, scale);
    }
  }, [geometry]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0ea5e9" wireframe />
    </mesh>
  );
}

export function AstronautScene() {
  return (
    <div className="h-96 w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-2 shadow-lg">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#020617"]} />
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
          <PointCloudModel />
          <Environment preset="night" />
        </Suspense>
        <OrbitControls enableDamping autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}
