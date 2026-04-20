import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ------- Spinning Torus Ring -------
function MagneticRing({ radius, tube, tilt, speed, color }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, tube, 64, 200]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3.5}
        roughness={0.05}
        metalness={0.1}
        toneMapped={false}
      />
    </mesh>
  )
}

// ------- Pulsating Energy Node -------
function EnergyNode() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.material.emissiveIntensity = 2.5 + Math.sin(t * 3.0) * 1.5
    const s = 1 + Math.sin(t * 2.5) * 0.12
    ref.current.scale.setScalar(s)
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.28, 4]} />
      <meshStandardMaterial
        color="#00eeff"
        emissive="#00eeff"
        emissiveIntensity={2.5}
        roughness={0.0}
        metalness={0.0}
        toneMapped={false}
      />
    </mesh>
  )
}

// ------- Glass Cube Core -------
function GlassCube() {
  const ref = useRef()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.18
    ref.current.rotation.x += delta * 0.08
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.1, 1.1, 1.1]} />
      <MeshTransmissionMaterial
        resolution={isMobile ? 256 : 512}
        transmission={1}
        thickness={2}
        roughness={0.05}
        chromaticAberration={0.05}
        ior={1.5}
        color="#c8f0ff"
        clearcoat={1}
        clearcoatRoughness={0.0}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}

// ------- Full Quantum Core Composition -------
function QuantumCoreScene() {
  const groupRef = useRef()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const coreScale = isMobile ? 0.5 : 1
  const corePosition = isMobile ? [0, -3.5, 0] : [3.2, 0, 0]

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.06
  })

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={corePosition} scale={coreScale}>
        {/* Glass Cube */}
        <GlassCube />
        {/* Energy Node inside the cube */}
        <EnergyNode />

        {/* Ring 1 — equatorial */}
        <MagneticRing
          radius={2.0}
          tube={0.055}
          tilt={[0, 0, 0]}
          speed={0.30}
          color="#00d4ff"
        />
        {/* Ring 2 — tilted 60° */}
        <MagneticRing
          radius={2.3}
          tube={0.042}
          tilt={[Math.PI / 3, 0, Math.PI / 8]}
          speed={-0.22}
          color="#0099ff"
        />
        {/* Ring 3 — tilted 120° */}
        <MagneticRing
          radius={2.6}
          tube={0.030}
          tilt={[Math.PI * 2 / 3, Math.PI / 6, 0]}
          speed={0.18}
          color="#00ffcc"
        />
      </group>
    </Float>
  )
}

// ------- Scene Lights -------
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" />
      <pointLight position={[8, 8, 6]} intensity={30} color="#00d4ff" />
      <pointLight position={[-6, -4, 8]} intensity={20} color="#0066ff" />
      <pointLight position={[0, 8, 4]} intensity={15} color="#ffffff" />
      <pointLight position={[6, -8, 4]} intensity={12} color="#00ffcc" />
    </>
  )
}

// ------- Exported Component -------
export default function QuantumCore() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <QuantumCoreScene />
          <Environment preset="city" />
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom
              intensity={2.2}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
