import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Smartphone, Monitor, Palette, Terminal,
  PenTool, Lightbulb, Database, BookOpen,
  ArrowRight, Zap, Shield, Clock, Star
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ─────────────────────────────────────────────────── */
const SERVICES = [
  { id: 'mobile',    icon: Smartphone, title: 'Mobile App Development',    span: 2, desc: 'Expert iOS & Android development using React Native and Flutter. From MVP to enterprise-scale apps — we ship on time.' },
  { id: 'web',       icon: Monitor,    title: 'Web App Development',        span: 1, desc: 'Scalable, performant web applications with modern frameworks — React, Next.js, Node.js.' },
  { id: 'uiux',      icon: Palette,    title: 'UI / UX Design',             span: 1, desc: 'Research-driven, pixel-perfect interfaces that convert. We design for delight and usability.' },
  { id: 'desktop',   icon: Terminal,   title: 'Desktop App Development',    span: 1, desc: 'Cross-platform Electron & Tauri apps. Performant, native-feeling desktop experiences.' },
  { id: 'content',   icon: PenTool,    title: 'Content & Publishing',       span: 1, desc: 'Engaging, SEO-optimised content strategies that build authority and drive organic growth.' },
  { id: 'consult',   icon: Lightbulb,  title: 'IT Consulting',              span: 1, desc: 'Strategic technology guidance to streamline operations and align IT with business goals.' },
  { id: 'data',      icon: Database,   title: 'Data Management & Analysis', span: 1, desc: 'End-to-end data pipelines, dashboards and ML-ready insights that drive smarter decisions.' },
  { id: 'placement', icon: BookOpen,   title: 'Placement Training',         span: 2, desc: 'Industry-aligned bootcamps covering full-stack development, testing & job placement support.' },
]

const STATS = [
  { v: '50+',  label: 'Projects Delivered', icon: Zap },
  { v: '98%',  label: 'Client Satisfaction', icon: Star },
  { v: '5+',   label: 'Years Experience',    icon: Clock },
  { v: '20+',  label: 'Technologies',        icon: Shield },
]

const TESTIMONIALS = [
  { name: 'Brad Jasper',  role: 'Entrepreneur',           text: 'Anuprayog is a great team of programmers and a good addition to any team! Their dedication to quality and timely delivery is commendable.' },
  { name: 'Tejas B',      role: 'Funswitch Technologies',  text: 'Team Anuprayog was very professional and built a high quality product. Very receptive to feedback and fixed every bug found during testing.' },
  { name: 'Ahmad Hassan', role: 'Freelancer',              text: "Overall we are very pleased with Anuprayog's work and plan to hire them again for future projects. Reliable and talented team." },
  { name: 'Sarah Jenkins',role: 'Product Manager',         text: 'The level of detail and care they put into our application was extraordinary. Sleek design, incredibly fast performance.' },
]

/* ─── Scroll Reveal Hook ────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-el')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => els.forEach(el => io.unobserve(el))
  }, [])
}

/* ─── Split-text Hero ───────────────────────────────────────── */
function SplitText({ text, className = '' }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <span key={i} className="char" style={{ opacity: 0 }}>
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </span>
  )
}

