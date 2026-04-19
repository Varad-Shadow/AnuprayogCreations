import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Services', href: 'services-trigger' },
  { label: 'Contact', href: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef()
  const location = useLocation()
  const isPortfolio = location.pathname === '/portfolio'

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isPortfolio) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { rootMargin: '-30% 0px -70% 0px' })

    const sections = document.querySelectorAll('section[id]')
    sections.forEach(s => observer.observe(s))

    return () => sections.forEach(s => observer.unobserve(s))
  }, [isPortfolio])

  const handleNavClick = (e, href) => {
    if (isPortfolio) return // Link will handle routing
    e.preventDefault()
    setMobileOpen(false)
    if (window.lenis) {
      window.lenis.scrollTo(`#${href}`, { offset: 0 })
    }
  }

  const handleMagnetic = (e) => {
    const item = e.currentTarget
    const rect = item.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(item, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power4.out'
    })
  }

  const resetMagnetic = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'power4.out'
    })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-3 md:mt-6 pointer-events-none transition-transform duration-500 px-3 md:px-0">
      <div 
        ref={navRef}
        className={`pointer-events-auto w-full md:w-auto flex items-center justify-between md:justify-start gap-2 md:gap-6 px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full transition-all duration-500 ${
          scrolled ? 'bg-white/70 backdrop-blur-md shadow-lg border border-white/40 scale-95' : 'bg-white/50 backdrop-blur-sm shadow-sm border border-transparent scale-100'
        }`}
      >
        <Link to="/" className="font-display font-black text-xl md:text-2xl text-slate-900 md:mr-4 tracking-tighter">
          Anuprayog<span className="text-indigo-600">.</span>
        </Link>

        <button
          type="button"
          className="md:hidden h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="hidden md:flex md:items-center md:gap-1">
          {!isPortfolio ? NAV_LINKS.map(({ label, href }) => {
          const isActive = activeSection === href
          return (
            <a
              key={label}
              href={`#${href}`}
              onClick={(e) => handleNavClick(e, href)}
              onMouseMove={handleMagnetic}
              onMouseLeave={resetMagnetic}
              className={`relative text-sm font-bold uppercase tracking-wider transition-colors py-2 px-3 rounded-full ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              {label}
              {isActive && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </a>
          )
          }) : NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            to={`/#${href}`}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="relative text-sm font-bold uppercase tracking-wider transition-colors py-2 px-3 rounded-full text-slate-600 hover:text-indigo-600"
          >
            {label}
          </Link>
          ))}

          <Link
            to="/portfolio"
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className={`relative text-sm font-bold uppercase tracking-wider py-2 px-6 rounded-full transition-all shadow-md ${
              isPortfolio ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'
            }`}
          >
            Portfolio
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute top-[4.8rem] left-3 right-3 pointer-events-auto md:hidden glass-panel border border-white/60 rounded-2xl p-3 shadow-xl">
          <div className="flex flex-col gap-1">
            {!isPortfolio ? NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href
              return (
                <a
                  key={label}
                  href={`#${href}`}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors py-3 px-3 rounded-xl ${isActive ? 'text-indigo-600 bg-indigo-50/80' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60'}`}
                >
                  {label}
                </a>
              )
            }) : NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                to={`/#${href}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold uppercase tracking-wider transition-colors py-3 px-3 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60"
              >
                {label}
              </Link>
            ))}

            <Link
              to="/portfolio"
              onClick={() => setMobileOpen(false)}
              className={`mt-1 text-sm font-bold uppercase tracking-wider py-3 px-3 rounded-xl transition-all text-center ${
                isPortfolio ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'
              }`}
            >
              Portfolio
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
