import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Float, Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES_DATA = [
  { title: 'Mobile App\nDevelopment', icon: '📱', color: 'from-indigo-500 to-purple-500' },
  { title: 'Web App\nDevelopment', icon: '💻', color: 'from-purple-500 to-cyan-500' },
  { title: 'UI/UX\nDesign', icon: '✨', color: 'from-cyan-500 to-emerald-500' },
  { title: 'Desktop App\nDevelopment', icon: '🖥️', color: 'from-emerald-500 to-indigo-500' },
  { title: 'Content &\nPublishing', icon: '📝', color: 'from-orange-500 to-pink-500' },
  { title: 'IT\nConsulting', icon: '🧠', color: 'from-pink-500 to-purple-500' },
  { title: 'Data\nManagement', icon: '📊', color: 'from-blue-500 to-cyan-500' },
  { title: 'Placement\nTraining', icon: '🎓', color: 'from-yellow-500 to-orange-500' },
]

function ServiceCard({ data, pos, scale, index }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth tilt on hover
      const targetRotX = hovered ? 0.15 : 0
      const targetRotY = hovered ? -0.15 : 0
      const targetZ = hovered ? pos[2] + 0.5 : pos[2]
      
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.1
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.1
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.1
    }
  })

  // Entrance animation logic could go here via useFrame or GSAP

  return (
    <Float floatIntensity={3} speed={1.5 + (index % 3)} rotationIntensity={0.2}>
      <group ref={groupRef} position={pos}>
        <Html transform scale={scale} zIndexRange={[100, 0]} center>
          <div 
            className="w-[260px] h-[340px] glass-card rounded-[2rem] p-8 flex flex-col justify-center items-center text-center group cursor-pointer transition-colors duration-500 hover:bg-white/10"
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center text-4xl bg-gradient-to-br ${data.color} shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
              {data.icon}
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-4 whitespace-pre-line group-hover:gradient-text transition-all duration-300">
              {data.title}
            </h3>
            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-indigo-500 transition-colors duration-300" />
          </div>
        </Html>
      </group>
    </Float>
  )
}

function CardsLayout() {
  const [layout, setLayout] = useState([])

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      const isMobile = w < 768
      const isTablet = w >= 768 && w < 1024

      const newLayout = SERVICES_DATA.map((s, i) => {
        let pos, scale
        if (isMobile) {
          pos = [0, 9 - i * 2.8, i % 2 === 0 ? 0 : 0.5]
          scale = 0.55
        } else if (isTablet) {
          const col = i % 2
          const row = Math.floor(i / 2)
          pos = [col === 0 ? -1.8 : 1.8, 5 - row * 3.2, col === 0 ? 0 : 0.5]
          scale = 0.5
        } else {
          const col = i % 4
          const row = Math.floor(i / 4)
          pos = [-4.5 + col * 3, 2 - row * 3.8, col % 2 === 0 ? 0 : 0.8]
          scale = 0.45
        }
        return { ...s, pos, scale }
      })
      setLayout(newLayout)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <group>
      {layout.map((item, i) => (
        <ServiceCard key={i} index={i} data={item} pos={item.pos} scale={item.scale} />
      ))}
    </group>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef()
  const headingRef = useRef()

  useEffect(() => {
    gsap.fromTo(
      headingRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    )
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative min-h-screen py-32 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-12">
        <div ref={headingRef} className="text-center flex flex-col items-center gap-4">
          <span className="section-tag">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Zero-Gravity Gallery
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white">
            What We <span className="gradient-text">Do?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Hover over our floating services to explore how we can transform your business with cutting-edge technology.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full h-[1200px] md:h-[900px] lg:h-[700px] relative">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#6366f1" />
          <Suspense fallback={null}>
            <CardsLayout />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="glow-line mt-20" />
    </section>
  )
}
