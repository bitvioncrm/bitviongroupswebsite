import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { founderPhoto } from '../assets'

const FounderImage = ({ className = '', size = 'large' }) => {
  const [hasError, setHasError] = useState(false)

  const sizeClasses = {
    large: 'w-[140px] h-[140px] sm:w-[180px] sm:h-[180px]',
    medium: 'w-[100px] h-[100px]',
    small: 'w-[80px] h-[80px]',
  }

  if (hasError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-dimBlue border border-secondary/30 flex items-center justify-center ${className}`}
        aria-label='Akhil Shijo'
      >
        <span className={`font-poppins font-bold text-secondary ${size === 'large' ? 'text-[36px] sm:text-[48px]' : 'text-[28px]'}`}>
          AS
        </span>
      </div>
    )
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className='absolute inset-0 rounded-full bg-secondary/20 blur-xl animate-pulse-glow' aria-hidden='true' />
      <img
        src={founderPhoto}
        alt='Akhil Shijo, Founder and Proprietor of Bitvion Technologies'
        className='relative w-full h-full rounded-full object-cover object-[center_18%] border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.45)]'
        onError={() => setHasError(true)}
      />
    </motion.div>
  )
}

export default FounderImage
