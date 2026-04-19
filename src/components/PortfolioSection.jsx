import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PORTFOLIO_DATA = [
  { title: 'E-Commerce App', category: 'Mobile Dev', image: '/about_mobile_ui.png', pos: [-3, 1, 0] },
  { title: 'Corporate Dashboard', category: 'Web App', image: '/hero_workspace.png', pos: [0, 1.5, 0.5] },
  { title: 'Fintech Platform', category: 'UI/UX Design', image: '/about_developer.png', pos: [3, 1, 0] },
  { title: 'Logistics System', category: 'Desktop App', image: '/about_mobile_ui.png', pos: [-1.5, -1.5, 0.5] },
  { title: 'EdTech Portal', category: 'Web App', image: '/hero_workspace.png', pos: [1.5, -1.5, 0] },
]

function PortfolioCard({ data, pos, scale, index }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (groupRef.current) {
      const targetRotX = hovered ? 0.1 : 0
      const targetRotY = hovered ? -0.1 : 0
      const targetZ = hovered ? pos[2] + 0.8 : pos[2]
      
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.1
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.1
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.1
    }
  })

  return (
    <Float floatIntensity={4} speed={1.2 + (index % 2)} rotationIntensity={0.3}>
      <group ref={groupRef} position={pos}>
        <Html transform scale={scale} zIndexRange={[100, 0]} center>
          <div 
            className="w-[320px] h-[220px] rounded-[2rem] overflow-hidden group cursor-pointer relative"
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <div className="absolute inset-0 bg-[#050510] rounded-[2rem] p-[2px]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-full h-full bg-[#050510] rounded-[1.85rem] overflow-hidden relative">
                {/* Background Image */}
                <img 
                  src={data.image} 
                  alt={data.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-[#050510] via-[#050510]/50 to-transparent">
                  <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {data.category}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {data.title}
                  </h3>
                  
                  {/* Arrow icon */}
                  <div className="absolute right-6 bottom-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-150 backdrop-blur-md">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  )
}

function PortfolioLayout() {
  const [layout, setLayout] = useState([])

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      const isMobile = w < 768
      const isTablet = w >= 768 && w < 1024

      const newLayout = PORTFOLIO_DATA.map((p, i) => {
        let pos, scale
        if (isMobile) {
          pos = [0, 6 - i * 2.2, i % 2 === 0 ? 0 : 0.5]
          scale = 0.6
        } else if (isTablet) {
          const col = i % 2
          const row = Math.floor(i / 2)
          pos = [col === 0 ? -2 : 2, 3 - row * 2.5, col === 0 ? 0 : 0.5]
          scale = 0.55
        } else {
          pos = p.pos // Use original layout for desktop
          scale = 0.55
        }
        return { ...p, pos, scale }
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
        <PortfolioCard key={i} index={i} data={item} pos={item.pos} scale={item.scale} />
      ))}
    </group>
  )
}

export default function PortfolioSection() {
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
    <section id="portfolio" ref={sectionRef} className="relative min-h-screen py-32 flex flex-col">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-12">
        <div ref={headingRef} className="text-center flex flex-col items-center gap-4">
          <span className="section-tag">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            Featured Work
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white">
            Our <span className="gradient-text-warm">Portfolio</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Explore our latest projects showcasing innovative design and robust engineering.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full h-[900px] md:h-[800px] lg:h-[600px] relative">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          style={{ background: 'transparent' }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <PortfolioLayout />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="glow-line mt-20" />
    </section>
  )
}
