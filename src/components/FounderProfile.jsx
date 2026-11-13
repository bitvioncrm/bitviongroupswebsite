import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { founderPhoto } from '../assets'
import AnimateIn from './AnimateIn'
import EntityNav from './seo/EntityNav'
import FaqSection from './seo/FaqSection'
import { FOUNDER_EXPERTISE, founderFaqs } from '../data/entity'
import styles from '../style'

const glance = [
  { label: 'Focus', value: 'Technology Innovation', icon: 'rocket' },
  { label: 'Expertise', value: 'Software Engineering, AI Solutions', icon: 'code' },
  { label: 'Approach', value: 'Practical Problem Solving', icon: 'target' },
  { label: 'Vision', value: 'Intelligent Systems, Global Impact', icon: 'globe' },
]

const highlights = [
  { title: 'Technology First', text: 'Engineering solutions that solve real problems', icon: 'bolt' },
  { title: 'Innovation Driven', text: 'AI, Automation and product thinking at our core', icon: 'diamond' },
  { title: 'Impact Focused', text: 'Creating measurable business outcomes', icon: 'people' },
]

const philosophy = [
  { title: 'Think Deep', text: 'Understand problems at the core', icon: 'brain' },
  { title: 'Build Smart', text: 'Design practical and scalable solutions', icon: 'bulb' },
  { title: 'Deliver Value', text: 'Focus on outcomes that matter', icon: 'shield' },
  { title: 'Grow Together', text: 'Empower teams and create opportunities', icon: 'people' },
]

const pageSections = [
  {
    id: 'about-akhil',
    title: 'About Akhil Shijo',
    body: [
      'Akhil Shijo is a technology builder focused on software engineering, artificial intelligence, intelligent automation and practical digital systems. As the Founder & Proprietor of Bitvion Technologies, he shapes the enterprise around clear problem-solving, strong engineering fundamentals and products that organizations can actually operate.',
      'His approach emphasizes systems that are intelligent where it matters and simple where complexity would only get in the way.',
    ],
  },
  {
    id: 'founder-of-bitvion',
    title: 'Founder of Bitvion Technologies',
    body: [
      'Bitvion Technologies is a proprietary technology enterprise founded and owned by Akhil Shijo. The enterprise commenced business on 24 January 2026 with a primary activity of computer programming, consultancy and related services.',
      'Under his leadership, Bitvion Technologies develops software, AI solutions, automation systems and digital products for modern organizations.',
    ],
  },
  {
    id: 'technology-philosophy',
    title: 'Technology Philosophy',
    body: [
      'Technology is most useful when it reduces friction, improves decisions and supports real operations. Akhil Shijo\'s philosophy prioritizes deep understanding of the problem, practical architecture and measurable outcomes over novelty for its own sake.',
      'That philosophy guides how Bitvion Technologies designs software platforms, AI-assisted workflows and automation systems.',
    ],
  },
  {
    id: 'areas-of-expertise',
    title: 'Areas of Expertise',
    body: [
      'Core areas of focus include technology strategy, software engineering, artificial intelligence, intelligent automation, product development and digital transformation. These areas form the foundation of Bitvion Technologies’ solution and product work.',
    ],
    list: FOUNDER_EXPERTISE,
  },
  {
    id: 'building-bitvion',
    title: 'Building Bitvion',
    body: [
      'Building Bitvion Technologies means building a technology enterprise that can engineer reliable systems, evolve products thoughtfully and stay close to the operational realities of the organizations it serves.',
      'The enterprise identity remains consistent: Bitvion Technologies as a proprietary technology enterprise, with Akhil Shijo as Founder & Proprietor.',
    ],
  },
  {
    id: 'product-vision',
    title: 'Product Vision',
    body: [
      'Product work at Bitvion Technologies is oriented around modular platforms, clear workflows and AI-assisted operations that help teams coordinate day-to-day work with less manual overhead.',
      'The goal is not to add technology for decoration — it is to create digital products that become dependable operational infrastructure.',
    ],
  },
  {
    id: 'yatrikerp',
    title: 'YatrikERP',
    body: [
      'YatrikERP is a technology product developed by Bitvion Technologies. It is an AI-powered modular operations platform designed for transportation, hospital and school operations — covering scheduling, tracking, inventory, workflows and related operational modules.',
    ],
    link: { to: '/products/yatrikerp', label: 'Explore YatrikERP by Bitvion Technologies' },
  },
  {
    id: 'technology-focus',
    title: 'Technology Focus',
    body: [
      'The technology focus spans software engineering, AI and machine learning, intelligent automation, cloud technology, digital transformation, data and analytics, UI/UX engineering and digital products.',
      'These capabilities support both custom solutions and product platforms such as YatrikERP.',
    ],
  },
  {
    id: 'leadership-philosophy',
    title: 'Leadership Philosophy',
    body: [
      'Leadership at Bitvion Technologies is grounded in clarity, responsibility and long-term thinking. Akhil Shijo\'s approach emphasizes understanding problems deeply, building practical systems and delivering value that teams can sustain.',
    ],
  },
  {
    id: 'bitvion-technologies',
    title: 'Bitvion Technologies',
    body: [
      'Bitvion Technologies is the proprietary technology enterprise through which software, AI, automation and digital products are developed. Official business identity includes Micro enterprise classification under Udyam registration and a services-major activity profile.',
    ],
    link: { to: '/company/about', label: 'About Bitvion Technologies' },
  },
  {
    id: 'connect',
    title: 'Connect',
    body: [
      'Organizations interested in software, AI, automation or digital products can reach Bitvion Technologies through the contact channels on this website.',
    ],
    link: { to: '/contact', label: 'Contact Bitvion Technologies' },
  },
]

