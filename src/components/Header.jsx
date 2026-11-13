import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navLinks } from '../constants'
import { groupNav, isTechnologyPath } from '../data/groups'
import { menu } from '../assets'
import CTAButton from './CTAButton'
import MobileMenu from './MobileMenu'
import BrandLogo from './BrandLogo'

const Header = () => {
  const location = useLocation()
  const [toggle, setToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const links = isTechnologyPath(location.pathname)
    ? [{ id: 'group', title: 'Group', path: '/' }, ...navLinks]
    : groupNav

  const isActive = (path) => {
    if (path === '/company/careers') return location.pathname.startsWith('/company/careers')
    if (path === '/company') return location.pathname === '/company' || (location.pathname.startsWith('/company/') && !location.pathname.startsWith('/company/careers'))
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = toggle ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [toggle])

  return (
    <>
      <motion.header
        className='fixed top-0 left-0 right-0 z-50 px-3 xs:px-4 sm:px-6 lg:px-8 pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-3 lg:pt-4'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Mobile — compact glass bar */}
        <div
          className={`md:hidden max-w-[1400px] mx-auto glass-nav-pill flex items-center justify-between gap-3 px-3 xs:px-4 h-[60px] rounded-2xl transition-all duration-500 ${
            scrolled ? 'glass-nav-scrolled-mobile' : ''
          }`}
        >
          <BrandLogo variant='header' className='min-w-0 shrink scale-[0.92] xs:scale-100 origin-left' onClick={() => setToggle(false)} />
          <button
            type='button'
            className='mobile-hamburger flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-cyan-500/20 bg-[#030912]/60 backdrop-blur-md transition-colors active:border-secondary/50 active:bg-secondary/10 focus-visible:ring-2 focus-visible:ring-secondary'
            onClick={() => setToggle(true)}
            aria-label='Open menu'
            aria-expanded={toggle}
          >
            <img src={menu} alt='' className='w-[22px] h-[22px] object-contain opacity-90' />
          </button>
        </div>

        {/* Desktop */}
        <div
          className={`hidden md:flex max-w-[1400px] mx-auto items-center gap-3 sm:gap-4 min-h-[72px] sm:min-h-[76px] h-auto py-2 transition-all duration-500 ${
            scrolled ? 'glass-nav glass-nav-scrolled' : ''
          }`}
        >
          <BrandLogo variant='header' className='min-w-0 shrink z-[2]' />

          <nav
            className='glass-nav-pill flex flex-1 items-center justify-between min-w-0 ml-2 lg:ml-4 px-4 lg:px-6 py-2.5 rounded-2xl'
            aria-label='Main navigation'
          >
            <ul className='list-none flex items-center flex-wrap gap-x-1 lg:gap-x-2'>
              {links.map((nav) => (
                <li key={nav.id}>
                  <Link
                    to={nav.path}
                    className={`font-poppins font-normal ${links.length > 7 ? 'text-[12px] lg:text-[13px] px-1.5' : 'text-[14px] lg:text-[15px] px-2.5'} transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-secondary rounded-lg py-1.5 relative group whitespace-nowrap ${
                      isActive(nav.path) ? 'text-white' : 'text-dimWhite hover:text-white'
                    }`}
                  >
                    {nav.title}
                    <span
                      className={`absolute bottom-1 left-2.5 right-2.5 h-px bg-secondary/70 origin-left transition-transform duration-300 ${
                        isActive(nav.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      aria-hidden='true'
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <CTAButton to='/contact' variant='primary' styles='py-2.5 px-5 text-[14px] shrink-0 ml-3'>
              Talk to Bitvion
            </CTAButton>
          </nav>
        </div>
      </motion.header>

      <MobileMenu isOpen={toggle} onClose={() => setToggle(false)} />
    </>
  )
}

export default Header
