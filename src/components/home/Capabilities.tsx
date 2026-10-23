import Link from 'next/link'
import Image from 'next/image'
import { disciplines } from '@/content/disciplines'
import { formatPrice, websiteFrom } from '@/content/services'
import { Arrow } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'

/** A type-led index with glimpses of the work behind each discipline. */
const price = (id: string) => (id === 'web-software' ? formatPrice(websiteFrom) : 'Op aanvraag')
const disciplineImages: Record<string, string> = {
  'web-software': '/work/shop-nextx-entry.jpg',
  'photography-media': '/demo-assets/savana-packaging.webp',
  'branding-design': '/demo-assets/savana-menu.jpg',
  marketing: '/demo-assets/portfolio-savana.jpg',
}

export function Capabilities() {
  return (
    <section className="section" aria-labelledby="capabilities-title">
      <div className="wrap grid-12 gap-y-10">
        <Reveal className="col-span-4 md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-28">
            <h2 id="capabilities-title" className="t-h2">
              Wat we maken
            </h2>
            <p className="t-body mt-5 max-w-[30ch]">
              Vier disciplines, één aanspreekpunt. Per project brengen we de juiste expertise bij elkaar.
            </p>
            <Link href="/services" className="link-arrow link-line mt-6 py-1">
              Diensten en prijzen
              <Arrow />
            </Link>
          </div>
        </Reveal>

        <ol className="col-span-4 border-t border-line-strong md:col-span-8 md:col-start-5 lg:col-span-9 lg:col-start-4">
          {disciplines.map((discipline) => (
            <li key={discipline.id} className="border-b border-line">
              <Link
                href={`/services#${discipline.id}`}
                className="group grid grid-cols-[0.5rem_1fr_auto] items-center gap-x-4 py-5 sm:grid-cols-[0.5rem_1fr_6rem_auto] md:grid-cols-[0.5rem_1fr_8rem_auto] md:gap-x-6 md:py-6"
              >
                <span className="h-8 w-[2px] bg-accent transition-transform duration-500 ease-[var(--ease)] group-hover:scale-y-150" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[1.65rem] font-[700] leading-none tracking-[-0.035em] [font-variation-settings:'wdth'_110] transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-2 md:text-[3.25rem]">
                    {discipline.name}
                  </span>
                  <span className="t-small mt-2 block max-w-[52ch] md:mt-0 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:ease-[var(--ease)] md:group-hover:mt-3 md:group-hover:max-h-12 md:group-hover:opacity-100 md:group-focus-visible:mt-3 md:group-focus-visible:max-h-12 md:group-focus-visible:opacity-100">
                    {discipline.services.join(' · ')}
                  </span>
                  <span className="meta mt-2 block sm:hidden">{price(discipline.id)}</span>
                </span>
                <span className="relative hidden aspect-[4/3] overflow-hidden bg-bg-2 sm:block" aria-hidden="true">
                  <Image
                    src={disciplineImages[discipline.id]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 128px, 96px"
                    className="object-cover grayscale-[0.25] transition-[filter,transform] duration-700 ease-[var(--ease)] group-hover:scale-105 group-hover:grayscale-0"
                  />
                </span>
                <span className="meta flex items-center gap-3 whitespace-nowrap">
                  <span className="hidden sm:inline">{price(discipline.id)}</span>
                  <Arrow className="text-fg opacity-40 transition-opacity group-hover:opacity-100" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
