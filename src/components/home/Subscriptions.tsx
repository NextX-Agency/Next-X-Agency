import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { formatPrice, serviceCategories } from '@/content/services'

const plans = serviceCategories.find((category) => category.id === 'website-subscriptions')!.services

export function Subscriptions() {
  return (
    <section className="nx-subscriptions" aria-labelledby="subscription-teaser-title">
      <div className="wrap nx-subscriptions-inner">
        <div className="nx-subscriptions-copy">
          <p className="meta mb-5 !text-ink/70">Website-abonnementen</p>
          <h2 id="subscription-teaser-title" className="nx-subscriptions-title">Een website die niet stilstaat.</h2>
          <p className="mt-6 max-w-[43ch] text-lg leading-snug">Wij bouwen de site en blijven eraan werken. Onderhoud en bugfixes zijn inbegrepen; u kiest hoeveel wijzigingen u per maand nodig hebt.</p>
          <Link href="/services#website-subscriptions" className="nx-subscriptions-link">Vergelijk de abonnementen <Arrow /></Link>
        </div>
        <div className="nx-subscriptions-art">
          <div className="nx-subscriptions-browser">
            <div className="nx-window-bar"><span /><span /><span /><b>VOORBEELD / SERVICEWEBSITE</b></div>
            <div className="relative aspect-[8/5]">
              <Image src="/demo-previews/service-website.webp" alt="Voorbeeld van een servicewebsite met duidelijke informatie en afspraken" fill sizes="(min-width: 768px) 44vw, 90vw" className="object-cover" />
            </div>
          </div>
          <div className="nx-subscriptions-price">Vanaf <strong>{formatPrice(plans[0].price)}</strong></div>
        </div>
      </div>
      <div className="wrap nx-subscriptions-rail" aria-label="Website-abonnementen">
        {plans.map((plan) => <span key={plan.id}>{plan.name} <b>{formatPrice(plan.price)}</b></span>)}
      </div>
    </section>
  )
}
