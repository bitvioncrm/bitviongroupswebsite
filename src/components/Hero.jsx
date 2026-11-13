import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import HeroBackground from './hero/HeroBackground'
import BitvionCore from './hero/BitvionCore'
import { HeroScrollIndicator, HeroTechStrip } from './hero/HeroChrome'
import RevealText from './RevealText'

const layer = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
}

const Hero = () => {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const visualY = useTransform(scrollY, [0, 400], [0, reduceMotion ? 0 : -40])
  const visualOpacity = useTransform(scrollY, [0, 350], [1, reduceMotion ? 1 : 0.65])
  const copyY = useTransform(scrollY, [0, 300], [0, reduceMotion ? 0 : -16])

  return (
    <section
      id='home'
      className='hero-viewport relative flex flex-col overflow-hidden bg-primary'
      aria-labelledby='hero-heading'
    >
      <HeroBackground />

      <div className='hero-shell relative z-[1] flex flex-col flex-1 w-full max-w-[1320px] mx-auto px-4 xs:px-5 sm:px-8 lg:px-10'>
        <div className='hero-compact-tight flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,48%)_minmax(0,52%)] gap-6 lg:gap-8 xl:gap-12 items-center lg:items-center pt-[calc(68px+env(safe-area-inset-top,0px))] sm:pt-[calc(76px+env(safe-area-inset-top,0px))] lg:pt-[calc(92px+env(safe-area-inset-top,0px))] pb-2 lg:pb-6'>
          <motion.div
            className='flex flex-col min-w-0'
            style={reduceMotion ? undefined : { y: copyY }}
            initial={reduceMotion ? false : 'hidden'}
            animate='visible'
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
            }}
          >
            <motion.div
              className='hero-eyebrow inline-flex items-center gap-2.5 py-2 px-3.5 sm:px-4 rounded-full mb-4 sm:mb-5 lg:mb-8 max-w-full'
              variants={layer}
            >
              <span className='hero-eyebrow-dot w-[7px] h-[7px] rounded-full bg-secondary shrink-0' aria-hidden='true' />
              <span className='font-poppins text-[10px] xs:text-[11px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-dimWhite leading-snug'>
                <Link to='/' className='hover:text-white'>Bitvion Groups</Link>
                <span aria-hidden='true'> · </span>
                Intelligent Technology Systems
              </span>
            </motion.div>

            <h1
              id='hero-heading'
              className='hero-headline font-poppins font-extrabold text-white tracking-[-0.02em] leading-[0.92]'
            >
              <RevealText>
                <span className='block'>BUILDING</span>
                <span className='block'>INTELLIGENCE</span>
                <span className='block'>FOR THE REAL</span>
                <span className='block'>
                  <span className='text-gradient'>WORLD.</span>
                </span>
              </RevealText>
            </h1>

            <motion.p
              className='hero-tags font-poppins text-[10px] xs:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-secondary/90 mt-4 sm:mt-5 lg:mt-7'
              variants={layer}
            >
              AI · SOFTWARE · AUTOMATION · DIGITAL SYSTEMS
            </motion.p>

            <motion.p
              className='font-poppins text-dimWhite text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.6] max-w-[340px] sm:max-w-[620px] mt-3 sm:mt-4 lg:mt-6'
              variants={layer}
            >
              Bitvion Technologies engineers intelligent software, AI-powered products and
              automation systems for businesses building what comes next.
            </motion.p>

            <motion.p
              className='hidden sm:block font-poppins text-[13px] sm:text-[14px] text-dimWhite/60 mt-2 lg:mt-3 max-[740px]:hidden'
              variants={layer}
            >
              Founded and owned by{' '}
              <Link to='/company/founder' className='text-secondary/90 hover:text-secondary transition-colors'>
                Akhil Shijo
              </Link>
              .
            </motion.p>

            <motion.div
              className='flex flex-col gap-3 mt-5 sm:mt-6 lg:mt-10 w-full max-w-[340px] sm:max-w-none sm:flex-row sm:flex-wrap sm:max-w-none lg:gap-4'
              variants={layer}
            >
              <Link
                to='/company/about'
                className='hero-cta-primary inline-flex items-center justify-center gap-2 px-6 min-h-[52px] sm:min-h-[56px] sm:py-3.5 rounded-[11px] font-poppins font-medium text-[15px] sm:text-[16px] text-primary transition-all duration-300 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary w-full sm:w-auto'
              >
                Explore Bitvion
                <span aria-hidden='true'>→</span>
              </Link>
              <Link
                to='/products/yatrikerp'
                className='hero-cta-secondary inline-flex items-center justify-center gap-2 px-6 min-h-[52px] sm:min-h-[56px] sm:py-3.5 rounded-[11px] font-poppins font-medium text-[15px] sm:text-[16px] text-white border border-white/15 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-secondary/40 hover:bg-secondary/5 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary w-full sm:w-auto'
              >
                Explore YatrikERP
                <span aria-hidden='true'>→</span>
              </Link>
            </motion.div>

            <motion.div
              className='lg:hidden hero-core-mobile mt-6 sm:mt-7 flex items-center justify-center w-full pt-2'
              variants={layer}
            >
              <BitvionCore
                variant='mobile'
                markSrc='/bitvion-groups-seal.webp'
                roundMark
                markClassName='seal-mark'
              />
            </motion.div>

            <motion.p
              className='sm:hidden font-poppins text-[12px] text-dimWhite/55 mt-3 text-center max-w-[340px] mx-auto lg:mx-0 max-[740px]:hidden'
              variants={layer}
            >
              Founded by{' '}
              <Link to='/company/founder' className='text-secondary/90 hover:text-secondary transition-colors'>
                Akhil Shijo
              </Link>
            </motion.p>
          </motion.div>

          <motion.div
            className='hidden lg:flex justify-center lg:justify-end items-center'
            style={reduceMotion ? undefined : { y: visualY, opacity: visualOpacity }}
          >
            <div className='w-full max-w-[520px]'>
              <BitvionCore
                variant='desktop'
                markSrc='/bitvion-groups-seal.webp'
                roundMark
                markClassName='seal-mark'
              />
            </div>
          </motion.div>
        </div>
      </div>

      <HeroTechStrip />
      <div className='hidden lg:block'>
        <HeroScrollIndicator />
      </div>
    </section>
  )
}

export default Hero