const Icon = ({ name }) => {
  const common = { width: 18, height: 18, fill: 'none', viewBox: '0 0 24 24', 'aria-hidden': true }
  const stroke = { stroke: '#5CE1E6', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

  const paths = {
    bolt: <path d='M13 2 4 14h7l-1 8 9-12h-7l1-8Z' {...stroke} />,
    diamond: <path d='M12 3 20 12 12 21 4 12 12 3Z' {...stroke} />,
    people: (
      <>
        <path d='M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2' {...stroke} />
        <circle cx='9.5' cy='7' r='3.5' {...stroke} />
        <path d='M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' {...stroke} />
      </>
    ),
    rocket: (
      <>
        <path d='M12 3c4 3 6 7 6 11a6 6 0 0 1-12 0c0-4 2-8 6-11Z' {...stroke} />
        <path d='M9 16c-2 2-3 5-3 5s3-1 5-3M15 16c2 2 3 5 3 5s-3-1-5-3' {...stroke} />
      </>
    ),
    code: <path d='M8 8 4 12l4 4M16 8l4 4-4 4M14 6l-4 12' {...stroke} />,
    target: (
      <>
        <circle cx='12' cy='12' r='8' {...stroke} />
        <circle cx='12' cy='12' r='3' {...stroke} />
      </>
    ),
    globe: (
      <>
        <circle cx='12' cy='12' r='9' {...stroke} />
        <path d='M3 12h18M12 3c3 3 4.5 6 4.5 9s-1.5 6-4.5 9c-3-3-4.5-6-4.5-9S9 6 12 3Z' {...stroke} />
      </>
    ),
    brain: (
      <>
        <path d='M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v2a3 3 0 0 0 3 3' {...stroke} />
        <path d='M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v2a3 3 0 0 1-3 3' {...stroke} />
        <path d='M12 4v16M9 9h.01M15 9h.01' {...stroke} />
      </>
    ),
    bulb: (
      <>
        <path d='M9 18h6M10 21h4' {...stroke} />
        <path d='M8 14a6 6 0 1 1 8 0c-.8.8-1.2 1.6-1.4 2.5H9.4C9.2 15.6 8.8 14.8 8 14Z' {...stroke} />
      </>
    ),
    shield: <path d='M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z' {...stroke} />,
  }

  return <svg {...common}>{paths[name]}</svg>
}

const IconBox = ({ name }) => (
  <span className='flex-shrink-0 w-9 h-9 rounded-lg bg-dimBlue border border-secondary/20 flex items-center justify-center'>
    <Icon name={name} />
  </span>
)

const FounderPortrait = ({ priority = false }) => {
  const [hasError, setHasError] = useState(false)

  return (
    <motion.div
      className='relative w-full max-w-[320px] mx-auto'
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className='absolute -inset-6 rounded-[32px] bg-secondary/15 blur-3xl animate-pulse-glow' aria-hidden='true' />
      <div
        className='absolute inset-0 rounded-full border border-secondary/20 opacity-40'
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(92,225,230,0.12), transparent 55%), radial-gradient(circle at 70% 80%, rgba(92,225,230,0.08), transparent 50%)',
        }}
        aria-hidden='true'
      />
      <div className='relative overflow-hidden rounded-[24px] border border-secondary/40 shadow-[0_0_50px_rgba(92,225,230,0.18)] aspect-[3/4] bg-primary backdrop-blur-sm'>
        {hasError ? (
          <div className='w-full h-full flex items-center justify-center bg-dimBlue'>
            <span className='font-poppins font-bold text-secondary text-[48px]'>AS</span>
          </div>
        ) : (
          <img
            src={founderPhoto}
            alt='Akhil Shijo, Founder and Proprietor of Bitvion Technologies'
            title='Akhil Shijo — Founder & Proprietor, Bitvion Technologies'
            width={640}
            height={853}
            decoding='async'
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className='w-full h-full object-cover object-[center_18%]'
            onError={() => setHasError(true)}
          />
        )}
        <div className='absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-primary via-primary/55 to-transparent' aria-hidden='true' />
        <div className='absolute inset-x-0 bottom-0 px-6 pb-7 pt-16 text-center'>
          <p className='font-poppins text-secondary text-[11px] uppercase tracking-[0.22em] mb-2'>Founder Profile</p>
          <h3 className='font-poppins font-semibold text-white text-[22px] sm:text-[24px] tracking-[0.12em]'>
            AKHIL SHIJO
          </h3>
          <p className='font-poppins text-secondary text-[14px] mt-1'>Founder &amp; Proprietor</p>
          <p className='font-poppins text-dimWhite text-[13px] mt-1'>Bitvion Technologies</p>
          <p className='font-poppins text-dimWhite/80 text-[12px] mt-3'>Founder of Bitvion Technologies</p>
          <ul className='mt-4 flex flex-wrap justify-center gap-2' role='list'>
            {['AI', 'SOFTWARE', 'AUTOMATION', 'PRODUCT'].map((tag) => (
              <li
                key={tag}
                className='px-2.5 py-1 rounded-full border border-white/15 font-poppins text-[10px] tracking-wider text-dimWhite'
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className='mt-4 mx-auto block w-10 h-[2px] bg-secondary/70 rounded-full' aria-hidden='true' />
        </div>
      </div>
    </motion.div>
  )
}

const FounderLongForm = () => (
  <div className='relative z-[1] mt-16 max-w-[800px] space-y-12'>
    {pageSections.map((section) => (
      <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
        <h2 id={`${section.id}-heading`} className='font-poppins font-semibold text-white text-[22px] sm:text-[24px] mb-4'>
          {section.title}
        </h2>
        {section.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={`${styles.paragraph} mb-4 last:mb-0`}>
            {paragraph}
          </p>
        ))}
        {section.list && (
          <ul className='mt-5 flex flex-wrap gap-2' role='list'>
            {section.list.map((item) => (
              <li
                key={item}
                className='px-3.5 py-1.5 rounded-full border border-white/20 font-poppins text-[13px] text-dimWhite'
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        {section.link && (
          <Link
            to={section.link.to}
            className='inline-flex items-center gap-2 mt-5 font-poppins text-secondary hover:text-white transition-colors'
          >
            {section.link.label}
            <span aria-hidden='true'>→</span>
          </Link>
        )}
      </section>
    ))}

    <EntityNav
      label='Related entities'
      links={[
        { name: 'Bitvion Technologies', path: '/company/about' },
        { name: 'YatrikERP by Bitvion Technologies', path: '/products/yatrikerp' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Contact', path: '/contact' },
      ]}
    />

    <FaqSection faqs={founderFaqs} />
  </div>
)

const FounderProfile = ({ variant = 'preview' }) => {
  const isPreview = variant === 'preview'

  return (
    <section
      id='leadership'
      className={`${isPreview ? styles.paddingY : 'pt-4 pb-8 sm:pb-12'} relative overflow-hidden`}
      aria-labelledby='founder-heading'
    >
      <div className='absolute z-0 w-[35%] h-[45%] -left-10 top-10 blue__gradient' aria-hidden='true' />
      <div className='absolute z-0 w-[30%] h-[40%] right-0 bottom-10 blue__gradient opacity-50' aria-hidden='true' />

      {!isPreview && (
        <header className='relative z-[1] mb-12 max-w-[720px]'>
          <p className='font-poppins font-medium text-secondary text-[13px] uppercase tracking-[3px] mb-4'>
            Leadership
          </p>
          <h1
            id='founder-heading'
            className='font-poppins font-semibold text-white text-[34px] xs:text-[42px] sm:text-[52px] leading-[1.15]'
          >
            Akhil Shijo
          </h1>
          <p className='font-poppins text-secondary text-[16px] sm:text-[18px] mt-3'>
            Founder &amp; Proprietor of Bitvion Technologies
          </p>
          <p className={`${styles.paragraph} mt-5`}>
            Technology builder focused on software, AI, automation and digital products.
            Bitvion Technologies is founded and owned by Akhil Shijo.
          </p>
          <EntityNav
            className='mt-6'
            label='Related to Akhil Shijo'
            links={[
              { name: 'Bitvion Technologies', path: '/company/about' },
              { name: 'YatrikERP', path: '/products/yatrikerp' },
              { name: 'Solutions', path: '/solutions' },
            ]}
          />
        </header>
      )}

      <div className='relative z-[1] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center'>
        <AnimateIn className='lg:col-span-4' direction='left'>
          <span className='font-poppins font-medium text-secondary text-[13px] uppercase tracking-[3px] mb-4 block'>
            Leadership
          </span>
          <h2
            id={isPreview ? 'founder-heading' : undefined}
            className='font-poppins font-semibold text-white text-[28px] xs:text-[34px] sm:text-[42px] leading-[1.15] mb-5'
          >
            THE PERSON <br className='sm:block hidden' />
            BEHIND <span className='text-gradient'>BITVION.</span>
          </h2>
          <p className={`${styles.paragraph} text-[16px] max-w-[420px]`}>
            Bitvion Technologies is founded and owned by Akhil Shijo, a technology
            builder focused on software engineering, AI, intelligent automation and
            practical digital systems.
          </p>
          <ul className='mt-8 space-y-4' role='list'>
            {highlights.map((item) => (
              <li key={item.title} className='flex items-start gap-3'>
                <IconBox name={item.icon} />
                <div>
                  <p className='font-poppins font-semibold text-white text-[15px]'>{item.title}</p>
                  <p className='font-poppins text-dimWhite text-[13px] leading-[22px]'>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          {isPreview && (
            <div className='flex flex-col xs:flex-row flex-wrap gap-3 mt-8'>
              <Link
                to='/company/founder'
                className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] bg-blue-gradient text-primary font-poppins font-medium text-[14px] hover:shadow-[0_0_24px_rgba(92,225,230,0.25)] transition-all'
              >
                VIEW FOUNDER PROFILE
                <span aria-hidden='true'>→</span>
              </Link>
              <Link
                to='/company/about'
                className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] border border-secondary/40 text-secondary font-poppins font-medium text-[14px] hover:bg-secondary/10 transition-colors'
              >
                EXPLORE BITVION
              </Link>
            </div>
          )}
        </AnimateIn>

        <div className='lg:col-span-4'>
          <FounderPortrait priority={!isPreview} />
        </div>

        <AnimateIn className='lg:col-span-4' direction='right' delay={0.1}>
          <p className='font-poppins font-medium text-secondary text-[12px] uppercase tracking-[3px] mb-5'>
            At a Glance
          </p>
          <ul className='space-y-5 mb-8' role='list'>
            {glance.map((item) => (
              <li key={item.label} className='flex items-start gap-3'>
                <IconBox name={item.icon} />
                <div>
                  <p className='font-poppins font-semibold text-white text-[15px]'>{item.label}</p>
                  <p className='font-poppins text-dimWhite text-[13px]'>{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className='font-poppins font-medium text-secondary text-[12px] uppercase tracking-[3px] mb-4'>
            Core Strengths
          </p>
          <ul className='flex flex-wrap gap-2' role='list'>
            {FOUNDER_EXPERTISE.map((item) => (
              <li
                key={item}
                className='px-3.5 py-1.5 rounded-full border border-white/20 font-poppins text-[12px] text-dimWhite hover:border-secondary/50 hover:text-white transition-colors'
              >
                {item}
              </li>
            ))}
          </ul>
        </AnimateIn>
      </div>

      <AnimateIn delay={0.15} className='relative z-[1] mt-14'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 p-6 sm:p-10 rounded-[24px] bg-black-gradient border border-white/5'>
          <blockquote className='relative'>
            <span className='font-poppins text-secondary text-[56px] leading-none absolute -top-3 left-0 opacity-80' aria-hidden='true'>
              “
            </span>
            <p className='font-poppins text-white text-[16px] sm:text-[17px] leading-[28px] pt-8'>
              Technology is most powerful when it is simple, intelligent and solves real problems.
              That&apos;s the future we build at Bitvion Technologies.
            </p>
            <footer className='font-poppins text-secondary text-[14px] mt-5'>— Akhil Shijo</footer>
          </blockquote>

          <div className='md:border-l md:border-white/10 md:pl-8'>
            <p className='font-poppins font-medium text-secondary text-[12px] uppercase tracking-[3px] mb-4'>
              About Akhil
            </p>
            <p className='font-poppins text-dimWhite text-[15px] leading-[26px] mb-6'>
              Akhil Shijo is the Founder &amp; Proprietor of Bitvion Technologies.
              He is a technology builder focused on software engineering, AI,
              intelligent automation and practical digital systems.
            </p>
            {isPreview ? (
              <Link
                to='/company/founder'
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-secondary/50 font-poppins text-secondary text-[14px] hover:bg-secondary/10 transition-colors group'
              >
                VIEW FOUNDER PROFILE
                <span className='transition-transform group-hover:translate-x-1' aria-hidden='true'>→</span>
              </Link>
            ) : (
              <p className='font-poppins text-dimWhite text-[15px] leading-[26px]'>
                His work spans product development, AI systems, automation architecture and technology strategy —
                guiding Bitvion Technologies&apos; approach to systems that deliver real operational value.
              </p>
            )}
          </div>

          <div className='md:border-l md:border-white/10 md:pl-8'>
            <p className='font-poppins font-medium text-secondary text-[12px] uppercase tracking-[3px] mb-5'>
              Leadership Philosophy
            </p>
            <div className='grid grid-cols-2 gap-5'>
              {philosophy.map((item) => (
                <div key={item.title}>
                  <IconBox name={item.icon} />
                  <p className='font-poppins font-semibold text-white text-[14px] mt-3 mb-1'>{item.title}</p>
                  <p className='font-poppins text-dimWhite text-[12px] leading-[18px]'>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimateIn>

      {!isPreview && <FounderLongForm />}
    </section>
  )
}

export default FounderProfile
