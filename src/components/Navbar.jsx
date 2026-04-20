import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',     href: 'home' },
  { label: 'About',    href: 'about' },
  { label: 'Services', href: 'services-trigger' },
  { label: 'Contact',  href: 'contact' },
]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('home')
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const navRef     = useRef()
  const location   = useLocation()
  const isPortfolio = location.pathname === '/portfolio'

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isPortfolio) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-30% 0px -70% 0px' }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(s => observer.observe(s))
    return () => sections.forEach(s => observer.unobserve(s))
  }, [isPortfolio])

  const handleNavClick = (e, href) => {
    if (isPortfolio) return
    e.preventDefault()
    setMobileOpen(false)
    window.lenis?.scrollTo(`#${href}`, { offset: -80 })
  }

  const handleMagnetic = e => {
    const r = e.currentTarget.getBoundingClientRect()
    gsap.to(e.currentTarget, {
      x: (e.clientX - r.left - r.width  / 2) * 0.3,
      y: (e.clientY - r.top  - r.height / 2) * 0.3,
      duration: 0.4, ease: 'power4.out'
    })
  }
  const resetMagnetic = e => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.4, ease: 'power4.out' })

  const linkCls = (active) =>
    `relative text-sm font-bold uppercase tracking-wider py-2 px-3 rounded-full transition-colors ${
      active ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 md:mt-5 pointer-events-none px-4 md:px-0">
      <div
        ref={navRef}
        className={`pointer-events-auto w-full md:w-auto flex items-center justify-between md:justify-start gap-2 md:gap-5 px-4 md:px-8 py-3 md:py-3.5 rounded-2xl md:rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(37,99,235,0.10)] border border-white/60'
            : 'bg-white/55 backdrop-blur-md border border-white/40'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="font-display font-black text-xl md:text-2xl text-slate-950 md:mr-4 tracking-tighter">
          Anuprayog<span className="text-blue-600">.</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {!isPortfolio
            ? NAV_LINKS.map(({ label, href }) => {
                const active = activeSection === href
                return (
                  <a
                    key={label}
                    href={`#${href}`}
                    onClick={e => handleNavClick(e, href)}
                    onMouseMove={handleMagnetic}
                    onMouseLeave={resetMagnetic}
                    className={linkCls(active)}
                  >
                    {label}
                    {active && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-blue-600 rounded-full" />}
                  </a>
                )
              })
            : NAV_LINKS.map(({ label, href }) => (
                <Link key={label} to={`/#${href}`} onMouseMove={handleMagnetic} onMouseLeave={resetMagnetic} className={linkCls(false)}>
                  {label}
                </Link>
              ))
          }
          <Link
            to="/portfolio"
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className={`ml-1 text-sm font-bold uppercase tracking-wider py-2.5 px-6 rounded-full transition-all shadow-sm ${
              isPortfolio ? 'bg-blue-600 text-white' : 'bg-slate-950 text-white hover:bg-blue-600'
            }`}
          >
            Portfolio
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute top-[4.5rem] left-4 right-4 pointer-events-auto md:hidden glass-panel rounded-2xl p-3 shadow-2xl border border-white/60">
          <div className="flex flex-col gap-1">
            {!isPortfolio
              ? NAV_LINKS.map(({ label, href }) => {
                  const active = activeSection === href
                  return (
                    <a
                      key={label}
                      href={`#${href}`}
                      onClick={e => handleNavClick(e, href)}
                      className={`text-sm font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-colors ${
                        active ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/60'
                      }`}
                    >
                      {label}
                    </a>
                  )
                })
              : NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    to={`/#${href}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-bold uppercase tracking-wider py-3 px-4 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors"
                  >
                    {label}
                  </Link>
                ))
            }
            <Link
              to="/portfolio"
              onClick={() => setMobileOpen(false)}
              className={`mt-1 text-sm font-bold uppercase tracking-wider py-3 px-4 rounded-xl text-center transition-all ${
                isPortfolio ? 'bg-blue-600 text-white' : 'bg-slate-950 text-white hover:bg-blue-600'
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
