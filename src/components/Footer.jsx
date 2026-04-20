import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const SERVICES_LINKS = [
  'Mobile App Development', 'Web App Development', 'UI/UX Design',
  'Desktop Apps', 'IT Consulting', 'Data & Analytics',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 pt-16 md:pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Main footer card */}
        <div className="glass-panel p-8 sm:p-12 md:p-16 rounded-[2.5rem] md:rounded-[3rem] mb-8"
          style={{ border: '1px solid rgba(200,220,255,0.55)' }}>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block font-display font-black text-2xl md:text-3xl text-slate-950 tracking-tighter mb-5">
                Anuprayog<span className="text-blue-600">.</span>
              </Link>
              <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-sm">
                Your Trusted Technology Partner for Business. We build world-class digital experiences that drive growth, streamline operations, and exceed expectations.
              </p>
              <div className="flex gap-3 flex-wrap">
                {['LinkedIn', 'Twitter', 'Instagram'].map(s => (
                  <a
                    key={s}
                    href="#"
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center gap-1.5"
                  >
                    {s} <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-slate-950 text-base mb-6 tracking-tight">Services</h4>
              <ul className="space-y-4">
                {SERVICES_LINKS.map(name => (
                  <li key={name}>
                    <a
                      href="#services-trigger"
                      onClick={e => { e.preventDefault(); window.lenis?.scrollTo('#services-trigger') }}
                      className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-slate-950 text-base mb-6 tracking-tight">Contact</h4>
              <ul className="space-y-5">
                <li>
                  <a href="tel:+919890097984" className="flex items-start gap-3 text-slate-600 hover:text-blue-600 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm leading-snug">+91 989 009 7984</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@anuprayogcreations.in" className="flex items-start gap-3 text-slate-600 hover:text-blue-600 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm leading-snug break-all">contact@anuprayogcreations.in</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm leading-snug">Kothrud, Pune, India</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-2 text-sm font-medium text-slate-400">
          <p>© {year} Anuprayog Creations Pvt. Ltd. All rights reserved.</p>
          <p>Built with <span className="text-red-400 mx-1">♥</span> in Pune, India</p>
        </div>
      </div>
    </footer>
  )
}
