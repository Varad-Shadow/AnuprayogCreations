import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef()
  const formRef = useRef()
  const infoRef = useRef()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    })

    tl.fromTo(infoRef.current.children, 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    )
    .fromTo(formRef.current, 
      { opacity: 0, x: 50 }, 
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 
      '-=0.4'
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFormState({ name: '', email: '', message: '' })
      alert('Message sent successfully!')
    }, 1500)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background blobs */}
      <div className="blob w-96 h-96 bg-indigo-600/20 bottom-0 left-0 animation-delay-2000" />
      <div className="blob w-[500px] h-[500px] bg-cyan-600/10 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="section-tag mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Let's Connect
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info */}
          <div ref={infoRef} className="flex flex-col gap-8">
            <div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">Ready to start your next big project?</h3>
              <p className="text-slate-400 text-lg">
                Whether you need a new website, mobile app, or IT consulting, our team is here to help you achieve your business goals.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <div className="glass p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📞
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Call Us</div>
                  <div className="text-white font-medium text-lg">+91 989 009 7984</div>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ✉️
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Email Us</div>
                  <div className="text-white font-medium text-lg">contact@anuprayogcreations.in</div>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  📍
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Visit Us</div>
                  <div className="text-white font-medium text-lg">Kothrud, Pune.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="glass-strong rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-500/10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea 
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full mt-4 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <span className="relative z-10 text-xl">↗</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
