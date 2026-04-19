import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 pt-20 pb-8 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-panel p-12 md:p-16 rounded-[3rem] mb-8 border border-white/60 bg-white/70 backdrop-blur-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block font-display font-black text-3xl text-slate-900 tracking-tighter mb-6">
                Anuprayog<span className="text-indigo-600">.</span>
              </Link>
              <p className="text-slate-600 text-lg leading-relaxed font-normal pr-8 mb-8">
                Technology Partner for Business. We build digital experiences that drive growth, streamline operations, and exceed expectations.
              </p>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Instagram'].map(s => (
                  <a key={s} href="#" className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-6 tracking-tight">Services</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Mobile App Dev', id: 'mobile' }, 
                  { name: 'Web App Dev', id: 'web' }, 
                  { name: 'UI/UX Design', id: 'uiux' }, 
                  { name: 'Desktop Apps', id: 'desktop' }, 
                  { name: 'IT Consulting', id: 'consulting' }, 
                  { name: 'Data & AI', id: 'data' }
                ].map(s => (
                  <li key={s.name}>
                    <a href="#services-trigger" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#services-trigger'); }} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors flex items-center group">
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-indigo-600 mr-2" />
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-6 tracking-tight">Contact Us</h4>
              <ul className="space-y-5">
                <li>
                  <a href="tel:+919890097984" className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mr-4 transition-colors">
                      <Phone className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                    </div>
                    <span className="font-medium">+91 989 009 7984</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@anuprayogcreations.in" className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mr-4 transition-colors">
                      <Mail className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                    </div>
                    <span className="font-medium">contact@anuprayogcreations.in</span>
                  </a>
                </li>
                <li className="flex items-center text-slate-600">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="font-medium leading-tight">Kothrud, Pune, India</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center px-8 text-sm font-medium text-slate-500">
          <p>© {year} Anuprayog Creations. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with <span className="text-red-500 mx-1">♥</span> in Pune, India</p>
        </div>
      </div>
    </footer>
  )
}
