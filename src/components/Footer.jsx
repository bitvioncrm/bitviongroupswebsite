import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../style'
import BrandLogo from './BrandLogo'
import PolicyBar from './PolicyBar'
import { entity } from '../data/entity'

const footerSections = [
  {
    title: 'The Group',
    links: [
      { name: 'Bitvion Groups', path: '/' },
      { name: 'Technologies', path: '/technologies' },
      { name: 'Business', path: '/business' },
      { name: 'Trading', path: '/trading' },
      { name: 'Consultancy', path: '/consultancy' },
      { name: 'Travels', path: '/travels' },
      { name: 'Ventures', path: '/ventures' },
      { name: 'Imports & Exports', path: '/imports-exports' },
      { name: 'Products', path: '/bitvion-products' },
    ],
  },
  {
    title: 'Technology',
    links: [
      { name: 'Solutions', path: '/solutions' },
      { name: 'AI & Machine Learning', path: '/solutions/artificial-intelligence' },
      { name: 'Software Development', path: '/solutions/software-development' },
      { name: 'Intelligent Automation', path: '/solutions/intelligent-automation' },
      { name: 'Cloud Technology', path: '/solutions/cloud-technology' },
      { name: 'Digital Transformation', path: '/solutions/digital-transformation' },
    ],
  },
  {
    title: 'Products',
    links: [
      { name: 'YatrikERP', path: '/products/yatrikerp' },
      { name: 'All Products', path: '/products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', path: '/company/about' },
      { name: 'Founder', path: '/company/founder' },
      { name: 'Technology', path: '/company/technology' },
      { name: 'Careers', path: '/company/careers' },
      { name: 'Insights', path: '/insights' },
    ],
  },
  {
    title: 'Global',
    links: [
      { name: 'Netherlands', path: '/global/netherlands' },
      { name: 'United Kingdom', path: '/global/united-kingdom' },
      { name: 'Scotland', path: '/global/scotland' },
      { name: 'Europe', path: '/global/europe' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { name: 'Talk to Bitvion', path: '/contact' },
      { name: 'Services and prices', path: '/pricing' },
      { name: 'Checkout', path: '/checkout' },
      { name: 'Request Proposal', path: '/request-proposal' },
      { name: 'Request Demo', path: '/request-demo' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'About Us', path: '/company/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Shipping Policy', path: '/shipping-policy' },
      { name: 'Refund Policy', path: '/refund-policy' },
      { name: 'Cookie Policy', path: '/cookie-policy' },
      { name: 'Disclaimer', path: '/disclaimer' },
    ],
  },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`${styles.flexCenter} ${styles.paddingY} flex-col`} role='contentinfo'>
      <div className='w-full mb-8'>
        <BrandLogo variant='footer' className='mb-4' />
        <p className='font-poppins font-semibold text-white text-[16px] tracking-wide mb-2'>
          BITVION TECHNOLOGIES
        </p>
        <p className={`${styles.paragraph} max-w-[420px] text-[15px] mb-3`}>
          Engineering intelligent software, AI solutions and digital products.
        </p>
        <p className='font-poppins text-dimWhite text-[14px] mb-4'>
          Founded and owned by{' '}
          <Link to='/company/founder' className='text-secondary hover:text-white transition-colors'>
            Akhil Shijo
          </Link>
          .
        </p>
        <nav aria-label='Company identity links' className='flex flex-wrap gap-x-4 gap-y-2 mb-4'>
          {[
            { name: 'About Bitvion', path: '/company/about' },
            { name: 'Founder', path: '/company/founder' },
            { name: 'Solutions', path: '/solutions' },
            { name: 'Products', path: '/products' },
            { name: 'YatrikERP', path: '/products/yatrikerp' },
            { name: 'Insights', path: '/insights' },
            { name: 'Contact', path: '/contact' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className='font-poppins text-[13px] text-dimWhite hover:text-secondary transition-colors'
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <p className='font-poppins text-dimWhite text-[14px]'>
          <a href='https://bitvion.in/' className='hover:text-secondary transition-colors'>bitvion.in</a>
          {' · '}
          <a href='mailto:info@bitvion.in' className='hover:text-secondary transition-colors'>info@bitvion.in</a>
          {' · '}
          <a href={entity.organization.whatsappUrl} className='hover:text-secondary transition-colors' target='_blank' rel='noopener noreferrer'>
            WhatsApp {entity.organization.phoneDisplay}
          </a>
        </p>
      </div>

      <div className='w-full mb-8'>
        <PolicyBar />
      </div>

      <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-8'>
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className='font-poppins font-medium text-[14px] text-white mb-4 uppercase tracking-wider'>
              {section.title}
            </h4>
            <ul className='list-none space-y-2'>
              {section.links.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className='font-poppins text-[13px] text-dimWhite hover:text-secondary transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='w-full pt-6 border-t border-white/10 text-center'>
        <p className='font-poppins text-dimWhite text-[14px] mb-4'>
          <Link className='hover:text-secondary' to='/contact'>Contact Us</Link>
          {' · '}
          <Link className='hover:text-secondary' to='/privacy-policy'>Privacy Policy</Link>
          {' · '}
          <Link className='hover:text-secondary' to='/terms'>Terms &amp; Conditions</Link>
          {' · '}
          <Link className='hover:text-secondary' to='/shipping-policy'>Shipping Policy</Link>
          {' · '}
          <Link className='hover:text-secondary' to='/refund-policy'>Refund Policy</Link>
        </p>
        <p className='font-poppins text-dimWhite text-[14px]'>
          &copy; {currentYear} Bitvion Technologies. All Rights Reserved.
        </p>
        <p className='font-poppins text-dimWhite/80 text-[13px] mt-2 max-w-[640px] mx-auto'>
          Bitvion Groups is a brand of Bitvion Technologies, a proprietary concern of Akhil Shijo. Udyam {entity.organization.udyam}. {entity.organization.operatingAddress}.
        </p>
        <p className='font-poppins text-dimWhite/80 text-[13px] mt-2 max-w-[640px] mx-auto'>
          Grievance Officer and Nodal Officer: Akhil Shijo, {entity.organization.email}, {entity.organization.phoneDisplay}. Complaints are answered within 4 business days.
        </p>
        <p className='font-poppins text-dimWhite/50 text-[12px] mt-2'>
          We don&apos;t just build software. We engineer intelligent systems.
        </p>
      </div>
    </footer>
  )
}

export default Footer
