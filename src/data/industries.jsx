export const industriesList = [
  {
    slug: 'transportation',
    title: 'Transportation',
    headline: <>TECHNOLOGY FOR <span className='text-gradient'>TRANSPORTATION</span> OPERATIONS.</>,
    description: 'Software and AI systems for scheduling, tracking, fleet operations and passenger services in transportation organizations.',
    capabilities: ['Fleet scheduling systems', 'GPS and tracking integration', 'Ticketing workflows', 'Operational dashboards', 'AI-assisted planning'],
    meta: {
      title: 'Transportation Technology Solutions | Bitvion Technologies',
      description: 'Software, AI and automation solutions for transportation operations from Bitvion Technologies.',
    },
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    headline: <>INTELLIGENT SYSTEMS FOR <span className='text-gradient'>LOGISTICS.</span></>,
    description: 'Applications and automation for shipment tracking, inventory coordination, route planning and supply chain visibility.',
    capabilities: ['Route optimization', 'Inventory tracking', 'Warehouse workflows', 'Integration APIs', 'Operational reporting'],
    meta: {
      title: 'Logistics Technology Solutions | Bitvion Technologies',
      description: 'Software and automation solutions for logistics and supply chain operations from Bitvion Technologies.',
    },
  },
  {
    slug: 'enterprise',
    title: 'Enterprise',
    headline: <>ENTERPRISE <span className='text-gradient'>SOFTWARE SYSTEMS.</span></>,
    description: 'Custom enterprise applications, integrations and platforms designed for complex organizational requirements.',
    capabilities: ['Enterprise applications', 'System integrations', 'Workflow automation', 'Role-based access', 'Reporting and analytics'],
    meta: {
      title: 'Enterprise Technology Solutions | Bitvion Technologies',
      description: 'Enterprise software, integrations and digital systems from Bitvion Technologies.',
    },
  },
  {
    slug: 'education',
    title: 'Education',
    headline: <>DIGITAL SYSTEMS FOR <span className='text-gradient'>EDUCATION.</span></>,
    description: 'Web platforms, management systems and automation tools for educational institutions and training organizations.',
    capabilities: ['Management platforms', 'Student information systems', 'Learning portals', 'Administrative automation', 'Reporting dashboards'],
    meta: {
      title: 'Education Technology Solutions | Bitvion Technologies',
      description: 'Software and digital systems for educational institutions from Bitvion Technologies.',
    },
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    headline: <>TECHNOLOGY FOR <span className='text-gradient'>HEALTHCARE</span> OPERATIONS.</>,
    description: 'Secure applications and workflow systems for healthcare administration, scheduling and operational management.',
    capabilities: ['Administrative systems', 'Appointment scheduling', 'Workflow automation', 'Secure data handling', 'Operational dashboards'],
    meta: {
      title: 'Healthcare Technology Solutions | Bitvion Technologies',
      description: 'Software and workflow systems for healthcare operations from Bitvion Technologies.',
    },
  },
  {
    slug: 'financial-services',
    title: 'Financial Services',
    headline: <>SOFTWARE FOR <span className='text-gradient'>FINANCE TEAMS.</span></>,
    description: 'Bitvion Technologies builds operational software for finance teams. It does not provide banking, lending, investments, or money transfer.',
    capabilities: ['Operational software', 'Reporting systems', 'Process automation', 'Secure integrations', 'Audit-ready workflows'],
    meta: {
      title: 'Financial Services Technology | Bitvion Technologies',
      description: 'Software engineering and automation for financial services operations from Bitvion Technologies.',
    },
  },
]

export const getIndustryBySlug = (slug) => industriesList.find((i) => i.slug === slug)
