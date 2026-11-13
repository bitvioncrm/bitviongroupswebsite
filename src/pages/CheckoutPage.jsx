import React, { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageMeta from '../components/seo/PageMeta'
import StructuredData, { buildBreadcrumbSchema } from '../components/seo/StructuredData'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/layout/PageHero'
import { formatInr, getOffer, offers } from '../data/offers'

const CheckoutPage = () => {
  const [params, setParams] = useSearchParams()
  const selected = getOffer(params.get('offer')) || offers[0]
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [error, setError] = useState('')
  const [order, setOrder] = useState(null)

  const reference = useMemo(() => {
    if (!order) return ''
    return order.reference
  }, [order])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const placeOrder = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Name, email and phone are required.')
      return
    }
    setError('')
    const stamp = new Date()
    const referenceId = `BV${stamp.getFullYear()}${String(stamp.getMonth() + 1).padStart(2, '0')}${String(stamp.getDate()).padStart(2, '0')}${String(stamp.getHours()).padStart(2, '0')}${String(stamp.getMinutes()).padStart(2, '0')}`
    setOrder({
      reference: referenceId,
      offer: selected,
      customer: form,
    })
  }

  return (
    <PageShell>
      <PageMeta
        title='Checkout | Bitvion Technologies'
        description='Checkout for Bitvion Technologies services. Prices are shown in Indian Rupees before you place the order.'
        path='/checkout'
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Checkout', path: '/checkout' }])} />
      <PageHero
        eyebrow='Checkout'
        title={<>YOUR <span className='text-gradient'>ORDER.</span></>}
        subtitle='Pay Bitvion Technologies in Indian Rupees. The price is shown before you pay. No account is required.'
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }, { name: 'Checkout', path: '/checkout' }]}
      />

      {order ? (
        <div className='max-w-[720px] p-6 rounded-[20px] bg-black-gradient border border-secondary/30'>
          <h2 className='font-poppins font-semibold text-white text-[24px]'>Amount due</h2>
          <p className='font-poppins text-dimWhite mt-3'>Payment reference {reference}</p>
          <p className='font-poppins text-white mt-4'>{order.offer.name}</p>
          <p className='font-poppins text-dimWhite text-[14px] mt-1'>Quantity 1 · Shipping ₹0</p>
          <p className='font-poppins text-secondary text-[32px] mt-3'>{formatInr(order.offer.price)}</p>
          <p className='font-poppins text-white mt-4'>Payable to Bitvion Technologies</p>
          <p className='font-poppins text-dimWhite text-[15px] leading-[24px] mt-2'>
            Billed to {order.customer.name}, {order.customer.email}, {order.customer.phone}. GST, where it applies, is extra and is shown on the invoice. This screen is the payment step for the amount above.
          </p>
          <Link to='/pricing' className='inline-block mt-6 font-poppins text-secondary'>Back to services</Link>
        </div>
      ) : (
        <div className='grid lg:grid-cols-[1fr_0.9fr] gap-8'>
          <form onSubmit={placeOrder} className='space-y-4' noValidate>
            <label className='block font-poppins text-white text-[14px]'>
              Service
              <select
                className='mt-2 w-full min-h-[48px] rounded-[11px] bg-[#030912] border border-white/15 px-3 text-white'
                value={selected.id}
                onChange={(event) => setParams({ offer: event.target.value })}
              >
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.id}>{offer.name} — {formatInr(offer.price)}</option>
                ))}
              </select>
            </label>
            {[
              ['name', 'Full name', 'text'],
              ['email', 'Email', 'email'],
              ['phone', 'Phone', 'tel'],
              ['company', 'Company (optional)', 'text'],
            ].map(([name, label, type]) => (
              <label key={name} className='block font-poppins text-white text-[14px]'>
                {label}
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={onChange}
                  required={name !== 'company'}
                  className='mt-2 w-full min-h-[48px] rounded-[11px] bg-[#030912] border border-white/15 px-3 text-white'
                />
              </label>
            ))}
            {error && <p className='font-poppins text-[14px] text-red-400' role='alert'>{error}</p>}
            <button type='submit' className='hero-cta-primary min-h-[52px] px-6 rounded-[11px] font-poppins font-medium text-primary'>
              Pay {formatInr(selected.price)}
            </button>
          </form>
          <aside className='p-6 rounded-[20px] bg-black-gradient border border-white/10 h-fit'>
            <h2 className='font-poppins font-semibold text-white text-[20px]'>{selected.name}</h2>
            <p className='font-poppins text-dimWhite text-[15px] mt-3'>{selected.summary}</p>
            <p className='font-poppins text-secondary text-[32px] mt-4'>{formatInr(selected.price)}</p>
            <ul className='mt-4 space-y-2 font-poppins text-[14px] text-dimWhite'>
              <li>Quantity: 1</li>
              <li>Shipping: ₹0. This is a digital service.</li>
              <li>Amount due: {formatInr(selected.price)}</li>
              <li>GST, where it applies, is extra and will be shown on the invoice.</li>
              <li>{selected.delivery}</li>
            </ul>
            <p className='font-poppins text-[13px] text-white/70 mt-4'>
              Cancel before the work starts for a full refund to the original payment method within 5–7 business days. Card numbers are not entered on this page. Complaints are answered within 4 business days.
            </p>
            <p className='font-poppins text-[13px] text-white/70 mt-3'>
              By paying you agree to the <Link className='text-secondary' to='/terms'>Terms</Link>, the <Link className='text-secondary' to='/refund-policy'>Refund &amp; Cancellation Policy</Link> and the <Link className='text-secondary' to='/shipping-policy'>Shipping &amp; Delivery Policy</Link>.
            </p>
          </aside>
        </div>
      )}
    </PageShell>
  )
}

export default CheckoutPage
