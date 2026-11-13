import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const getParticleCount = () => {
  if (typeof window === 'undefined') return 48
  const narrow = window.matchMedia('(max-width: 767px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (narrow || coarse) return 22
  return 48
}

const HeroBackground = ({ color = '92, 225, 230' }) => {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    let raf = 0
    let visible = true
    let count = getParticleCount()

    const createParticles = (n) =>
      Array.from({ length: n }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.00008,
        vy: (Math.random() - 0.5) * 0.00008,
        a: Math.random() * 0.35 + 0.08,
      }))

    let particles = createParticles(count)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.matchMedia('(max-width: 767px)').matches ? 1.5 : 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const next = getParticleCount()
      if (next !== count) {
        count = next
        particles = createParticles(count)
      }
    }

    const draw = () => {
      if (!visible) return
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.a})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
      if (visible) raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduceMotion, color])

  return (
    <div className='hero-bg absolute inset-0 overflow-hidden pointer-events-none' aria-hidden='true'>
      <div className='hero-bg-grid absolute inset-0' />
      <div className='hero-bg-glow absolute inset-0' />
      {!reduceMotion && (
        <canvas
          ref={canvasRef}
          className='absolute inset-0 w-full h-full opacity-60 max-lg:opacity-45'
        />
      )}
    </div>
  )
}

export default HeroBackground
