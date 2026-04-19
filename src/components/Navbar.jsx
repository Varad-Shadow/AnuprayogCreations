import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Services', href: 'services-trigger' },
  { label: 'Contact', href: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navRef = useRef()
  const location = useLocation()
  const isPortfolio = location.pathname === '/portfolio'

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
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 pointer-events-none transition-transform duration-500">
      <div 
        ref={navRef}
        className={`pointer-events-auto flex items-center gap-2 md:gap-6 px-8 py-4 rounded-full transition-all duration-500 ${
          scrolled ? 'bg-white/70 backdrop-blur-md shadow-lg border border-white/40 scale-95' : 'bg-white/50 backdrop-blur-sm shadow-sm border border-transparent scale-100'
        }`}
      >
        <Link to="/" className="font-display font-black text-2xl text-slate-900 mr-4 tracking-tighter">
          Anuprayog<span className="text-indigo-600">.</span>
        </Link>

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
    </nav>
  )
}
