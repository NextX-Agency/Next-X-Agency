import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { BrowserFrame } from '@/components/work/DeviceFrames'
import { formatPrice, serviceCategories } from '@/content/services'

const plans = serviceCategories.find((category) => category.id === 'website-subscriptions')!.services

export function Subscriptions() {
  return (
    <section className="nx-subscriptions" aria-labelledby="subscription-teaser-title">
      <div className="wrap nx-subscriptions-inner">
        <div className="nx-subscriptions-copy">
          <p className="meta mb-5 !text-ink">Website-abonnementen</p>
          <h2 id="subscription-teaser-title" className="nx-subscriptions-title">Een website die niet stilstaat.</h2>
          <p className="mt-6 max-w-[43ch] text-lg leading-snug">Wij bouwen de site en blijven eraan werken. Onderhoud en bugfixes zijn inbegrepen; u kiest hoeveel wijzigingen u per maand nodig hebt.</p>
          <Link href="/services#website-subscriptions" className="nx-subscriptions-link">Vergelijk de abonnementen <Arrow /></Link>
        </div>
        <div className="nx-subscriptions-art">
          <BrowserFrame label="Conceptdemo · fictief merk" className="nx-subscriptions-browser">
            <Image src="/demo-previews/service-website.webp" alt="Conceptdemo van een servicewebsite voor een fictieve tandartspraktijk" fill sizes="(min-width: 768px) 44vw, 90vw" className="object-cover object-top" />
          </BrowserFrame>
          <div className="nx-subscriptions-price">Vanaf <strong>{formatPrice(plans[0].price)}</strong></div>
        </div>
      </div>
      <div className="wrap"><div className="nx-subscriptions-rail">
        {plans.map((plan) => <span key={plan.id}>{plan.name.replace(' abonnement', '')} <b>{formatPrice(plan.price)}</b></span>)}
      </div></div>
    </section>
  )
}
