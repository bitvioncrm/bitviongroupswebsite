import React from 'react'
import Hero from '../components/Hero'
import TechnologyPositioning from '../components/TechnologyPositioning'
import CoreCapabilities from '../components/CoreCapabilities'
import AISection from '../components/AISection'
import SoftwareSection from '../components/SoftwareSection'
import ProcessTimeline from '../components/ProcessTimeline'
import AutomationSection from '../components/AutomationSection'
import DigitalTransformationPreview from '../components/DigitalTransformationPreview'
import ProductPreview from '../components/ProductPreview'
import GlobalPreview from '../components/GlobalPreview'
import FounderPreview from '../components/FounderPreview'
import JobOpenings from '../components/JobOpenings'
import FinalCTA from '../components/FinalCTA'
import PageMeta from '../components/seo/PageMeta'
import StructuredData, {
  buildWebPageSchema,
  organizationSchema,
  personSchema,
  websiteSchema,
} from '../components/seo/StructuredData'
import { HOME_DESCRIPTION, HOME_TITLE } from '../data/entity'
import styles from '../style'

const Home = () => {
  return (
    <>
      <PageMeta
        title={HOME_TITLE}
        description={HOME_DESCRIPTION}
        path='/technologies'
        keywords='Bitvion Technologies, AI software company India, software company Kerala, software company Bangalore, technology company India, custom software development, intelligent automation, YatrikERP, Akhil Shijo'
        image='https://bitvion.in/bitvion-groups-seal.webp'
        imageAlt='Bitvion Groups seal'
        siteName='Bitvion Technologies'
      />
      <StructuredData
        data={[
          organizationSchema,
          personSchema,
          websiteSchema,
          buildWebPageSchema({
            name: HOME_TITLE,
            description: HOME_DESCRIPTION,
            path: '/technologies',
          }),
        ]}
      />
      <Hero />
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <TechnologyPositioning />
          <CoreCapabilities />
          <AISection />
          <SoftwareSection />
          <ProcessTimeline />
          <AutomationSection />
          <DigitalTransformationPreview />
          <ProductPreview />
          <GlobalPreview />
          <FounderPreview />
          <JobOpenings />
          <FinalCTA />
        </div>
      </div>
    </>
  )
}

export default Home
