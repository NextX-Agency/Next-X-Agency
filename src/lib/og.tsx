/* eslint-disable @next/next/no-img-element */
import type { ReactElement } from 'react'

export const socialImageSize = { width: 1200, height: 630 } as const

/** Mirrors the homepage hero: ink ground, three-line headline, orange full stop and glow. */
export function SocialImage({ origin }: { origin: string }) {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0e0d0c',
        color: '#eeebe5',
        padding: 64,
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -260,
          bottom: -420,
          width: 900,
          height: 900,
          borderRadius: 9999,
          border: '2px solid rgba(237, 95, 15, 0.55)',
          background: 'radial-gradient(closest-side, rgba(237,95,15,0.22), rgba(237,95,15,0.05) 60%, rgba(14,13,12,0) 100%)',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={`${origin}/logo-agency-white-v2.svg`} alt="NextX Agency" width={155} height={65} />
          <span style={{ color: '#8f8980', fontSize: 16, letterSpacing: '0.08em' }}>PARAMARIBO, SURINAME</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: '-0.05em',
            lineHeight: 0.92,
          }}
        >
          <span>Websites,</span>
          <span>beeld</span>
          <span style={{ display: 'flex' }}>
            en merken<span style={{ color: '#ed5f0f' }}>.</span>
          </span>
        </div>
        <span style={{ color: '#b3ada5', fontSize: 22 }}>Creatieve & digitale studio · nextxagency.com</span>
      </div>
    </div>
  )
}

export function renderSocialImage(origin: string): ReactElement {
  return <SocialImage origin={origin} />
}
