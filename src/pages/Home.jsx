import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Smartphone, Monitor, Palette, Terminal, PenTool, Lightbulb, Database, BookOpen } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { id: 'mobile', title: 'Mobile App Development', desc: 'We employ masterful techniques to make mobile app development process a total success. We are competent enough to cater to your mobile app development needs expertly.', icon: <Smartphone className="w-8 h-8 text-indigo-600 mb-4" /> },
  { id: 'web', title: 'Web App Development', desc: 'Web app development is one of our core competencies. We offer bang-up web app development solutions via the cutting-edge tools and techniques.', icon: <Monitor className="w-8 h-8 text-indigo-600 mb-4" /> },
  { id: 'uiux', title: 'UI/UX Design', desc: 'Get A-one and wide-ranging UX/UI designs from us. We deploy innovative internet app technologies to come up with best UX/UI design for you.', icon: <Palette className="w-8 h-8 text-indigo-600 mb-4" /> },
  { id: 'desktop', title: 'Desktop App development', desc: 'From delivering regular landing page to sophisticated tailor-made desktop app development solutions, we prove a helping hand for our clients by catering to their business goals successfully.', icon: <Terminal className="w-8 h-8 text-indigo-600 mb-4" /> },
  { id: 'content', title: 'CONTENT AND PUBLISHING', desc: 'We offer engaging, value-added content & publishing services that scale sales growth, rationalize operations, and ensure editorial quality at the best.', icon: <PenTool className="w-8 h-8 text-indigo-600 mb-4" /> },
  { id: 'consulting', title: 'IT CONSULTING', desc: 'Our IT consulting can help your organization perform exceptionally highly and let you deal with day-to-day business operations excellently.', icon: <Lightbulb className="w-8 h-8 text-indigo-600 mb-4" /> },
  { id: 'data', title: 'Data Management and analysis', desc: 'We mines the data across a vast range of touch points to predict technology trend compnies to grow across industries. Analyze and transform data to predicted pipleline gives enormous quality result for company Giants.', icon: <Database className="w-8 h-8 text-indigo-600 mb-4" /> },
  { id: 'placement', title: 'Placement Training Program', desc: 'Learn to build an end-to-end mobile application, test and deploy code.. Complete iOS Developer Course to master these skills and get a guaranteed job.', icon: <BookOpen className="w-8 h-8 text-indigo-600 mb-4" /> },
]

const TESTIMONIALS = [
  { n: "Brad Jasper", r: "Entrepreneur", t: "Anuprayog is a great team of programmers and a good addition to any team! Their dedication to quality and timely delivery is commendable." },
  { n: "Tejas B", r: "Funswitch Technologies", t: "Team Anuprayog was very professional and built a high quality product. He was very receptive to feedback and fixed each bug that we found during initial testing..." },
  { n: "Ahmad Hassan", r: "Freelancer", t: "Overall, we are pleased with the work team Anuprayog provided and plan to hire them again for future extensions..." },
  { n: "Sarah Jenkins", r: "Product Manager", t: "The level of detail and care they put into our application was extraordinary. The design is sleek and the performance is incredibly fast." }
]

