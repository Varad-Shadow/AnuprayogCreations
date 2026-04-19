import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SilkyPlane() {
  const meshRef = useRef()
  
  // Create geometry once and memoize it
  const geometry = useMemo(() => {
    // Making it slightly larger than 15x15 so the edges don't peek out
    return new THREE.PlaneGeometry(25, 25, 128, 128)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const positionAttribute = geometry.attributes.position
    
    // Animate the vertices to create a soft fluid wave
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i)
      const y = positionAttribute.getY(i)
      
      // Gentle, sweeping mathematical displacement
      const waveX = Math.sin(x * 0.4 + time * 0.4) * 0.6
      const waveY = Math.cos(y * 0.4 + time * 0.3) * 0.6
      const waveXY = Math.sin((x + y) * 0.2 + time * 0.5) * 0.4
      
      // Extremely soft and low amplitude
      const z = waveX + waveY + waveXY
      
      positionAttribute.setZ(i, z)
    }
    
    positionAttribute.needsUpdate = true
    // Crucial: Recompute normals so light reflects dynamically off the waves
    geometry.computeVertexNormals() 
  })

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
      <meshStandardMaterial 
        color="#ffffff"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function SilkyWaveBg() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-50 pointer-events-none opacity-80 bg-[#fdfdfd]">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Crisp rendering
      >
        {/* Soft base lighting */}
        <ambientLight intensity={1.5} color="#ffffff" />
        
        {/* Pastel highlights washing over the silky ripples */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#e0f2fe" /> {/* Pale Sky Blue */}
        <directionalLight position={[-10, 5, 5]} intensity={1.2} color="#f3e8ff" /> {/* Soft Lilac */}
        <directionalLight position={[0, -10, 5]} intensity={1} color="#ffedd5" />   {/* Gentle Peach */}
        
        <SilkyPlane />
      </Canvas>
    </div>
  )
}
