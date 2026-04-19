import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// The Liquid Pearl Geometry Component
function LiquidPearl({ position, scale, speed, rotationIntensity, floatIntensity, delay }) {
  const meshRef = useRef()

  // Hypnotic, ultra-slow microscopic rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <Float 
      speed={speed} 
      rotationIntensity={rotationIntensity} 
      floatIntensity={floatIntensity} 
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {/* Soft, high-poly geometry */}
        <sphereGeometry args={[1, 128, 128]} />
        
        {/* The Premium Liquid Pearl Material */}
        <meshPhysicalMaterial 
          color="#ffffff"
          roughness={0.2}
          metalness={0.1}
          transmission={0.8}
          thickness={2}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  const groupRef = useRef()

  // Slow, continuous breathing rotation of the entire group
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.0005
      groupRef.current.rotation.x -= 0.0002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central large pearl */}
      <LiquidPearl position={[0, 0, 0]} scale={3.5} speed={0.8} rotationIntensity={0.2} floatIntensity={0.5} />
      
      {/* Orbiting / intersecting pearls to create a continuous abstract wave feel */}
      <LiquidPearl position={[-3, 2, -2]} scale={2} speed={1} rotationIntensity={0.5} floatIntensity={1} />
      <LiquidPearl position={[4, -2, -1]} scale={1.8} speed={1.2} rotationIntensity={0.4} floatIntensity={1.2} />
      <LiquidPearl position={[-2, -3, 2]} scale={1.5} speed={0.9} rotationIntensity={0.6} floatIntensity={0.8} />
      <LiquidPearl position={[3, 3, 2]} scale={1.2} speed={1.1} rotationIntensity={0.3} floatIntensity={1.5} />
    </group>
  )
}

export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 z-[-50] pointer-events-none bg-[#fdfbfb]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 35 }} 
        dpr={[1, 2]}
      >
        {/* Strategic Pastel Lighting to wash over the pearls */}
        {/* Gentle Peach */}
        <spotLight position={[5, 5, 5]} intensity={1.5} color="#ffecd2" penumbra={1} angle={0.5} />
        {/* Pale Lavender */}
        <pointLight position={[-5, -5, 5]} intensity={2} color="#e0c3fc" distance={20} />
        {/* Soft Morning Blue */}
        <pointLight position={[0, 5, -5]} intensity={1} color="#a1c4fd" distance={20} />
        
        {/* Soft fill light to prevent harsh shadows */}
        <ambientLight intensity={0.5} color="#ffffff" />

        <Scene />

        {/* Premium complex reflections */}
        <Environment preset="city" blur={0.8} />
        
        {/* Subtle, highly blurred shadow beneath the composition to ground it elegantly */}
        <ContactShadows 
          position={[0, -5, 0]} 
          opacity={0.3} 
          scale={20} 
          blur={2.5} 
          far={10} 
          color="#a1c4fd"
        />
      </Canvas>
    </div>
  )
}