/* ══════════════════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef()
  useReveal()

  /* Hero text-reveal animation */
  useEffect(() => {
    if (!heroRef.current) return
    const isMobile = window.innerWidth < 768
    const blurFx = isMobile ? 'blur(0px)' : 'blur(12px)'

    const chars = heroRef.current.querySelectorAll('.char')
    gsap.fromTo(chars,
      { opacity: 0, y: 60, rotationX: -50, filter: blurFx },
      { opacity: 1, y: 0, rotationX: 0, filter: 'blur(0px)', duration: 1.4, stagger: 0.025, ease: 'power3.out', delay: 0.2 }
    )
    gsap.fromTo('.hero-fade',
      { opacity: 0, y: 30, filter: blurFx },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, stagger: 0.2, ease: 'power3.out', delay: 0.8 }
    )
  }, [])

  return (
    <div className="relative w-full">

      {/* Cinematic noise overlay */}
      <div className="hidden md:block pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

        {/* CSS background orbs (supplement the 3D) */}
        <div className="orb w-[600px] h-[600px] bg-blue-200/40  top-[-100px] right-[-100px] opacity-60 mix-blend-multiply" />
        <div className="orb w-[400px] h-[400px] bg-cyan-200/30  bottom-[80px]  right-[200px]  opacity-50 mix-blend-multiply" />

        <div className="relative z-10 mx-auto px-6 md:px-12 lg:px-[10%] w-full pt-28 md:pt-24 pb-16">
          {/* Badge */}
          <div className="hero-fade mb-7" style={{ opacity: 0 }}>
            <span className="section-tag" style={{ boxShadow: '0 8px 32px rgba(37,99,235,0.2)' }}>
              <span className="glow-dot" />
              WELCOME TO ANUPRAYOG
            </span>
          </div>

          {/* Headline — max-w-3xl keeps it left, away from 3D */}
          <h1
            ref={heroRef}
            className="max-w-3xl font-display font-black tracking-tight text-slate-950 leading-tight text-4xl sm:text-5xl lg:text-7xl mb-8"
            style={{ perspective: '800px' }}
          >
            <SplitText text="Your Trusted" /><br />
            <span 
              className="gradient-text hero-fade inline-block relative" 
              style={{ opacity: 0, filter: 'drop-shadow(0 12px 24px rgba(37,99,235,0.35))' }}
            >
              Technology Partner
            </span>
            <br />
            <SplitText text="for Business" />
          </h1>

          {/* Sub-headline */}
          <p
            className="hero-fade max-w-xl text-slate-600 text-lg md:text-xl leading-relaxed mb-10 font-normal"
            style={{ opacity: 0 }}
          >
            We craft world-class digital experiences — mobile apps, web platforms and IT consulting — that drive measurable business growth.
          </p>

          {/* CTAs */}
          <div className="hero-fade flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <button
              className="btn-primary"
              onClick={() => window.lenis?.scrollTo('#services-trigger', { offset: -80 })}
            >
              Explore Services <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="btn-outline"
              onClick={() => window.lenis?.scrollTo('#contact', { offset: -80 })}
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Available badge */}
        <div className="absolute bottom-10 right-8 hidden lg:flex items-center gap-3 glass-panel px-5 py-3.5 rounded-2xl">
          <div className="glow-dot animate-pulse" />
          <span className="text-sm font-semibold text-slate-600">Available for New Projects</span>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════════════════ */}
      <section className="py-14 relative z-10">
        <div className="mx-auto px-6 md:px-12 lg:px-[10%]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-el">
            {STATS.map(({ v, label, icon: Icon }, i) => (
              <div
                key={i}
                className="glass-card rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-display font-black text-3xl md:text-4xl text-slate-950">{v}</span>
                <span className="text-sm text-slate-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═══════════════════════════════════════════════ */}
      <section id="about" className="py-20 md:py-32 relative z-10">
        <div className="mx-auto px-6 md:px-12 lg:px-[10%]">
          <div className="text-center mb-16 reveal-el">
            <span className="section-tag">Who We Are</span>
            <h2 className="font-display font-black mt-5 text-slate-950 tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Reasons to <span className="gradient-text">Choose Anuprayog</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Text Card */}
            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] reveal-el">
              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-5">
                We are focusing to become a pioneer in providing Web Design, Web Development, Mobile Apps, Desktop Apps, E-Commerce and Testing services globally. We excel in delivering outstanding, world-class results and exceed our customers' expectations every single time.
              </p>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8">
                Our customers and partners can always trust us to conduct business with honesty and integrity. We deliver what we promise — on time, every time. We believe in your business and we take your ideas to new heights.
              </p>
              <ul className="space-y-3">
                {['Honest & Transparent Communication', 'On-Time Delivery, Every Time', 'World-Class Code Quality', 'Dedicated Post-Launch Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-5 h-5 shrink-0 rounded-full bg-blue-600 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                        <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Images */}
            <div className="flex flex-col gap-5 reveal-el reveal-delay-2">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=90"
                alt="High-tech processor circuit board"
                className="w-full h-72 md:h-80 object-cover rounded-[2rem] shadow-2xl hover:scale-[1.015] transition-transform duration-700"
                loading="lazy"
              />
              <div className="grid grid-cols-2 gap-5">
                <img
                  src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80"
                  alt="Lab environment"
                  className="w-full h-44 object-cover rounded-[1.5rem] shadow-lg hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-44 object-cover rounded-[1.5rem] shadow-lg hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ════════════════════════════════════════════ */}
      <section id="services-trigger" className="py-20 md:py-32 relative z-10">
        <div className="mx-auto px-6 md:px-12 lg:px-[10%]">
          <div className="text-center mb-16 reveal-el">
            <span className="section-tag">What We Do</span>
            <h2 className="font-display font-black mt-5 text-slate-950 tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Comprehensive <span className="gradient-text">Technology Solutions</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">From concept to deployment — every aspect of your digital journey, covered.</p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              const span = s.span === 2 ? 'lg:col-span-2' : ''
              return (
                <div
                  key={s.id}
                  className={`service-card glass-card rounded-[2rem] p-7 md:p-9 group cursor-default
                    hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(37,99,235,0.13)]
                    transition-all duration-400 reveal-el ${span}`}
                  style={{ transitionDelay: `${i * 55}ms` }}
                >
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-50/70 to-cyan-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-400">
                      <Icon className="w-7 h-7 text-blue-600" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-950 mb-3 tracking-tight">{s.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{s.desc}</p>
                    <div className="mt-6 flex items-center gap-1.5 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════ */}
      <section id="testimonials" className="py-20 md:py-32 relative z-10 overflow-hidden">
        <div className="mx-auto px-6 md:px-12 lg:px-[10%] mb-14">
          <div className="reveal-el text-center">
            <span className="section-tag">Social Proof</span>
            <h2 className="font-display font-black mt-5 text-slate-950 tracking-tight text-3xl sm:text-4xl md:text-5xl">
              What Clients <span className="gradient-text">Say About Us</span>
            </h2>
          </div>
        </div>

        {/* Infinite marquee slider — both original and clone for seamless loop */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8faff] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8faff] to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="testimonial-track flex gap-6 py-4">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[340px] md:w-[400px] glass-panel rounded-[2rem] p-8"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-base leading-relaxed mb-8">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-950">{t.name}</p>
                      <p className="text-slate-500 text-xs font-semibold tracking-wide uppercase">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════════ */}
      <section id="contact" className="py-20 md:py-32 relative z-10">
        <div className="mx-auto px-6 md:px-12 lg:px-[10%]">
          <div className="text-center mb-16 reveal-el">
            <span className="section-tag">Get In Touch</span>
            <h2 className="font-display font-black mt-5 text-slate-950 tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
              Have a project idea? Drop us a message — we respond within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 md:gap-14">
            {/* Form */}
            <div className="lg:col-span-3 glass-panel p-8 md:p-12 rounded-[2.5rem] reveal-el">
              <form
                className="flex flex-col gap-5"
                onSubmit={e => { e.preventDefault(); alert("Message sent! We'll get back to you shortly."); e.target.reset() }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  {[['Name', 'text', 'Your full name'], ['Email', 'email', 'your@email.com']].map(([label, type, ph]) => (
                    <label key={label} className="flex flex-col gap-2">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{label}</span>
                      <input
                        type={type}
                        placeholder={ph}
                        required
                        className="bg-white/90 px-5 py-4 rounded-2xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-base"
                      />
                    </label>
                  ))}
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Subject</span>
                  <input
                    type="text"
                    placeholder="Project inquiry / Collaboration"
                    required
                    className="bg-white/90 px-5 py-4 rounded-2xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-base"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Message</span>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project..."
                    required
                    className="bg-white/90 px-5 py-4 rounded-2xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all resize-none text-base"
                  />
                </label>
                <button type="submit" className="btn-primary self-start mt-1 px-10 py-5 text-base">
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 flex flex-col gap-5 justify-center reveal-el reveal-delay-2">
              {[
                { label: 'Call Us',   value: '+91 989 009 7984',              href: 'tel:+919890097984' },
                { label: 'Email Us',  value: 'contact@anuprayogcreations.in', href: 'mailto:contact@anuprayogcreations.in' },
                { label: 'Visit Us',  value: 'Kothrud, Pune, India',          href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="glass-card p-7 rounded-2xl group hover:-translate-y-1 transition-transform duration-300">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">{label}</p>
                  {href
                    ? <a href={href} className="font-bold text-lg text-slate-950 hover:text-blue-600 transition-colors break-all">{value}</a>
                    : <p className="font-bold text-lg text-slate-950">{value}</p>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
