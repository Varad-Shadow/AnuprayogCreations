import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'

gsap.registerPlugin(ScrollTrigger)

const REASONS = [
  {
    icon: '🎯',
    title: 'Pioneer Vision',
    text: 'Focusing to become a global pioneer in Web Design, Development, Mobile & Desktop Apps, and E-Commerce Testing within 5 years.',
  },
  {
    icon: '🏆',
    title: 'World-Class Results',
    text: 'We excel in delivering outstanding, world-class results that exceed our customers\' expectations every single time.',
  },
  {
    icon: '🤝',
    title: 'Honesty & Integrity',
    text: 'Our customers and partners can always trust us to conduct business with complete honesty, integrity, and reliability.',
  },
  {
    icon: '⏱️',
    title: 'On-Time Delivery',
    text: 'We always deliver what we promise, and we do it on time. Your deadlines matter as much to us as they do to you.',
  },
  {
    icon: '💡',
    title: 'Innovation First',
    text: 'We take your unbaked app ideas to a new height and turn them into user-engaging, market-ready products.',
  },
  {
    icon: '🌍',
    title: 'Global Standards',
    text: 'We believe in your business and apply global best practices to make it thrive in competitive markets.',
  },
]

function ReasonCard({ reason, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const cardRef = useRef()

  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out',
        }
      )
    }
  }, [inView, index])

  return (
    <div ref={(el) => { ref(el); cardRef.current = el }} className="glass-card rounded-2xl p-6 group opacity-0">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {reason.icon}
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:gradient-text transition-all">
            {reason.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">{reason.text}</p>
        </div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const headingRef = useRef()
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (inView && headingRef.current) {
      gsap.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      )
    }
  }, [inView])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background blobs */}
      <div className="blob w-72 h-72 bg-purple-700 top-20 right-0 opacity-10 animation-delay-2000" />
      <div className="blob w-96 h-96 bg-cyan-700 bottom-0 -left-20 opacity-10" />

      {/* Glow line top */}
      <div className="glow-line mb-20" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Images */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/30 animate-float">
              <img
                src="/about_developer.png"
                alt="Focused developer working at a glowing laptop"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/80 via-transparent to-transparent" />
              {/* Floating overlay card */}
              <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg">🚀</div>
                  <div>
                    <div className="text-white font-semibold text-sm">Innovative Solutions</div>
                    <div className="text-slate-400 text-xs">Cutting-edge technology stack</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary image */}
            <div className="absolute -bottom-8 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-2 border-indigo-500/30 animate-float-slow animation-delay-400">
              <img
                src="/about_mobile_ui.png"
                alt="Close-up of mobile app UI"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
            </div>

            {/* Stats badge */}
            <div className="absolute -top-6 -left-6 glass rounded-2xl p-4 text-center animate-float animation-delay-600">
              <div className="font-black text-3xl gradient-text">5+</div>
              <div className="text-slate-400 text-xs mt-1">Years Serving<br/>Global Clients</div>
            </div>
          </div>

          {/* Right: Content */}
          <div ref={headingRef} className="flex flex-col gap-6">
            <span className="section-tag w-fit">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              About Us
            </span>

            <h2 className="font-display font-black text-4xl md:text-5xl leading-tight text-white">
              Reasons to{' '}
              <span className="gradient-text">Choose</span>{' '}
              Anuprayog
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed">
              We are focusing to become a pioneer in providing <strong className="text-indigo-300">Web Design, Web Development, 
              Mobile Apps, Desktop App Development, and E-Commerce Web Testing services globally</strong> within the next 5 years. 
              We excel in delivering outstanding, world-class RESULTS.
            </p>

            <p className="text-slate-500 leading-relaxed">
              We exceed our customers' expectations every time. Our customers and partners can always trust us 
              to conduct business with honesty and integrity. We always deliver what we promise and we do it on time.
            </p>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                import('gsap').then(({ gsap }) => {
                  import('gsap/ScrollToPlugin').then(({ ScrollToPlugin }) => {
                    gsap.registerPlugin(ScrollToPlugin)
                    gsap.to(window, { duration: 1.2, scrollTo: '#contact', ease: 'power3.inOut' })
                  })
                })
              }}
              className="btn-primary w-fit"
            >
              <span className="relative z-10">Partner With Us</span>
            </a>
          </div>
        </div>

        {/* Reason cards grid */}
        <div className="mt-24">
          <h3 className="font-display font-bold text-2xl text-center text-white mb-12">
            Why businesses worldwide{' '}
            <span className="gradient-text">trust us</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REASONS.map((reason, index) => (
              <ReasonCard key={reason.title} reason={reason} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="glow-line mt-20" />
    </section>
  )
}
