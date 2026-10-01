/* eslint-disable @next/next/no-img-element */
import type { ReactElement } from 'react'

export const socialImageSize = { width: 1200, height: 630 } as const

export function SocialImage({ origin }: { origin: string }) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#f2f0eb',
        color: '#0e0d0c',
        padding: 48,
        fontFamily: 'Arial, sans-serif',
        gap: 48,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0e0d0c',
          width: 536,
          padding: 34,
        }}
      >
        <span
          style={{ color: '#ed5f0f', fontSize: 16, letterSpacing: '0.08em' }}
        >
          ONTWERP × TECHNOLOGIE
        </span>
        <img
          src={`${origin}/logo-agency-white.svg`}
          alt="NextX Agency"
          width={468}
          height={202}
        />
        <span
          style={{ color: '#aaa49b', fontSize: 14, letterSpacing: '0.07em' }}
        >
          CREATIEVE & DIGITALE STUDIO
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 472,
          paddingTop: 12,
        }}
      >
        <span style={{ fontSize: 16, letterSpacing: '0.06em' }}>
          PARAMARIBO, SURINAME
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: '-0.065em',
            lineHeight: 0.98,
          }}
        >
          <span>Ideeën</span>
          <span>krijgen</span>
          <span style={{ color: '#b54607' }}>vorm.</span>
        </div>
        <span
          style={{
            fontSize: 22,
            borderTop: '1px solid #0e0d0c',
            paddingTop: 18,
          }}
        >
          nextxagency.com
        </span>
      </div>
    </div>
  )
}

export function renderSocialImage(origin: string): ReactElement {
  return <SocialImage origin={origin} />
}
