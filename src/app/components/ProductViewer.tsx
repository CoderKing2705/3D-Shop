"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";

function Loader() {
    const { progress } = useProgress();
    return <Html center>{Math.round(progress)}% loading</Html>;
}

function Model({ url, color }: { url: string; color?: string }) {
    const { scene } = useGLTF(url);
    const group = useRef<THREE.Group | null>(null);

    useEffect(() => {
        if (!color) return;
        scene.traverse((child: any) => {
            if (child.isMesh && child.material) {
                child.material = child.material.clone();
                if (child.material.color) child.material.color.set(color);
            }
        });
    }, [scene, color]);

    useFrame((state, delta) => {
        if (group.current) group.current.rotation.y += delta * 0.15;
    });

    return <primitive ref={group} object={scene} dispose={null} />;
}

export default function ProductViewer({ modelPath, color = "#ffffff" }: { modelPath: string; color?: string }) {
    return (
        <div className="w-full h-[500px] md:h-[600px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg overflow-hidden">
            <Canvas
                shadows
                camera={{ position: [0, 1, 3], fov: 45 }}
                style={{ background: "transparent" }} // ✅ Transparent canvas
            >
                <ambientLight intensity={0.6} />
                <spotLight
                    intensity={1}
                    angle={0.3}
                    penumbra={0.5}
                    position={[5, 10, 5]}
                    castShadow
                />
                <Suspense fallback={<Loader />}>
                    <Environment preset="studio" />
                    <Model url={modelPath} color={color} />
                </Suspense>
                <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>
        </div>
    );
}
