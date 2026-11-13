import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from '../../style'
import Breadcrumbs from './Breadcrumbs'
import RevealText from '../RevealText'

import HeroBackground from '../hero/HeroBackground'

const PageHero = ({ eyebrow, title, subtitle, breadcrumbs = [] }) => {
  const reduceMotion = useReducedMotion()

  return (
    <section className='pt-28 sm:pt-36 pb-10 sm:pb-14 relative overflow-hidden'>
      <HeroBackground />
      <div className='absolute z-0 w-[40%] h-[40%] top-0 right-0 blue__gradient' aria-hidden='true' />
      <motion.div
        className='relative z-[1]'
        initial={reduceMotion ? false : 'hidden'}
        animate='visible'
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
        }}
      >
        {breadcrumbs.length > 0 && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.24 } },
            }}
          >
            <Breadcrumbs items={breadcrumbs} />
          </motion.div>
        )}
        {eyebrow && (
          <motion.span
            className='font-poppins font-medium text-secondary text-[14px] uppercase tracking-[3px] mb-4 block'
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.26 } },
            }}
          >
            {eyebrow}
          </motion.span>
        )}
        <h1 className={`${styles.heading2} max-w-[900px]`}>
          <RevealText>{title}</RevealText>
        </h1>
        {subtitle && (
          <motion.p
            className={`${styles.paragraph} max-w-[640px] mt-5`}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}

export default PageHero
