import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'

// Animated hero 3D object
function HeroObject({ mousePos }) {
  const groupRef = useRef()
  const innerRef = useRef()
  const ringRef = useRef()
  const ring2Ref = useRef()

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15 + mouse.x * 0.3
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 + mouse.y * -0.2
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.4
      ringRef.current.rotation.z = t * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.5
      ring2Ref.current.rotation.z = -t * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive="#4338ca"
          emissiveIntensity={0.4}
        />
      </Sphere>

      {/* Outer ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.04, 8, 64]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.03, 8, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Floating particles around sphere */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const r = 1.8
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * 0.5, Math.sin(angle) * r]}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#ec4899' : '#06b6d4'}
              emissive={i % 2 === 0 ? '#ec4899' : '#06b6d4'}
              emissiveIntensity={0.8}
            />
          </mesh>
        )
      })}

      {/* Inner glow sphere */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial
          color="#a5b4fc"
          transparent
          opacity={0.15}
          emissive="#6366f1"
          emissiveIntensity={1}
        />
      </Sphere>
    </group>
  )
}

function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2} />
      <pointLight position={[-5, -3, 3]} color="#8b5cf6" intensity={1.5} />
      <pointLight position={[0, 8, -2]} color="#06b6d4" intensity={1} />
      <HeroObject />
    </Canvas>
  )
}

export default function HeroSection() {
  const headingRef = useRef()
  const subRef = useRef()
  const descRef = useRef()
  const btnsRef = useRef()
  const statsRef = useRef()
  const sectionRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
      .fromTo(
        statsRef.current?.children,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
        '-=0.3'
      )
  }, [])

  const scrollToContact = (e) => {
    e.preventDefault()
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollToPlugin').then(({ ScrollToPlugin }) => {
        gsap.registerPlugin(ScrollToPlugin)
        gsap.to(window, { duration: 1.2, scrollTo: '#contact', ease: 'power3.inOut' })
      })
    })
  }

  const scrollToServices = (e) => {
    e.preventDefault()
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollToPlugin').then(({ ScrollToPlugin }) => {
        gsap.registerPlugin(ScrollToPlugin)
        gsap.to(window, { duration: 1.2, scrollTo: '#services', ease: 'power3.inOut' })
      })
    })
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background gradient blobs */}
      <div className="blob w-96 h-96 bg-indigo-600 top-10 -left-20 animation-delay-200" style={{ animationDuration: '8s' }} />
      <div className="blob w-80 h-80 bg-purple-600 top-1/3 right-10 animation-delay-4000" style={{ animationDuration: '10s' }} />
      <div className="blob w-64 h-64 bg-cyan-500 bottom-20 left-1/3 animation-delay-2000" style={{ animationDuration: '7s' }} />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Content */}
        <div className="relative z-10 flex flex-col gap-8">
          {/* Tag */}
          <div ref={subRef} className="opacity-0">
            <span className="section-tag">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Welcome to Anuprayog
            </span>
          </div>

          {/* Headline */}
          <h1 ref={headingRef} className="opacity-0 font-display font-black text-5xl md:text-6xl xl:text-7xl leading-[1.05] text-white">
            Your Trusted{' '}
            <span className="gradient-text">Technology</span>
            <br />
            Partner for{' '}
            <span className="gradient-text-warm">Business</span>
          </h1>

          {/* Description */}
          <p ref={descRef} className="opacity-0 text-slate-400 text-lg leading-relaxed max-w-lg">
            We transform your boldest app ideas into world-class digital products — from mobile & web apps 
            to desktop solutions and IT consulting, delivered with honesty and precision.
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="opacity-0 flex flex-wrap gap-4">
            <button onClick={scrollToContact} className="btn-primary relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                Start a Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button onClick={scrollToServices} className="btn-ghost">
              Explore Services
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-8 pt-4">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Delivered' },
              { value: '100%', label: 'Client Trust' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-display font-black text-3xl gradient-text">{value}</span>
                <span className="text-slate-500 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="relative h-80 lg:h-[520px] flex items-center justify-center">
          {/* Glow behind canvas */}
          <div className="absolute inset-0 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #6366f1, #8b5cf6, transparent)' }}
          />
          <div className="w-full h-full">
            <HeroCanvas />
          </div>

          {/* Floating badges */}
          <div className="absolute top-4 right-4 glass px-4 py-2 rounded-2xl animate-float">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-300 font-medium">Available for projects</span>
            </div>
          </div>

          <div className="absolute bottom-8 left-4 glass px-4 py-3 rounded-2xl animation-delay-400 animate-float-slow">
            <div className="text-xs text-slate-400">Tech Stack</div>
            <div className="flex gap-2 mt-1">
              {['React', 'Node', 'Flutter'].map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="text-xs text-slate-500 tracking-widest uppercase">Scroll</div>
        <div className="w-px h-8 bg-gradient-to-b from-indigo-500 to-transparent" />
      </div>
    </section>
  )
}