export default function Home() {
  const heroTextRef = useRef()
  
  useEffect(() => {
    if (!heroTextRef.current) return
    const chars = heroTextRef.current.querySelectorAll('.char')
    gsap.fromTo(chars, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.02, 
        ease: "power3.out",
        delay: 0.2 
      }
    )
  }, [])

  const renderSplitText = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block whitespace-nowrap mr-[0.2em]">
        {word.split('').map((char, i) => (
          <span key={i} className="char inline-block">{char}</span>
        ))}
      </span>
    ))
  }

  return (
    <div className="w-full relative pointer-events-auto">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-32 lg:pt-0">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:w-3/5">
          <div className="hero-content">
            <h1 ref={heroTextRef} className="font-display font-bold text-5xl md:text-7xl xl:text-[5.5rem] leading-[1.1] text-slate-900 mb-8 tracking-tight">
              {renderSplitText("Your Trusted Technology partner for Business")}
            </h1>
            
            <button className="btn-primary group relative overflow-hidden mt-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
              <span className="relative z-10 font-bold tracking-wider uppercase text-white">WELCOME TO ANUPRAYOG</span>
              <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="glass-panel p-10 md:p-14 rounded-[3rem]">
            <span className="section-tag mb-6 inline-block">Fresh creative minds</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-8 text-slate-900 tracking-tight">
              Reasons to <span className="text-indigo-600">choose</span>
            </h2>
            <div className="space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                We are focusing to become a pioneer in providing Web Design, Web Development Services, Mobile Apps Development, Desktop App Development, E-Commerce Web Testing services globally within the next 5 years. We excel in delivering outstanding / world-class RESULTS. We exceed our customers' expectations every time.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                Our customers and partners can always trust us to conduct business with honesty and integrity. We are dependable and reliable in everything we do. We always deliver what we promise and we do it on time. We believe that you care for your business. We take your unbaked app ideas to a new height and turn it into user-engaging products.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 h-[600px]">
            <div className="h-full flex items-end pb-12">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80" 
                alt="Modern Workspace"
                className="w-full h-4/5 object-cover rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-transform duration-700 hover:scale-[1.02] border border-white/40"
              />
            </div>
            <div className="h-full flex items-start pt-12">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80" 
                alt="Technology Architecture"
                className="w-full h-4/5 object-cover rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-transform duration-700 hover:scale-[1.02] border border-white/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section: Premium Bento Box */}
      <section id="services-trigger" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display font-bold text-5xl text-slate-900 tracking-tight">
              What We <span className="text-indigo-600">Do?</span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg">Comprehensive technology solutions for your business needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <div 
                key={service.id}
                className={`glass-card relative overflow-hidden p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] group border border-white/60 hover:border-indigo-200 ${idx === 0 || idx === 3 || idx === 4 || idx === 7 ? 'lg:col-span-2' : ''}`}
              >
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50/80 flex items-center justify-center mb-6 border border-indigo-100/50 group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(service.icon, { className: 'w-7 h-7 text-indigo-600 mb-0' })}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-normal">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section: Manual Horizontal Scroll */}
      <section id="testimonials" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
          <div>
            <h2 className="font-display font-bold text-5xl text-slate-900 tracking-tight">Client <span className="text-indigo-600">Reviews</span></h2>
            <p className="mt-4 text-slate-600 text-lg font-medium">Swipe or scroll to see what our clients say.</p>
          </div>
          <div className="hidden md:flex gap-4">
             {/* Decorative hints for scroll */}
             <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center border border-white/60 opacity-50"><span className="text-xl">←</span></div>
             <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center border border-white/60"><span className="text-xl">→</span></div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="w-full relative px-6 md:px-0">
          <div className="flex gap-8 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar md:pl-6 max-w-7xl mx-auto cursor-grab active:cursor-grabbing">
            {TESTIMONIALS.map((test, i) => (
              <div key={i} className="glass-panel w-[350px] md:w-[450px] flex-shrink-0 p-10 rounded-[2.5rem] snap-center hover:-translate-y-2 transition-transform duration-500">
                <div className="text-6xl text-indigo-300 leading-none mb-2 font-serif opacity-50">"</div>
                <p className="text-slate-700 font-medium text-lg mb-10 leading-relaxed min-h-[120px]">
                  {test.t}
                </p>
                <div className="flex items-center gap-5 mt-auto">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold text-xl border border-white/60 shadow-sm">
                    {test.n.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{test.n}</h4>
                    <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase mt-1">{test.r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div className="glass-panel p-10 md:p-14 rounded-[3rem]">
            <h2 className="font-display font-bold text-5xl text-slate-900 mb-4 tracking-tight">
              Get In <span className="text-indigo-600">Touch</span>
            </h2>
            <p className="text-slate-600 text-lg mb-10 font-normal">
              Ready to elevate your business with cutting-edge technology? Send us a message and we'll get back to you shortly.
            </p>

            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent perfectly!'); e.target.reset(); }}>
              <input type="text" placeholder="Name" className="w-full bg-white/80 p-5 rounded-2xl border border-white/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]" required />
              <input type="email" placeholder="Email" className="w-full bg-white/80 p-5 rounded-2xl border border-white/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]" required />
              <input type="text" placeholder="Subject" className="w-full bg-white/80 p-5 rounded-2xl border border-white/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]" required />
              <textarea placeholder="Message" rows="5" className="w-full bg-white/80 p-5 rounded-2xl border border-white/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)] resize-none" required></textarea>
              
              <button type="submit" className="btn-primary w-full md:w-fit mt-2 py-5 px-10">Send Message</button>
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-12 pl-4 lg:pl-12 border-l-2 border-indigo-100/50">
              <div className="group cursor-default">
                <p className="text-sm text-indigo-600 mb-2 font-bold uppercase tracking-wider transition-colors group-hover:text-indigo-700">Call Us</p>
                <p className="font-bold text-3xl text-slate-900 group-hover:translate-x-2 transition-transform duration-300">+91 989 009 7984</p>
              </div>
              <div className="group cursor-default">
                <p className="text-sm text-indigo-600 mb-2 font-bold uppercase tracking-wider transition-colors group-hover:text-indigo-700">Email Us</p>
                <p className="font-bold text-3xl text-slate-900 group-hover:translate-x-2 transition-transform duration-300">contact@anuprayogcreations.in</p>
              </div>
              <div className="group cursor-default">
                <p className="text-sm text-indigo-600 mb-2 font-bold uppercase tracking-wider transition-colors group-hover:text-indigo-700">Visit Us</p>
                <p className="font-bold text-3xl text-slate-900 group-hover:translate-x-2 transition-transform duration-300">Kothrud, Pune.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
