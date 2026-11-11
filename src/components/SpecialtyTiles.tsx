import Image from 'next/image'
import Link from 'next/link'
import { specialties } from '@/content/disciplines'
import { Arrow } from '@/components/Arrow'
import { BrowserFrame } from '@/components/work/DeviceFrames'

type Tone = { bg: string; fg: string }
const tones: Record<string, Tone> = {
  'branding-design': { bg: '#ed5f0f', fg: '#0e0d0c' },
  web: { bg: '#0e0d0c', fg: '#f2f0eb' },
  software: { bg: '#dcd7cc', fg: '#0e0d0c' },
}

/** Each tile is illustrated with something that exists: our identity and two live projects. */
function Visual({ id }: { id: string }) {
  if (id === 'branding-design')
    return (
      <>
        <span className="nx-tile-brand-a"><Image src="/logo-agency-white-v2.svg" alt="" width={620} height={260} className="h-auto w-full" /></span>
        <span className="nx-tile-brand-b"><Image src="/logo-agency-black-v2.svg" alt="" width={620} height={260} className="h-auto w-full" /></span>
      </>
    )
  if (id === 'web')
    return (
      <BrowserFrame label="bhaggoescarpalace.com" className="nx-tile-browser">
        <Image src="/work/bhaggoes-home.jpg" alt="" fill sizes="(min-width: 48rem) 42vw, 120vw" className="object-cover object-left-top" />
      </BrowserFrame>
    )
  return (
    <>
      <span className="nx-tile-shot nx-tile-shot-a"><Image src="/work/bhaggoes-stock.jpg" alt="" fill sizes="(min-width: 48rem) 22vw, 60vw" className="object-cover object-left-top" /></span>
      <span className="nx-tile-shot nx-tile-shot-b"><Image src="/work/shop-nextx-order.jpg" alt="" fill sizes="(min-width: 48rem) 15vw, 44vw" className="object-cover object-top" /></span>
    </>
  )
}

/** The three specialties as large visual tiles. `base` turns them into in-page anchors on /services. */
export function SpecialtyTiles({ base = '/services' }: { base?: string }) {
  return (
    <div className="nx-tiles">
      {specialties.map((specialty) => {
        const tone = tones[specialty.id]
        return (
          <Link
            key={specialty.id}
            href={`${base}#${specialty.id}`}
            className="nx-tile"
            style={{ '--tile-bg': tone.bg, '--tile-fg': tone.fg } as React.CSSProperties}
            aria-label={`${specialty.name}: ${specialty.line}`}
          >
            <span className="nx-tile-visual" aria-hidden="true"><Visual id={specialty.id} /></span>
            <span className="nx-tile-copy">
              <span>
                <span className="nx-tile-word">{specialty.word}</span>
                <span className="nx-tile-line">{specialty.line}</span>
              </span>
              <span className="nx-tile-go"><Arrow /></span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
