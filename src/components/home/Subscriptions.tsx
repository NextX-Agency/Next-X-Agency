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
                    <h2 id="subscription-teaser-title" className="nx-subscriptions-title">Een website die niet stilstaat.</h2>
          <p className="mt-6 max-w-[30ch] text-xl font-medium leading-snug">Een website-abonnement: wij bouwen, onderhouden en passen aan.</p>
          <Link href="/services#website-subscriptions" className="btn mt-9 bg-ink text-paper hover:bg-paper hover:text-ink">Bekijk de abonnementen <Arrow /></Link>
        </div>
        <div className="nx-subscriptions-art">
          <BrowserFrame label="Conceptdemo · fictief merk" className="nx-subscriptions-browser">
            <Image src="/demo-previews/service-website.webp" alt="Conceptdemo van een servicewebsite voor een fictieve tandartspraktijk" fill sizes="(min-width: 768px) 44vw, 90vw" className="object-cover object-top" />
          </BrowserFrame>
          <div className="nx-subscriptions-price">Vanaf <strong>{formatPrice(plans[0].price)}</strong></div>
        </div>
      </div>
    </section>
  )
}
