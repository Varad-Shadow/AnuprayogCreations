import React, { useEffect, useRef } from 'react'

export default function PremiumTechBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W, H

    // Orbs configuration
    const orbs = [
      { x: 0.75, y: 0.25, r: 0.35, color: [99, 102, 241], speed: 0.0003, phase: 0 },       // indigo
      { x: 0.15, y: 0.65, r: 0.30, color: [139, 92, 246], speed: 0.00025, phase: 2.1 },    // violet
      { x: 0.85, y: 0.80, r: 0.25, color: [6, 182, 212], speed: 0.0004, phase: 4.2 },      // cyan
      { x: 0.45, y: 0.10, r: 0.22, color: [236, 72, 153], speed: 0.00035, phase: 1.0 },    // pink
      { x: 0.55, y: 0.90, r: 0.20, color: [16, 185, 129], speed: 0.0003, phase: 3.5 },     // emerald
    ]

    // Floating particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002 - 0.0001,
      alpha: Math.random() * 0.5 + 0.1,
      color: [99 + Math.random() * 137, 92 + Math.random() * 10, 200 + Math.random() * 56],
    }))

    // Grid lines config
    const GRID_COLS = 12
    const GRID_ROWS = 8

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    function drawBackground() {
      // Pure crisp white background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)
    }

    function drawOrbs(time) {
      orbs.forEach(orb => {
        const cx = (orb.x + Math.sin(time * orb.speed + orb.phase) * 0.12) * W
        const cy = (orb.y + Math.cos(time * orb.speed * 1.3 + orb.phase) * 0.10) * H
        const radius = orb.r * Math.min(W, H)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        const [r, g, b] = orb.color
        grad.addColorStop(0, `rgba(${r},${g},${b},0.18)`)
        grad.addColorStop(0.5, `rgba(${r},${g},${b},0.07)`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawGrid(time) {
      ctx.save()
      const colW = W / GRID_COLS
      const rowH = H / GRID_ROWS

      for (let c = 0; c <= GRID_COLS; c++) {
        const pulse = Math.sin(time * 0.0006 + c * 0.3) * 0.3 + 0.7
        ctx.strokeStyle = `rgba(99,102,241,${0.04 * pulse})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(c * colW, 0)
        ctx.lineTo(c * colW, H)
        ctx.stroke()
      }

      for (let r = 0; r <= GRID_ROWS; r++) {
        const pulse = Math.sin(time * 0.0005 + r * 0.4) * 0.3 + 0.7
        ctx.strokeStyle = `rgba(99,102,241,${0.04 * pulse})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, r * rowH)
        ctx.lineTo(W, r * rowH)
        ctx.stroke()
      }
      ctx.restore()
    }

    function drawParticles(time) {
      particles.forEach(p => {
        // Update position
        p.x += p.vx
        p.y += p.vy
        if (p.x < -0.02) p.x = 1.02
        if (p.x > 1.02) p.x = -0.02
        if (p.y < -0.02) p.y = 1.02
        if (p.y > 1.02) p.y = -0.02

        const px = p.x * W
        const py = p.y * H
        const pulse = Math.sin(time * 0.001 + px * 0.01) * 0.2 + 0.8
        const [r, g, b] = p.color

        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * pulse})`
        ctx.fill()
      })
    }

    function drawFloatingRings(time) {
      const rings = [
        { x: 0.78, y: 0.30, size: 0.12, speed: 0.0004, color: [99, 102, 241] },
        { x: 0.20, y: 0.70, size: 0.09, speed: 0.0003, color: [139, 92, 246] },
        { x: 0.60, y: 0.85, size: 0.07, speed: 0.0005, color: [6, 182, 212] },
      ]

      rings.forEach(ring => {
        const cx = (ring.x + Math.sin(time * ring.speed) * 0.05) * W
        const cy = (ring.y + Math.cos(time * ring.speed * 1.2) * 0.05) * H
        const radius = ring.size * Math.min(W, H)
        const [r, g, b] = ring.color
        const spin = time * ring.speed * 2

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(spin)

        // Outer ring
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r},${g},${b},0.12)`
        ctx.lineWidth = 2
        ctx.stroke()

        // Mid ring
        ctx.beginPath()
        ctx.arc(0, 0, radius * 0.65, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r},${g},${b},0.08)`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Inner glow dot
        const dotGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.2)
        dotGrad.addColorStop(0, `rgba(${r},${g},${b},0.5)`)
        dotGrad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = dotGrad
        ctx.beginPath()
        ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })
    }

    function draw(time) {
      drawBackground()
      drawGrid(time)
      drawOrbs(time)
      drawFloatingRings(time)
      drawParticles(time)
      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: -1, pointerEvents: 'none', display: 'block' }}
    />
  )
}
