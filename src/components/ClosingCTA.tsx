import Link from 'next/link'
import { site, whatsappHref } from '@/content/site'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'

export function ClosingCTA({ title = 'Vertel ons wat u wilt bouwen.' }: { title?: string }) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="wrap grid-12 gap-y-10">
        <Reveal className="col-span-4 md:col-span-9">
          <h2 id="cta-title" className="t-h1 max-w-[14ch]">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="col-span-4 flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-12">
          <Link href="/contact" className="btn btn-primary">
            Start een project
            <Arrow />
          </Link>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-arrow link-line py-1">
            WhatsApp {site.phone.display}
            <ArrowOut />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
