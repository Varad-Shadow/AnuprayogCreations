import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom } from '@react-three/postprocessing'

// Crystal Glass Pipe Ring — vibrant and substantial
function CrystalRing({ args, rotation, speed }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.8
      ref.current.rotation.y += delta * speed
    }
  })
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={args} />
      {/* Vibrant electric-cyan crystal glass pipe */}
      <MeshTransmissionMaterial
        color="#06e6d4"
        transmission={0.7}
        roughness={0.05}
        thickness={3}
        ior={1.6}
        chromaticAberration={0.08}
        clearcoat={1}
        clearcoatRoughness={0.05}
        emissive="#00ccbb"
        emissiveIntensity={1.2}
      />
    </mesh>
  )
}

// Central multi-faceted crystal core
function CrystalCore() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3
      ref.current.rotation.z += delta * 0.15
    }
  })

  // Pulsating intensity
  const innerRef = useRef()
  useFrame((state) => {
    if (innerRef.current) {
      innerRef.current.material.emissiveIntensity =
        1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.8
    }
  })

  return (
    <group ref={ref}>
      {/* Outer crystal shell */}
      <mesh>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          color="#ffffff"
          transmission={0.95}
          roughness={0.05}
          thickness={2.5}
          ior={1.8}
          chromaticAberration={0.1}
          clearcoat={1}
          clearcoatRoughness={0.0}
          emissive="#00e5ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Inner pulsating turquoise light core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.4, 2]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00ccbb"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function TechCoreComposition() {
  return (
    // Positioned to the right side of the screen and pushed into the background
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.5}>
      <group position={[4, 0, -3]}>
        <CrystalCore />

        {/* Three interlocking gyroscope rings — substantial crystal-glass pipes */}
        <CrystalRing
          args={[2.8, 0.18, 64, 128]}
          rotation={[0, 0, 0]}
          speed={0.15}
        />
        <CrystalRing
          args={[3.2, 0.14, 64, 128]}
          rotation={[Math.PI / 3, 0, Math.PI / 6]}
          speed={-0.12}
        />
        <CrystalRing
          args={[3.6, 0.1, 64, 128]}
          rotation={[Math.PI / 6, Math.PI / 4, 0]}
          speed={0.1}
        />
      </group>
    </Float>
  )
}

export default function PremiumTechBg() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-50] pointer-events-none bg-[#fdfbfb]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        {/* Soft base — keeps the background pristine white */}
        <ambientLight intensity={1.5} color="#ffffff" />

        {/* High-key studio lights for complex refractions */}
        <pointLight position={[10, 10, 10]} intensity={4} color="#06b6d4" distance={40} />  {/* Electric Cyan */}
        <pointLight position={[-10, -5, 10]} intensity={3} color="#0891b2" distance={40} />  {/* Deep Cyan */}
        <pointLight position={[0, 10, 5]} intensity={2} color="#ffffff" distance={30} />     {/* Clean white sparkle */}
        <pointLight position={[5, -10, 5]} intensity={2} color="#5eead4" distance={30} />    {/* Turquoise fill */}

        <TechCoreComposition />

        <Environment preset="city" blur={0.8} />

        {/* Postprocessing: Bloom for that rich, glowing plasma halo + Depth of Field */}
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.8}
            height={300}
          />
          <DepthOfField
            focusDistance={0}
            focalLength={0.04}
            bokehScale={4}
            height={480}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
