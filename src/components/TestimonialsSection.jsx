import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: 'Brad Jasper',
    role: 'Client',
    content: "Anuprayog is a great team of programmers and a good addition to any team!",
    avatar: '👨‍💼',
  },
  {
    name: 'Tejas B',
    role: 'Funswitch Technologies',
    content: "Team Anuprayog was very professional and built a high quality product. He was very receptive to feedback and fixed each bug that we found during initial testing. If you're looking to get a mac application built, look no further. Hire Akshay, you will not regret it.",
    avatar: '👨‍💻',
  },
  {
    name: 'Ahmad Hassan',
    role: 'Client',
    content: "Overall, we are pleased with the work team Anuprayog provided and plan to hire them again for future extensions of this project and others.",
    avatar: '👨‍💼',
  },
]

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    )
  }, [])

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [activeIdx])

  const handleNext = () => {
    animateSlide(() => setActiveIdx((p) => (p + 1) % TESTIMONIALS.length))
  }

  const handlePrev = () => {
    animateSlide(() => setActiveIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length))
  }

  const animateSlide = (callback) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        callback()
        gsap.fromTo(contentRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 })
      }
    })
  }

  const activeTestimonial = TESTIMONIALS[activeIdx]

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050510] to-[#050510] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="section-tag mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Client Reviews
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white">
            What Our <span className="gradient-text">Clients</span> Say
          </h2>
        </div>

        <div className="glass-strong rounded-[2.5rem] p-8 md:p-16 relative">
          {/* Decorative quotes */}
          <div className="absolute top-8 left-8 text-8xl text-indigo-500/10 font-serif leading-none">"</div>
          <div className="absolute bottom-4 right-8 text-8xl text-purple-500/10 font-serif leading-none rotate-180">"</div>

          <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl shadow-xl shadow-indigo-500/30 mb-8">
              {activeTestimonial.avatar}
            </div>
            
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium mb-8 max-w-3xl min-h-[120px] flex items-center justify-center">
              "{activeTestimonial.content}"
            </p>
            
            <div>
              <h4 className="text-white font-bold text-lg">{activeTestimonial.name}</h4>
              <p className="text-indigo-400 text-sm">{activeTestimonial.role}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all"
            >
              ←
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => animateSlide(() => setActiveIdx(i))}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-indigo-500 w-8' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
