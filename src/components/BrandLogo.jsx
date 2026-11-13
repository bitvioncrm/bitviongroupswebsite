import React from 'react'
import { Link } from 'react-router-dom'
import { bitvionMark } from '../assets'

const sizes = {
  header: {
    mark: 'h-[40px] xs:h-[48px] sm:h-[54px] w-auto max-w-[72px] xs:max-w-[88px] sm:max-w-[96px]',
    name: 'text-[15px] xs:text-[17px] sm:text-[19px] leading-none tracking-[0.14em] xs:tracking-[0.18em]',
    sub: 'text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.28em] xs:tracking-[0.32em]',
    gap: 'gap-2 xs:gap-3',
  },
  footer: {
    mark: 'h-[58px] w-auto max-w-[110px]',
    name: 'text-[20px] leading-none tracking-[0.18em]',
    sub: 'text-[11px] tracking-[0.32em]',
    gap: 'gap-3.5',
  },
  compact: {
    mark: 'h-[42px] w-auto max-w-[76px]',
    name: 'text-[15px] leading-none tracking-[0.16em]',
    sub: 'text-[8px] tracking-[0.28em]',
    gap: 'gap-2.5',
  },
}

const BrandLogo = ({ variant = 'header', className = '', onClick }) => {
  const size = sizes[variant] || sizes.header

  return (
    <Link
      to='/'
      onClick={onClick}
      aria-label='Bitvion Groups home'
      className={`group inline-flex items-center ${size.gap} ${className}`}
    >
      <img
        src={bitvionMark}
        alt=''
        className={`${size.mark} object-contain object-center`}
        width={568}
        height={458}
        decoding='async'
        draggable={false}
        style={{ filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.18))' }}
      />
      <span className='flex flex-col justify-center'>
        <span className={`font-poppins font-semibold text-white ${size.name}`}>
          BIT<span className='text-secondary'>V</span>ION
        </span>
        <span className={`font-poppins font-medium text-dimWhite uppercase mt-[5px] ${size.sub}`}>
          Groups
        </span>
      </span>
    </Link>
  )
}

export default BrandLogo
