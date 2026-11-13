import React, { useCallback, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { bitvionMark } from '../../assets'

const PRIMARY = [
  { label: 'AI', angle: -90, path: '/solutions/artificial-intelligence' },
  { label: 'SOFTWARE', angle: 0, path: '/solutions/software-development' },
  { label: 'AUTOMATION', angle: 90, path: '/solutions/intelligent-automation' },
  { label: 'CLOUD', angle: 180, path: '/solutions/cloud-technology' },
]

const SECONDARY = [
  { label: 'DATA', angle: -135 },
  { label: 'APIs', angle: -45 },
  { label: 'SYSTEMS', angle: 45 },
  { label: 'PRODUCTS', angle: 135 },
]

const polar = (cx, cy, r, deg) => {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const BitvionCore = ({
  variant = 'desktop',
  primary = PRIMARY,
  secondary = SECONDARY,
  accent = '#5CE1E6',
  coreLabel = 'Bitvion Core',
  markSrc = bitvionMark,
  roundMark = false,
  markClassName = '',
  ariaLabel = 'Bitvion Core — intelligent technology network for AI, software, automation and cloud systems',
}) => {
  const reduceMotion = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const wrapRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const isMobile = variant === 'mobile'

  const applyTilt = useCallback(
    (clientX, clientY) => {
      if (reduceMotion || !wrapRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width - 0.5) * (isMobile ? 8 : 12)
      const y = ((clientY - rect.top) / rect.height - 0.5) * (isMobile ? 8 : 12)
      setTilt({ x, y })
    },
    [reduceMotion, isMobile],
  )

  const onMove = useCallback((e) => applyTilt(e.clientX, e.clientY), [applyTilt])
  const onTouch = useCallback(
    (e) => {
      const touch = e.touches[0]
      if (touch) applyTilt(touch.clientX, touch.clientY)
    },
    [applyTilt],
  )
  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  const cx = 210
  const cy = 210
  const orbitR = isMobile ? 132 : 148
  const logoSize = isMobile ? 'w-[100px] sm:w-[108px]' : 'w-[120px] sm:w-[136px]'
  const maxHeight = isMobile ? 260 : 420

  return (
    <div
      ref={wrapRef}
      className={`bitvion-core relative mx-auto w-full ${
        isMobile ? 'bitvion-core--phone max-w-[420px]' : 'max-w-[440px] lg:max-w-[480px]'
      }`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchMove={onTouch}
      onTouchEnd={onLeave}
      role='img'
      aria-label={ariaLabel}
    >
      <div className='bitvion-core-field absolute inset-[4%] rounded-full' aria-hidden='true' />

      <div
        className={`relative ${reduceMotion ? '' : 'bitvion-core-tilt'}`}
        style={
          reduceMotion
            ? undefined
            : { transform: `perspective(900px) rotateX(${-tilt.y * 0.4}deg) rotateY(${tilt.x * 0.4}deg)` }
        }
      >
        <svg
          viewBox='0 0 420 420'
          className='w-full h-auto mx-auto'
          style={{ maxHeight }}
          aria-hidden='true'
        >
          <defs>
            <radialGradient id={`${uid}-core-glow`} cx='50%' cy='50%' r='50%'>
              <stop offset='0%' stopColor={accent} stopOpacity='0.35' />
              <stop offset='55%' stopColor='#0a4a58' stopOpacity='0.12' />
              <stop offset='100%' stopColor='#00040f' stopOpacity='0' />
            </radialGradient>
            <linearGradient id={`${uid}-core-line`} x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor={accent} stopOpacity='0' />
              <stop offset='50%' stopColor={accent} stopOpacity='0.7' />
              <stop offset='100%' stopColor={accent} stopOpacity='0' />
            </linearGradient>
          </defs>

          <circle cx={cx} cy={cy} r='188' fill={`url(#${uid}-core-glow)`} />
          <circle cx={cx} cy={cy} r='168' fill='none' stroke={accent} strokeOpacity='0.08' strokeWidth='1' />
          <circle cx={cx} cy={cy} r='132' fill='none' stroke={accent} strokeOpacity='0.14' strokeWidth='1' strokeDasharray='4 8' />
          <circle cx={cx} cy={cy} r='96' fill='none' stroke={accent} strokeOpacity='0.2' strokeWidth='1' />

          {[primary, secondary].flat().map((node) => {
            const p = polar(cx, cy, orbitR, node.angle)
            return (
              <line
                key={`${node.label}-base`}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke={accent}
                strokeOpacity='0.18'
                strokeWidth='1'
              />
            )
          })}

          <g className={reduceMotion ? '' : 'bitvion-core-orbit'} style={{ transformOrigin: `${cx}px ${cy}px` }}>
            {primary.map((node, i) => {
              const p = polar(cx, cy, orbitR, node.angle)
              return (
                <g key={node.label}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={p.x}
                    y2={p.y}
                    stroke={`url(#${uid}-core-line)`}
                    strokeWidth='1.2'
                    className={reduceMotion ? '' : 'bitvion-core-pulse'}
                    style={{ animationDelay: `${i * 0.8}s` }}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isMobile ? 4.5 : 4}
                    fill={accent}
                    className={reduceMotion ? '' : 'bitvion-core-node'}
                    style={{ animationDelay: `${i * 0.6}s` }}
                  />
                </g>
              )
            })}
          </g>

          {secondary.map((node, i) => {
            const p = polar(cx, cy, orbitR * 0.72, node.angle)
            return (
              <circle
                key={node.label}
                cx={p.x}
                cy={p.y}
                r='2.5'
                fill={accent}
                fillOpacity='0.45'
                className={reduceMotion ? '' : 'bitvion-core-node'}
                style={{ animationDelay: `${1.2 + i * 0.4}s` }}
              />
            )
          })}
        </svg>

        <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
          {!(isMobile && roundMark) && (
            <p className='font-poppins text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-secondary/80 mb-2 sm:mb-3'>
              {coreLabel}
            </p>
          )}
          {roundMark ? (
            <span className='seal-ring'>
              <img
                src={markSrc}
                alt=''
                width='1536'
                height='1536'
                decoding='async'
                fetchPriority='high'
                draggable='false'
                className={`seal-mark object-contain ${isMobile ? 'seal-mark--phone' : ''} ${markClassName}`}
              />
            </span>
          ) : (
            <img
              src={markSrc}
              alt=''
              width='568'
              height='458'
              decoding='async'
              draggable='false'
              className={`object-contain ${markClassName || logoSize}`}
            />
          )}
        </div>
      </div>

      {isMobile ? (
        <div className='relative z-[2] mt-4 flex flex-wrap justify-center gap-2 px-1'>
          {primary.map((node) => (
            <Link
              key={node.label}
              to={node.path}
              className='bitvion-core-label inline-flex items-center justify-center min-h-[40px] px-3 rounded-full border border-white/15 bg-[#030912]/70 font-poppins uppercase tracking-[0.14em] text-[11px] text-white active:border-secondary/50 active:text-secondary'
            >
              {node.label}
            </Link>
          ))}
        </div>
      ) : (
        <div className='absolute inset-0'>
          {primary.map((node) => {
            const p = polar(50, 50, 42, node.angle)
            return (
              <Link
                key={node.label}
                to={node.path}
                className='absolute bitvion-core-label font-poppins uppercase tracking-[0.16em] text-dimWhite hover:text-secondary active:text-secondary transition-colors rounded-full border border-transparent hover:border-secondary/25 bg-[#030912]/50 backdrop-blur-sm text-[9px] sm:text-[10px] px-2 py-1.5 min-h-[32px] flex items-center'
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {node.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BitvionCore
