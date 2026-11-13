import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PageMeta from '../../components/seo/PageMeta'
import StructuredData, { buildBreadcrumbSchema, buildFAQSchema, buildItemListSchema, buildServiceSchema, buildWebPageSchema } from '../../components/seo/StructuredData'
import FaqSection from '../../components/seo/FaqSection'
import SectionHeading from '../../components/SectionHeading'
import AnimateIn, { StaggerContainer, StaggerItem } from '../../components/AnimateIn'
import CTAButton from '../../components/CTAButton'
import RevealText from '../../components/RevealText'
import HeroBackground from '../../components/hero/HeroBackground'
import BitvionCore from '../../components/hero/BitvionCore'
import { getSector, sectors } from '../../data/groups'
import { sectorStories } from '../../data/sectorStories'
import { sectorDepth } from '../../data/sectorDepth'
import styles, { layout } from '../../style'
import '../groups.css'

const ANGLES = [-90, 0, 90, 180]
const INNER = [-135, -45, 45, 135]

const ORBIT = {
  business: [
    { label: 'OFFER', path: '/contact' },
    { label: 'MARKET', path: '/consultancy' },
    { label: 'GROWTH', path: '/ventures' },
    { label: 'RHYTHM', path: '/technologies' },
  ],
  trading: [
    { label: 'GOODS', path: '/contact' },
    { label: 'ORDERS', path: '/imports-exports' },
    { label: 'RECORDS', path: '/technologies' },
    { label: 'REVIEW', path: '/contact' },
  ],
  consultancy: [
    { label: 'MODEL', path: '/contact' },
    { label: 'CHOICE', path: '/technologies' },
    { label: 'BRIEF', path: '/business' },
    { label: 'HANDOVER', path: '/contact' },
  ],
  travels: [
    { label: 'PURPOSE', path: '/contact' },
    { label: 'ROUTE', path: '/global' },
    { label: 'CHANGE', path: '/contact' },
    { label: 'RECORD', path: '/business' },
  ],
  ventures: [
    { label: 'PROBLEM', path: '/contact' },
    { label: 'PROOF', path: '/technologies' },
    { label: 'BUILD', path: '/business' },
    { label: 'DECIDE', path: '/consultancy' },
  ],
  'imports-exports': [
    { label: 'LANE', path: '/contact' },
    { label: 'PAPERS', path: '/trading' },
    { label: 'PARTNERS', path: '/industries/logistics' },
    { label: 'REVIEW', path: '/technologies' },
  ],
  'bitvion-products': [
    { label: 'YATRIK', path: '/products/yatrikerp' },
    { label: 'USERS', path: '/products' },
    { label: 'DEMO', path: '/request-demo' },
    { label: 'BUILD', path: '/technologies' },
  ],
}

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
}

const SectorHero = ({ sector, story }) => {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const copyY = useTransform(scrollY, [0, 280], [0, reduceMotion ? 0 : -16])
  const visualY = useTransform(scrollY, [0, 360], [0, reduceMotion ? 0 : -36])
  const nodes = ORBIT[sector.slug] || ORBIT.business
  const primary = nodes.map((node, index) => ({ ...node, angle: ANGLES[index] }))
  const secondary = story.services.slice(4, 8).map((item, index) => ({
    label: item.title,
    angle: INNER[index],
  }))

  return (
    <section className='sector-hero relative overflow-hidden min-h-[100svh] flex items-center' aria-labelledby='sector-heading'>
      <HeroBackground color={hexToRgb(sector.accent)} />
      <div className='sector-hero__wash' style={{ background: `radial-gradient(circle, ${sector.accent}33, transparent 68%)` }} aria-hidden='true' />
      <div className='relative z-[1] w-full max-w-[1320px] mx-auto px-4 xs:px-5 sm:px-8 lg:px-10 pt-[calc(92px+env(safe-area-inset-top,0px))] pb-10 lg:pb-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 lg:gap-10 items-center'>
        <motion.div
          style={reduceMotion ? undefined : { y: copyY }}
          initial={reduceMotion ? false : 'hidden'}
          animate='visible'
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }}
        >
          <motion.p className='groups-kicker' variants={fade}>
            <i style={{ background: sector.accent, boxShadow: `0 0 12px ${sector.accent}` }} />
            {sector.kicker}
          </motion.p>
          <motion.p className='font-poppins text-[13px] text-dimWhite mt-5' variants={fade}>
            <Link to='/' className='text-white hover:text-secondary'>Bitvion Groups</Link>
            <span aria-hidden='true'> / </span>
            {sector.name}
          </motion.p>
          <motion.h1 id='sector-heading' className='sector-hero__title mt-4' variants={fade}>
            <RevealText>{sector.headline}</RevealText>
          </motion.h1>
          <motion.p className='groups-lead mt-5' variants={fade}>{sector.lede}</motion.p>
          <motion.p className='groups-lead mt-3' variants={fade}>{story.heroSupport}</motion.p>
          <motion.div className='groups-actions' variants={fade}>
            <CTAButton to='/contact'>Talk to Bitvion</CTAButton>
            <CTAButton to={(sector.links.find((link) => link.href !== '/contact') || { href: '/' }).href} variant='secondary'>
              {sector.links.find((link) => link.href !== '/contact')?.label || 'The Group'}
            </CTAButton>
          </motion.div>
          <motion.div className='lg:hidden mt-8' variants={fade}>
            <BitvionCore
              variant='mobile'
              primary={primary}
              secondary={secondary}
              accent={sector.accent}
              coreLabel={sector.nav}
              markSrc='/bitvion-groups-seal-display.webp'
              roundMark
              markClassName='seal-mark'
              ariaLabel={`${sector.name} network`}
            />
          </motion.div>
        </motion.div>

        <motion.div className='hidden lg:block' style={reduceMotion ? undefined : { y: visualY }}>
          <BitvionCore
            variant='desktop'
            primary={primary}
            secondary={secondary}
            accent={sector.accent}
            coreLabel={sector.nav}
            markSrc='/bitvion-groups-seal-display.webp'
            roundMark
            markClassName='seal-mark'
            ariaLabel={`${sector.name} network`}
          />
        </motion.div>
      </div>
    </section>
  )
}

