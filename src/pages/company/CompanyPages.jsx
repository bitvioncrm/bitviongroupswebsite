import React from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../../components/seo/PageMeta'
import StructuredData, {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildWebPageSchema,
  personSchema,
} from '../../components/seo/StructuredData'
import PageShell from '../../components/layout/PageShell'
import PageHero from '../../components/layout/PageHero'
import FounderProfile from '../../components/FounderProfile'
import JobOpenings from '../../components/JobOpenings'
import AnimateIn from '../../components/AnimateIn'
import Breadcrumbs from '../../components/layout/Breadcrumbs'
import EntityNav from '../../components/seo/EntityNav'
import FaqSection from '../../components/seo/FaqSection'
import styles from '../../style'
import { arrowUp } from '../../assets'
import { companyFaqs, founderFaqs } from '../../data/entity'

const companyLinks = [
  { title: 'About', path: '/company/about', description: 'Who we are and what we build.' },
  { title: 'Founder', path: '/company/founder', description: 'Leadership and technology vision.' },
  { title: 'Technology', path: '/company/technology', description: 'Our engineering capabilities and stack.' },
  { title: 'Careers', path: '/company/careers', description: 'Join the Bitvion engineering team.' },
]

export const CompanyOverview = () => (
  <PageShell>
    <PageMeta title='Company | Bitvion Technologies' description='Learn about Bitvion Technologies, a Kerala-based technology business, its founder Akhil Shijo, and products including YatrikERP.' path='/company' />
    <StructuredData data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Company', path: '/company' }])} />
    <PageHero
      eyebrow='Company'
      title={<>WE BUILD TECHNOLOGY <br className='sm:block hidden' /><span className='text-gradient'>WITH PURPOSE.</span></>}
      subtitle='Bitvion Technologies engineers intelligent software, AI systems and digital products for organizations that need practical technology solutions.'
      breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Company', path: '/company' }]}
    />
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {companyLinks.map((item) => (
        <Link key={item.path} to={item.path} className='group p-6 rounded-[20px] feature-card border border-white/5 hover:border-secondary/20 transition-all'>
          <h3 className='font-poppins font-semibold text-white text-[20px] mb-2 group-hover:text-gradient'>{item.title}</h3>
          <p className='font-poppins text-dimWhite text-[15px]'>{item.description}</p>
        </Link>
      ))}
    </div>
  </PageShell>
)

