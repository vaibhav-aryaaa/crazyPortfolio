'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

function MemojiModel() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('https://models.readyplayer.me/685bbcef35fff286025c6665.glb'); // your model

  useFrame(({ mouse }) => {
    if (ref.current) {
      ref.current.rotation.y = mouse.x * 1.2;
      ref.current.rotation.x = -mouse.y * 0.6;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.6}
      position={[0, -1, 0]} // adjust to center properly
    />
  );
}

export default function MemojiViewer() {
  return (
    <div className="w-[220px] h-[240px] sm:w-[280px] sm:h-[300px]">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <MemojiModel />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}