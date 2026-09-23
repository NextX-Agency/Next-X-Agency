import Image from 'next/image'
import dynamic from 'next/dynamic'

const SignalField = dynamic(() => import('./SignalField').then((m) => m.SignalField))

/** The one section that sells nothing: the logo's traces, drawn out to the page edges. */
export function Signal() {
  return (
    <section data-theme="dark" className="relative isolate h-[34rem] overflow-hidden md:h-[42rem]" aria-label="NextX-signaal">
      <SignalField anchorId="signal-mark" />
      <div className="pointer-events-none relative flex h-full items-center justify-center">
        <Image
          id="signal-mark"
          src="/logo-agency-white.png"
          alt=""
          width={1200}
          height={519}
          className="h-auto w-[min(62vw,26rem)]"
        />
      </div>
    </section>
  )
}
