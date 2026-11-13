import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import GroupsHome from './pages/GroupsHome'
import CookieConsent from './components/CookieConsent'

const Home = lazy(() => import('./pages/Home'))
const SectorPage = lazy(() => import('./pages/sectors/SectorPage'))

const lazyNamed = (importFn, name) =>
  lazy(() => importFn().then((m) => ({ default: m[name] })))

const SolutionsOverview = lazy(() => import('./pages/solutions/SolutionsOverview'))
const SolutionDetailPage = lazy(() => import('./pages/solutions/SolutionDetailPage'))
const IndustriesOverview = lazyNamed(() => import('./pages/industries/IndustryPages'), 'IndustriesOverview')
const IndustryDetailPage = lazy(() => import('./pages/industries/IndustryPages'))
const GlobalOverview = lazyNamed(() => import('./pages/global/GlobalPages'), 'GlobalOverview')
const GlobalMarketPage = lazy(() => import('./pages/global/GlobalPages'))
const CompanyOverview = lazyNamed(() => import('./pages/company/CompanyPages'), 'CompanyOverview')
const AboutPage = lazyNamed(() => import('./pages/company/CompanyPages'), 'AboutPage')
const FounderPage = lazyNamed(() => import('./pages/company/CompanyPages'), 'FounderPage')
const TechnologyPage = lazyNamed(() => import('./pages/company/CompanyPages'), 'TechnologyPage')
const CompanyCareersPage = lazyNamed(() => import('./pages/company/CareersPage'), 'CompanyCareersPage')
const CareersJobPage = lazyNamed(() => import('./pages/company/CareersJobPage'), 'CareersJobPage')
const ProductsOverview = lazyNamed(() => import('./pages/products/ProductPages'), 'ProductsOverview')
const YatrikERPPage = lazyNamed(() => import('./pages/products/ProductPages'), 'YatrikERPPage')
const InsightsPage = lazyNamed(() => import('./pages/insights/InsightPages'), 'InsightsPage')
const InsightArticlePage = lazyNamed(() => import('./pages/insights/InsightPages'), 'InsightArticlePage')
const ContactPage = lazy(() => import('./pages/ContactPages'))
const RequestProposalPage = lazyNamed(() => import('./pages/ContactPages'), 'RequestProposalPage')
const RequestDemoPage = lazyNamed(() => import('./pages/ContactPages'), 'RequestDemoPage')
const PricingPage = lazy(() => import('./pages/PricingPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const PageLoader = () => (
  <div className='min-h-[50vh] flex items-center justify-center' role='status' aria-label='Loading'>
    <div className='w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin' />
  </div>
)

const S = ({ children }) => <Suspense fallback={<PageLoader />}>{children}</Suspense>

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<GroupsHome />} />
        <Route path='technologies' element={<S><Home /></S>} />
        <Route path='business' element={<S><SectorPage slug='business' /></S>} />
        <Route path='trading' element={<S><SectorPage slug='trading' /></S>} />
        <Route path='consultancy' element={<S><SectorPage slug='consultancy' /></S>} />
        <Route path='travels' element={<S><SectorPage slug='travels' /></S>} />
        <Route path='ventures' element={<S><SectorPage slug='ventures' /></S>} />
        <Route path='imports-exports' element={<S><SectorPage slug='imports-exports' /></S>} />
        <Route path='bitvion-products' element={<S><SectorPage slug='bitvion-products' /></S>} />
        <Route path='solutions' element={<S><SolutionsOverview /></S>} />
        <Route path='solutions/:slug' element={<S><SolutionDetailPage /></S>} />
        <Route path='products' element={<S><ProductsOverview /></S>} />
        <Route path='products/yatrikerp' element={<S><YatrikERPPage /></S>} />
        <Route path='industries' element={<S><IndustriesOverview /></S>} />
        <Route path='industries/:slug' element={<S><IndustryDetailPage /></S>} />
        <Route path='global' element={<S><GlobalOverview /></S>} />
        <Route path='global/:slug' element={<S><GlobalMarketPage /></S>} />
        <Route path='company' element={<S><CompanyOverview /></S>} />
        <Route path='company/about' element={<S><AboutPage /></S>} />
        <Route path='company/founder' element={<S><FounderPage /></S>} />
        <Route path='company/technology' element={<S><TechnologyPage /></S>} />
        <Route path='company/careers' element={<S><CompanyCareersPage /></S>} />
        <Route path='company/careers/:slug' element={<S><CareersJobPage /></S>} />
        <Route path='insights' element={<S><InsightsPage /></S>} />
        <Route path='insights/:slug' element={<S><InsightArticlePage /></S>} />
        <Route path='contact' element={<S><ContactPage /></S>} />
        <Route path='pricing' element={<S><PricingPage /></S>} />
        <Route path='checkout' element={<S><CheckoutPage /></S>} />
        <Route path='request-proposal' element={<S><RequestProposalPage /></S>} />
        <Route path='request-demo' element={<S><RequestDemoPage /></S>} />
        <Route path='careers' element={<Navigate to='/company/careers' replace />} />
        <Route path='privacy-policy' element={<S><LegalPage /></S>} />
        <Route path='terms' element={<S><LegalPage /></S>} />
        <Route path='cookie-policy' element={<S><LegalPage /></S>} />
        <Route path='disclaimer' element={<S><LegalPage /></S>} />
        <Route path='refund-policy' element={<S><LegalPage /></S>} />
        <Route path='shipping-policy' element={<S><LegalPage /></S>} />
        <Route path='*' element={<S><NotFoundPage /></S>} />
      </Route>
    </Routes>
    <CookieConsent />
  </BrowserRouter>
)

export default App
