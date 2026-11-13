import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../constants'
import { groupNav, isTechnologyPath } from '../data/groups'
import { close } from '../assets'
import CTAButton from './CTAButton'

const MobileMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null)
  const location = useLocation()

  const links = isTechnologyPath(location.pathname)
    ? [{ id: 'group', title: 'Group', path: '/' }, ...navLinks]
    : groupNav

  const isActive = (path) => {
    if (path === '/company/careers') return location.pathname.startsWith('/company/careers')
    if (path === '/company') return location.pathname === '/company' || (location.pathname.startsWith('/company/') && !location.pathname.startsWith('/company/careers'))
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    menuRef.current?.querySelector('a')?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={menuRef}
          className='fixed inset-0 z-[60] md:hidden'
          role='dialog'
          aria-modal='true'
          aria-label='Navigation menu'
        >
          <motion.div
            className='absolute inset-0 bg-[#00040f]/95 backdrop-blur-xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden='true'
          />

          <motion.div
            className='absolute inset-0 flex flex-col px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className='flex items-center justify-end mb-8'>
              <button
                type='button'
                onClick={onClose}
                className='flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-cyan-500/20 bg-[#030912]/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-secondary'
                aria-label='Close menu'
              >
                <img src={close} alt='' className='w-[22px] h-[22px]' />
              </button>
            </div>

            <ul className='list-none flex flex-col gap-1 flex-1'>
              {links.map((nav, i) => (
                <motion.li
                  key={nav.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    to={nav.path}
                    onClick={onClose}
                    className={`block font-poppins font-medium text-[26px] sm:text-[28px] py-3 min-h-[44px] transition-colors focus-visible:ring-2 focus-visible:ring-secondary rounded-lg ${
                      isActive(nav.path) ? 'text-secondary' : 'text-white hover:text-secondary'
                    }`}
                  >
                    {nav.title}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <CTAButton
              to='/contact'
              variant='primary'
              styles='w-full text-center min-h-[52px] text-[16px] mt-6'
              onClick={onClose}
            >
              Talk to Bitvion →
            </CTAButton>

            <div className='mt-10 pt-8 border-t border-white/10 text-center'>
              <p className='font-poppins font-semibold text-white text-[14px] tracking-[0.14em] uppercase'>
                Bitvion Groups
              </p>
              <p className='font-poppins text-dimWhite text-[13px] mt-2 leading-relaxed max-w-[280px] mx-auto'>
                Building Businesses. Creating Growth.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
