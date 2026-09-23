/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactElement } from 'react'

export const socialImageSize = { width: 1200, height: 630 } as const

type SocialImageProps = {
  origin: string
}

const stack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

export function SocialImage({ origin }: SocialImageProps) {
  const artUrl = `${origin}/og/nextx-social-v3-art.png`
  const logoUrl = `${origin}/logo-agency-white.png`

  return (
    <div
      style={{
        ...stack,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#0e0d0c',
        color: '#f2f0eb',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <img
        src={artUrl}
        alt=""
        width={1200}
        height={630}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(14, 13, 12, 0.12)' }} />

      <div style={{ ...stack, position: 'absolute', left: 72, top: 52 }}>
        <img src={logoUrl} alt="NextX Agency" width={248} height={107} style={{ objectFit: 'contain', objectPosition: 'left center' }} />
      </div>

      <div style={{ ...stack, position: 'absolute', left: 72, bottom: 66 }}>
        <div style={{ ...stack, gap: 8, marginBottom: 22 }}>
          <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '0.18em', color: '#ed5f0f' }}>DIGITAL STUDIO</span>
          <span style={{ width: 88, height: 3, background: '#ed5f0f' }} />
        </div>
        <div style={{ ...stack, fontSize: 92, fontWeight: 800, letterSpacing: '-0.065em', lineHeight: 0.87 }}>
          <span>DESIGN</span>
          <span>BUILD</span>
        </div>
      </div>

      <div style={{ ...stack, position: 'absolute', right: 72, bottom: 72, gap: 10, alignItems: 'flex-end' }}>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.15em', color: '#f2f0eb' }}>PARAMARIBO, SR</span>
        <span style={{ fontSize: 17, letterSpacing: '0.15em', color: 'rgba(242, 240, 235, 0.65)' }}>NEXTXAGENCY.COM</span>
      </div>

      <div style={{ position: 'absolute', right: 72, top: 72, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: '#ed5f0f' }} />
        <span style={{ fontSize: 15, letterSpacing: '0.16em', color: 'rgba(242, 240, 235, 0.65)' }}>SR / 05°52′N</span>
      </div>
    </div>
  )
}

export function renderSocialImage(origin: string): ReactElement {
  return <SocialImage origin={origin} />
}
