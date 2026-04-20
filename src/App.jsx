import React, { useEffect, Component, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'

// Lazy-load the heavy 3D component so the page always renders first
const QuantumCore = lazy(() => import('./components/QuantumCore'))

/* ─── Error Boundary ─────────────────────────────────────── */
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

/* ─── Scroll To Top ─────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.lenis ? window.lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* ─── App Content ───────────────────────────────────────── */
function AppContent() {
  return (
    <>
      <ScrollToTop />

      {/* 3D Background — fixed, behind everything, crash-isolated */}
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <QuantumCore />
        </Suspense>
      </ErrorBoundary>

      {/* Page layout */}
      <div className="relative w-full overflow-x-hidden min-h-screen flex flex-col" style={{ zIndex: 1 }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

/* ─── Root App ──────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
    window.lenis = lenis

    let rafId
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)

    return () => { cancelAnimationFrame(rafId); lenis.destroy(); window.lenis = null }
  }, [])

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
