import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { requiredPolicies } from '../data/policies'

const PolicyBar = ({ compact = false }) => {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label='Website policies'
      className={`w-full rounded-[16px] border border-secondary/40 bg-[#030912] ${compact ? 'p-4' : 'p-5 sm:p-6'}`}
    >
      <p className='font-poppins font-semibold text-secondary text-[12px] tracking-[0.16em] uppercase mb-3'>
        Website policies
      </p>
      <p className='font-poppins text-white text-[15px] sm:text-[16px] mb-4'>
        Contact Us, Privacy Policy, Terms &amp; Conditions, Shipping Policy and Refund Policy
      </p>
      <ul className='flex flex-wrap gap-2 sm:gap-3'>
        {requiredPolicies.map((policy) => {
          const active = pathname === policy.path
          return (
            <li key={policy.path}>
              <Link
                to={policy.path}
                className={`inline-flex min-h-[44px] items-center rounded-[10px] border px-3 sm:px-4 font-poppins text-[14px] sm:text-[15px] transition-colors ${
                  active
                    ? 'border-secondary bg-secondary text-primary'
                    : 'border-white/20 text-white hover:border-secondary hover:text-secondary'
                }`}
              >
                {policy.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default PolicyBar