const Practice = ({ sector, practice }) => (
  <section className={layout.sectionReverse} aria-labelledby='practice-heading'>
    <div className={`${layout.sectionImgReverse} relative min-h-[320px]`}>
      <div className='relative w-full flex flex-col items-center gap-3 py-6'>
        {practice.flow.map((step, index) => (
          <React.Fragment key={step}>
            <motion.div
              className='feature-card w-full max-w-[300px] px-6 py-4 rounded-xl bg-black-gradient border text-center'
              style={{ borderColor: `${sector.accent}44` }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
            >
              <span className='font-poppins text-[13px] mr-2' style={{ color: sector.accent }}>0{index + 1}</span>
              <span className='font-poppins text-white text-[14px]'>{step}</span>
            </motion.div>
            {index < practice.flow.length - 1 && (
              <div className='w-[2px] h-[16px]' style={{ background: `linear-gradient(${sector.accent}, transparent)` }} aria-hidden='true' />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
    <div className={layout.sectionInfo}>
      <SectionHeading
        eyebrow={practice.eyebrow}
        title={<>{practice.titleBefore} <span className='text-gradient'>{practice.titleAccent}</span></>}
        subtitle={practice.subtitle}
      />
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8' role='list'>
        {practice.points.map((item) => (
          <li key={item} className='flex items-center gap-3 px-4 py-3 rounded-lg border border-white/5 hover:border-white/15 transition-colors duration-300'>
            <span className='w-[6px] h-[6px] rounded-full shrink-0' style={{ background: sector.accent }} aria-hidden='true' />
            <span className='font-poppins text-dimWhite text-[15px]'>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

const Method = ({ sector, method }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.paddingY} aria-labelledby='method-heading' ref={ref}>
      <SectionHeading
        eyebrow={method.eyebrow}
        title={<>{method.titleBefore}<br className='sm:block hidden' /> <span className='text-gradient'>{method.titleAccent}</span></>}
        subtitle={method.subtitle}
        align='center'
        className='mb-12 sm:mb-16'
      />
      <div className='relative'>
        <div className='hidden lg:block absolute top-[32px] left-[8%] right-[8%] h-[2px]' style={{ background: `linear-gradient(90deg, transparent, ${sector.accent}66, transparent)` }} aria-hidden='true' />
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6'>
          {method.steps.map((step, index) => (
            <motion.article
              key={step.title}
              className='flex flex-col items-center text-center'
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <div
                className='w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full bg-dimBlue border flex items-center justify-center mb-4'
                style={{ borderColor: `${sector.accent}55` }}
              >
                <span className='font-poppins font-semibold text-[14px]' style={{ color: sector.accent }}>0{index + 1}</span>
              </div>
              <h3 className='font-poppins font-semibold text-white text-[16px]'>{step.title}</h3>
              <p className='font-poppins text-dimWhite text-[13px] leading-[20px] mt-2'>{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

const SectorPage = ({ slug }) => {
  const sector = getSector(slug)
  const story = sectorStories[slug]
  if (!sector || !story) return null

  const title = story.seoTitle
  const description = story.seoDescription
  const keywords = [
    `${sector.name} India`,
    `${sector.name} Kerala`,
    `${sector.name} Bangalore`,
    'Bitvion Groups India',
    'Bitvion Technologies India',
    'software company Kerala',
    'technology company Bangalore',
    'Akhil Shijo',
    sector.kicker,
    ...story.services.slice(0, 4).map((item) => item.title),
  ].join(', ')
  const depth = sectorDepth[slug] || []
  const crumbs = [
    { name: 'Bitvion Groups', path: '/' },
    { name: sector.name, path: sector.path },
  ]

  return (
    <>
      <PageMeta
        title={title}
        description={description}
        path={sector.path}
        keywords={keywords}
        siteName='Bitvion Groups'
        image='https://bitvion.in/bitvion-groups-seal.webp'
        imageAlt={`${sector.name} — Bitvion Groups`}
      />
      <StructuredData
        data={[
          buildWebPageSchema({ name: title, description, path: sector.path }),
          buildServiceSchema(sector.name, description, sector.path),
          buildBreadcrumbSchema(crumbs),
          buildFAQSchema(story.faqs),
          buildItemListSchema(`${sector.name} services`, story.services.map((item) => ({
            name: item.title,
            description: item.text,
            path: sector.path,
          }))),
        ]}
      />

      <SectorHero sector={sector} story={story} />

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={styles.boxWidth}>
          <section className={styles.paddingY} aria-labelledby='position-heading'>
            <AnimateIn>
              <SectionHeading
                eyebrow={story.positioning.eyebrow}
                title={<>{story.positioning.titleBefore} <span className='text-gradient'>{story.positioning.titleAccent}</span></>}
                subtitle={story.positioning.subtitle}
              />
            </AnimateIn>
            <AnimateIn delay={0.08}>
              <p id='position-heading' className={`${styles.paragraph} max-w-[760px] mt-8`}>{sector.summary}</p>
            </AnimateIn>
          </section>

          <section className={styles.paddingY} aria-labelledby='services-heading'>
            <AnimateIn>
              <SectionHeading
                eyebrow={`${sector.name}`}
                title={<>SERVICES ACROSS <span className='text-gradient'>THE SECTOR.</span></>}
                subtitle='The work this page is willing to describe. Each item is a practice, not a promise of a result.'
                align='center'
                className='mb-12 sm:mb-16'
              />
            </AnimateIn>
            <StaggerContainer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6' stagger={0.07}>
              {story.services.map((service, index) => (
                <StaggerItem key={service.title}>
                  <article className={`feature-card h-full flex flex-col p-6 sm:p-8 rounded-[20px] border border-white/5 hover:border-white/15 transition-all duration-500 ${index % 2 === 0 ? '' : 'lg:mt-8'}`}>
                    <span className='font-poppins font-semibold text-[14px] mb-4' style={{ color: sector.accent }}>0{index + 1}</span>
                    <h3 className='font-poppins font-semibold text-white text-[20px] leading-[28px] mb-3'>{service.title}</h3>
                    <p className='font-poppins text-dimWhite text-[16px] leading-[26px]'>{service.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <Practice sector={sector} practice={story.practice} />
          <Method sector={sector} method={story.method} />

          <section className={layout.section} aria-labelledby='disciplines-heading'>
            <div className={layout.sectionInfo}>
              <SectionHeading
                eyebrow={story.disciplines.eyebrow}
                title={<>{story.disciplines.titleBefore} <span className='text-gradient'>{story.disciplines.titleAccent}</span></>}
                subtitle={story.disciplines.subtitle}
              />
            </div>
            <StaggerContainer className={`${layout.sectionImg} grid grid-cols-1 sm:grid-cols-2 gap-3`} stagger={0.05}>
              {story.disciplines.items.map((item) => (
                <StaggerItem key={item}>
                  <div className='px-4 py-4 rounded-xl bg-black-gradient border border-white/5 font-poppins text-white text-[15px]'>
                    {item}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <section className={styles.paddingY} aria-labelledby='audience-heading'>
            <SectionHeading
              eyebrow='Who it is for'
              title={<>THE PEOPLE THIS <span className='text-gradient'>SECTOR FITS.</span></>}
              subtitle='A sector is useful when the reader can recognise their situation, and leave when they cannot.'
              className='mb-10'
            />
            <StaggerContainer className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6' stagger={0.08}>
              {story.audiences.map((item, index) => (
                <StaggerItem key={item.title}>
                  <article className='feature-card p-6 sm:p-8 rounded-[20px] border border-white/5 h-full'>
                    <p className='font-poppins text-[13px] tracking-[0.16em] mb-3' style={{ color: sector.accent }}>0{index + 1}</p>
                    <h3 className='font-poppins font-semibold text-white text-[22px] mb-3'>{item.title}</h3>
                    <p className='font-poppins text-dimWhite text-[16px] leading-[26px]'>{item.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <section className={styles.paddingY} aria-labelledby='principles-heading'>
            <SectionHeading
              eyebrow='House standard'
              title={<>HOW THIS SECTOR <span className='text-gradient'>BEHAVES.</span></>}
              align='center'
              className='mb-10'
            />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {story.principles.map((item, index) => (
                <AnimateIn key={item.title} delay={index * 0.06}>
                  <article className='h-full p-6 rounded-[20px] bg-black-gradient border border-white/5'>
                    <h3 className='font-poppins font-semibold text-white text-[18px] mb-3'>{item.title}</h3>
                    <p className='font-poppins text-dimWhite text-[15px] leading-[24px]'>{item.text}</p>
                  </article>
                </AnimateIn>
              ))}
            </div>
          </section>

          <section className={styles.paddingY} aria-labelledby='depth-heading'>
            <SectionHeading
              eyebrow='In the work'
              title={<>WHAT THE PAGE IS <span className='text-gradient'>ACTUALLY SAYING.</span></>}
              subtitle={`${sector.name} is a sector of Bitvion Groups. The legal technology enterprise remains Bitvion Technologies, founded and led by Akhil Shijo from Kerala and Bangalore.`}
              className='mb-10'
            />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6'>
              {depth.map((item, index) => (
                <AnimateIn key={item.title} delay={index * 0.06}>
                  <article className='h-full p-6 sm:p-8 rounded-[20px] bg-black-gradient border border-white/5'>
                    <h3 id={index === 0 ? 'depth-heading' : undefined} className='font-poppins font-semibold text-white text-[22px] mb-4'>{item.title}</h3>
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph} className='font-poppins text-dimWhite text-[15px] leading-[26px] mb-4 last:mb-0'>{paragraph}</p>
                    ))}
                  </article>
                </AnimateIn>
              ))}
            </div>
          </section>

          <section className={styles.paddingY} aria-labelledby='house-heading'>
            <SectionHeading
              eyebrow='The rest of the house'
              title={<>CONTINUE THROUGH <span className='text-gradient'>BITVION GROUPS.</span></>}
              subtitle='Each name is a separate page. Technologies keeps the full company site.'
              className='mb-8'
            />
            <div className='flex flex-wrap gap-3 mb-8'>
              {sector.links.map((link) => (
                <Link key={link.href} to={link.href} className='font-poppins text-white border border-white/15 rounded-full px-4 py-2 text-[14px] hover:border-secondary/50 transition-colors'>
                  {link.label}
                </Link>
              ))}
            </div>
            <StaggerContainer className='grid sm:grid-cols-2 lg:grid-cols-4 gap-3' stagger={0.05}>
              {sectors.filter((item) => item.slug !== sector.slug).map((item) => (
                <StaggerItem key={item.slug}>
                  <Link to={item.path} className='feature-card block p-5 rounded-2xl border border-white/5 h-full'>
                    <p className='text-[12px] tracking-[0.16em] uppercase font-poppins' style={{ color: item.accent }}>{item.nav}</p>
                    <p className='text-white font-poppins mt-2 text-[16px]'>{item.name}</p>
                    <p className='text-dimWhite font-poppins text-[13px] mt-2 leading-[20px]'>{item.kicker}</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <FaqSection title={`Questions about ${sector.name}`} faqs={story.faqs} />

          <AnimateIn>
            <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow border border-white/5 relative overflow-hidden`} aria-labelledby='sector-cta'>
              <motion.div
                className='absolute inset-0 pointer-events-none'
                style={{ background: `linear-gradient(90deg, transparent, ${sector.accent}22, transparent)` }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                aria-hidden='true'
              />
              <div className='flex-1 flex flex-col relative z-10'>
                <h2 id='sector-cta' className={styles.heading2}>
                  START WITH <span className='text-gradient'>{sector.nav.toUpperCase()}.</span>
                </h2>
                <p className={`${styles.paragraph} max-w-[520px] mt-5`}>{sector.lede}</p>
              </div>
              <div className='flex flex-col xs:flex-row flex-wrap gap-3 sm:ml-10 ml-0 mt-6 sm:mt-0 relative z-10 w-full sm:w-auto'>
                <CTAButton to='/contact'>Start a Conversation</CTAButton>
                <CTAButton to='/' variant='secondary'>Back to the Group</CTAButton>
              </div>
            </section>
          </AnimateIn>
        </div>
      </div>
    </>
  )
}

export default SectorPage
