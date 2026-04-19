import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Animated particle field
function ParticleField({ mousePos }) {
  const meshRef = useRef()
  const { viewport } = useThree()
  const count = 180

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const palette = [
      [0.388, 0.4, 0.945],   // indigo
      [0.545, 0.361, 0.965], // violet
      [0.024, 0.714, 0.831], // cyan
      [0.925, 0.286, 0.6],   // pink
    ]
    for (let i = 0; i < count; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)]
      arr[i * 3] = color[0]
      arr[i * 3 + 1] = color[1]
      arr[i * 3 + 2] = color[2]
    }
    return arr
  }, [])

  const speeds = useMemo(() =>
    new Float32Array(count).map(() => 0.1 + Math.random() * 0.5), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    const geo = meshRef.current.geometry
    const pos = geo.attributes.position.array

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(time * speeds[i] + i) * 0.003
      pos[i * 3] += Math.cos(time * speeds[i] * 0.7 + i) * 0.002
    }

    // Mouse influence
    if (mousePos.current) {
      const mx = (mousePos.current.x / window.innerWidth - 0.5) * 2
      const my = -(mousePos.current.y / window.innerHeight - 0.5) * 2
      meshRef.current.rotation.y = mx * 0.05
      meshRef.current.rotation.x = my * 0.05
    }

    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

// Floating orb
function FloatingOrb({ position, color, speed = 0.5, scale = 1 }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    ref.current.position.y = position[1] + Math.sin(t) * 0.8
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.4
    ref.current.rotation.x = t * 0.3
    ref.current.rotation.y = t * 0.2
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// Nebula mesh (scrolling plane)
function NebulaMesh({ scrollVelocity }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * 0.1
    ref.current.rotation.z = t
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.05
  })

  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <torusGeometry args={[6, 0.02, 8, 100]} />
      <meshStandardMaterial
        color="#6366f1"
        transparent
        opacity={0.06}
        emissive="#6366f1"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

function Scene({ mousePos }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#6366f1" intensity={0.8} />
      <pointLight position={[-10, -10, 5]} color="#8b5cf6" intensity={0.6} />
      <pointLight position={[0, 10, -5]} color="#06b6d4" intensity={0.4} />

      <ParticleField mousePos={mousePos} />
      <FloatingOrb position={[-8, 2, -5]} color="#6366f1" speed={0.3} scale={1.5} />
      <FloatingOrb position={[8, -2, -6]} color="#8b5cf6" speed={0.4} scale={2} />
      <FloatingOrb position={[0, 5, -8]} color="#06b6d4" speed={0.25} scale={1.2} />
      <FloatingOrb position={[5, -5, -4]} color="#ec4899" speed={0.35} scale={0.8} />
      <NebulaMesh />
    </>
  )
}

export default function WebGLBackground() {
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Scene mousePos={mousePos} />
      </Canvas>
    </div>
  )
}
