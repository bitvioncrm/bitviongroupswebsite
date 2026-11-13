export const offers = [
  {
    id: 'technology-consultation',
    name: 'Technology consultation',
    price: 2500,
    summary: 'One working session on a software, AI or automation question, with written notes emailed afterwards.',
    delivery: 'Session on the agreed slot. Notes by email within 2 business days.',
  },
  {
    id: 'discovery-brief',
    name: 'Discovery brief',
    price: 15000,
    summary: 'A written scope for a custom software or automation piece of work: what is included, what is not, and the first milestone.',
    delivery: 'Document by email within 7 business days of confirmation.',
  },
  {
    id: 'yatrikerp-workshop',
    name: 'YatrikERP workshop',
    price: 25000,
    summary: 'A guided online workshop of YatrikERP for one organisation, covering the modules that match the operation, plus setup notes.',
    delivery: 'Online session and notes within 7 business days of confirmation.',
  },
  {
    id: 'software-milestone',
    name: 'Software first milestone',
    price: 50000,
    summary: 'The first build milestone of a custom software engagement. The scope is the written brief agreed before the work starts.',
    delivery: 'Deployment access and a handover note by email, on the timeline in the written scope.',
  },
]

export const formatInr = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

export const getOffer = (id) => offers.find((offer) => offer.id === id)
