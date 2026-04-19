import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

function GlassShape({ geometry, position, scale }) {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh scale={scale} geometry={geometry}>
        <MeshTransmissionMaterial 
          transmission={1}
          thickness={1.5}
          roughness={0.1}
          chromaticAberration={0.04}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#ffffff"
        />
      </mesh>
    </Float>
  )
}

function ZeroGravityField() {
  const { camera, mouse } = useThree()
  
  // Geometries for our abstract glass shapes
  const sphereGeo = new THREE.SphereGeometry(1, 64, 64)
  const icosaGeo = new THREE.IcosahedronGeometry(1, 0)
  const torusGeo = new THREE.TorusGeometry(1, 0.4, 64, 128)
  
  // Mouse Parallax
  useFrame(() => {
    // Smoothly interpolate camera position based on mouse (max 0.5 units)
    const targetX = (mouse.x * 0.5) * -1
    const targetY = (mouse.y * 0.5) * -1
    
    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return (
    <group>
      {/* Background/Foreground Glass Objects */}
      <GlassShape geometry={sphereGeo} position={[-4, 2, -5]} scale={2} />
      <GlassShape geometry={icosaGeo} position={[5, -3, -8]} scale={2.5} />
      <GlassShape geometry={torusGeo} position={[-6, -4, -12]} scale={3} />
      
      <GlassShape geometry={sphereGeo} position={[7, 4, -4]} scale={1.5} />
      <GlassShape geometry={icosaGeo} position={[-8, 6, -15]} scale={3.5} />
      
      {/* Objects close to camera to be heavily blurred by DoF */}
      <GlassShape geometry={torusGeo} position={[3, 5, 4]} scale={0.8} />
      <GlassShape geometry={sphereGeo} position={[-5, -4, 3]} scale={1.2} />
    </group>
  )
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none bg-[#fdfdfd]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* Soft, colorful ambient light */}
        <ambientLight intensity={2} color="#fce7f3" />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#e0eaff" />
        
        <Environment preset="city" />

        <ZeroGravityField />

        {/* Postprocessing for Premium Depth of Field */}
        <EffectComposer disableNormalPass>
          <DepthOfField 
            focusDistance={0.02} // Focuses near the center [0,0,0] relative to camera
            focalLength={0.05} 
            bokehScale={5} 
            height={480} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