export const AboutPage = () => (
  <PageShell>
    <PageMeta
      title='About Bitvion Technologies | Founded by Akhil Shijo'
      description='Bitvion Technologies is a proprietary technology enterprise founded and owned by Akhil Shijo, focused on software engineering, AI, automation, cloud technology and digital products.'
      path='/company/about'
    />
    <StructuredData
      data={[
        buildWebPageSchema({
          name: 'About Bitvion Technologies',
          description: 'About Bitvion Technologies, founded and owned by Akhil Shijo.',
          path: '/company/about',
          type: 'AboutPage',
        }),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Company', path: '/company' },
          { name: 'About', path: '/company/about' },
        ]),
        buildFAQSchema(companyFaqs),
      ]}
    />
    <PageHero
      eyebrow='About'
      title='ABOUT BITVION TECHNOLOGIES'
      subtitle='A proprietary technology enterprise founded and owned by Akhil Shijo.'
      breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Company', path: '/company' }, { name: 'About', path: '/company/about' }]}
    />
    <div className='space-y-8 max-w-[800px]'>
      <p className={styles.paragraph}>
        Bitvion Technologies is a proprietary technology enterprise founded and owned by
        {' '}<Link to='/company/founder' className='text-secondary hover:text-white transition-colors'>Akhil Shijo</Link>.
        The enterprise provides services in computer programming, consultancy and related
        activities, and builds intelligent software, AI solutions, automation systems and
        digital products for organizations in India and international markets.
      </p>
      <p className={styles.paragraph}>
        Capabilities include software engineering, artificial intelligence, machine learning,
        intelligent automation, cloud technology, digital transformation, data and analytics,
        UI/UX engineering and digital products. {' '}
        <Link to='/products/yatrikerp' className='text-secondary hover:text-white transition-colors'>
          YatrikERP by Bitvion Technologies
        </Link>
        {' '}is the primary digital product for operations platforms.
      </p>

      <section>
        <h2 className='font-poppins font-semibold text-white text-[20px] mb-4'>Company timeline</h2>
        <ol className='space-y-4'>
          <li className='p-5 rounded-xl bg-black-gradient border border-white/10'>
            <p className='font-poppins text-secondary text-[13px] mb-1'>24 January 2026</p>
            <p className='font-poppins text-dimWhite text-[15px]'>
              Bitvion Technologies was incorporated and commenced business as a proprietary
              enterprise in Kerala, India, with a primary activity of computer programming,
              consultancy and related services.
            </p>
          </li>
          <li className='p-5 rounded-xl bg-black-gradient border border-white/10'>
            <p className='font-poppins text-secondary text-[13px] mb-1'>Ongoing</p>
            <p className='font-poppins text-dimWhite text-[15px]'>
              Engineering software, AI, automation and digital products, including YatrikERP,
              and serving businesses while exploring opportunities across India and
              international markets.
            </p>
          </li>
        </ol>
      </section>

      <div className='p-6 rounded-xl bg-black-gradient border border-white/10'>
        <h2 className='font-poppins font-semibold text-white text-[20px] mb-4'>Business identity</h2>
        <dl className='grid grid-cols-1 sm:grid-cols-2 gap-4 font-poppins text-[15px]'>
          {[
            ['Name', 'Bitvion Technologies'],
            ['Organisation type', 'Proprietary'],
            ['Enterprise classification', 'Micro'],
            ['Major activity', 'Services'],
            ['Primary activity', 'Computer programming, consultancy and related activities'],
            ['Udyam Registration', 'UDYAM-KL-03-0036543'],
            ['Date of incorporation', '24 January 2026'],
            ['Date of commencement', '24 January 2026'],
            ['Locations', 'Kerala, India · Bangalore, India'],
            ['Founder & Proprietor', 'Akhil Shijo'],
            ['Official product', 'YatrikERP'],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className='text-secondary text-[13px] mb-1'>{label}</dt>
              <dd className='text-dimWhite'>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <EntityNav
        label='Related to Bitvion Technologies'
        links={[
          { name: 'Akhil Shijo, Founder & Proprietor of Bitvion Technologies', path: '/company/founder' },
          { name: 'YatrikERP', path: '/products/yatrikerp' },
          { name: 'Solutions', path: '/solutions' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <FaqSection faqs={companyFaqs} />
    </div>
  </PageShell>
)

export const FounderPage = () => (
  <PageShell>
    <PageMeta
      title='Akhil Shijo | Founder & Proprietor of Bitvion Technologies'
      description='Akhil Shijo is the Founder & Proprietor of Bitvion Technologies, a technology enterprise focused on software engineering, AI, intelligent automation and digital products.'
      path='/company/founder'
      type='profile'
      image='https://bitvion.in/founder.webp'
      imageAlt='Akhil Shijo, Founder and Proprietor of Bitvion Technologies'
    />
    <StructuredData
      data={[
        personSchema,
        buildWebPageSchema({
          name: 'Akhil Shijo | Founder & Proprietor of Bitvion Technologies',
          description:
            'Professional profile of Akhil Shijo, Founder & Proprietor of Bitvion Technologies.',
          path: '/company/founder',
          type: 'ProfilePage',
        }),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Company', path: '/company' },
          { name: 'Founder', path: '/company/founder' },
          { name: 'Akhil Shijo', path: '/company/founder' },
        ]),
        buildFAQSchema(founderFaqs),
      ]}
    />
    <div className='pt-28 sm:pt-32'>
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Company', path: '/company' },
          { name: 'Founder', path: '/company/founder' },
          { name: 'Akhil Shijo', path: '/company/founder' },
        ]}
      />
    </div>
    <FounderProfile variant='page' />
  </PageShell>
)

const techCategories = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Backend', items: ['Python', 'Node.js', 'Django', 'Flask', 'FastAPI'] },
  { title: 'AI/ML', items: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI APIs'] },
  { title: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'] },
  { title: 'Cloud', items: ['AWS', 'Docker', 'Kubernetes', 'Serverless'] },
  { title: 'DevOps', items: ['CI/CD', 'GitHub Actions', 'Terraform', 'Monitoring'] },
  { title: 'Mobile', items: ['React Native', 'Progressive Web Apps'] },
  { title: 'Automation', items: ['Workflow Engines', 'RPA', 'API Integrations'] },
]

export const TechnologyPage = () => (
  <PageShell>
    <PageMeta title='Technology | Bitvion Technologies' description='Modern technology capabilities including frontend, backend, AI/ML, cloud and DevOps from Bitvion Technologies.' path='/company/technology' />
    <StructuredData data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Company', path: '/company' }, { name: 'Technology', path: '/company/technology' }])} />
    <PageHero eyebrow='Technology' title={<>ENGINEERED WITH <span className='text-gradient'>MODERN TECHNOLOGY.</span></>} subtitle='Technology capabilities our engineering team works with across projects. Not every technology is used on every engagement.' breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Company', path: '/company' }, { name: 'Technology', path: '/company/technology' }]} />
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {techCategories.map((cat) => (
        <div key={cat.title} className='p-6 rounded-xl bg-black-gradient border border-white/5 hover:border-secondary/20 transition-colors'>
          <h3 className='font-poppins font-semibold text-secondary text-[16px] mb-4'>{cat.title}</h3>
          <ul className='space-y-2' role='list'>
            {cat.items.map((item) => (
              <li key={item} className='font-poppins text-dimWhite text-[14px]'>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </PageShell>
)

export const CompanyCareersPage = () => null // See pages/company/CareersPage.jsx
