'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
const Globe = dynamic(() => import('./Globe').then((m) => m.Globe), {
  ssr: false,
})

export function Studio({ inquiry = false }: { inquiry?: boolean }) {
  return (
    <section
      data-theme="dark"
      className="studio-section"
      aria-labelledby="studio-title"
    >
      <div className="wrap studio-layout">
        <div className="studio-globe">
          <Globe />
          <p className="meta">Vanuit Paramaribo</p>
        </div>
        <div className="studio-copy">
          <h2 id="studio-title" className="t-h2">
            {inquiry ? 'Vanuit Paramaribo.' : 'Korte lijnen.'}
            <br />
            {inquiry ? 'Ook op afstand.' : 'Een brede blik.'}
          </h2>
          <p className="t-lead mt-7">
            {inquiry
              ? 'Uw project heeft één vaste lijn naar NextX. We stemmen het werk en de feedback af via WhatsApp, e-mail of een gesprek.'
              : 'NextX is uw aanspreekpunt voor creatief en technisch werk. We coördineren de specialisten die uw project nodig heeft, van ontwerp tot uitvoering.'}
          </p>
          <Link
            href={inquiry ? '/contact' : '/about'}
            className="link-arrow link-line mt-8"
          >
            {inquiry ? 'Bespreek uw project' : 'Maak kennis met de studio'}{' '}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
