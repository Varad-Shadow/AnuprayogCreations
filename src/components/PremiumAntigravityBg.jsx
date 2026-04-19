import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

function EtherealShape({ position, scale, speed, rotationIntensity, floatIntensity }) {
  const meshRef = useRef()

  // Gentle, continuous tumbling rotation like being submerged in water
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <Float 
      speed={speed} 
      rotationIntensity={rotationIntensity} 
      floatIntensity={floatIntensity}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {/* High-detail Icosahedron for smooth, polished geometry */}
        <icosahedronGeometry args={[1.5, 8]} />
        
        {/* Soft Frosted Quartz/Silicone Material */}
        <MeshTransmissionMaterial 
          color="#ffffff"
          transmission={0.8}
          roughness={0.4}
          thickness={2}
          ior={1.2}
          emissive="#f8fafc"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

export default function PremiumAntigravityBg() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-50] pointer-events-none opacity-70 bg-[#fdfbfb]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 40 }} 
        dpr={[1, 2]}
      >
        {/* Wash out dark spots with a strong ambient light */}
        <ambientLight intensity={2} color="#ffffff" />
        
        {/* Soft pastel point lights pointing at the shapes */}
        <pointLight position={[-5, 5, 5]} intensity={2} color="#e0f2fe" distance={20} />
        <pointLight position={[5, -5, 5]} intensity={2} color="#ffedd5" distance={20} />

        {/* 
          Composition: 
          Shapes are pushed to the edges and background. 
          The center is completely clear to protect website text readability.
        */}
        <EtherealShape position={[-6, 4, -5]} scale={1.2} speed={1.5} rotationIntensity={1} floatIntensity={1.5} />
        <EtherealShape position={[6, -3, -6]} scale={1.5} speed={1.2} rotationIntensity={0.8} floatIntensity={1.2} />
        <EtherealShape position={[-5, -4, -8]} scale={1.8} speed={1.8} rotationIntensity={1.2} floatIntensity={1.8} />
        <EtherealShape position={[7, 5, -7]} scale={1.4} speed={1.4} rotationIntensity={0.9} floatIntensity={1.4} />

        {/* Very soft environment map to avoid chaotic reflections */}
        <Environment preset="dawn" blur={1} />

        {/* Depth of Field strictly blurs the floating objects behind the UI */}
        <EffectComposer disableNormalPass>
          <DepthOfField 
            focusDistance={0} 
            focalLength={0.02} 
            bokehScale={5} 
            height={480} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
