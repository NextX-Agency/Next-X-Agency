/* eslint-disable @next/next/no-img-element */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ReactElement } from 'react'

export const socialImageSize = { width: 1200, height: 630 } as const

/** Archivo ExtraBold, so the shared image carries the same headline face as the site. */
export async function socialFonts() {
  try {
    const data = await readFile(join(process.cwd(), 'src/assets/Archivo-ExtraBold.ttf'))
    return [{ name: 'Archivo', data, weight: 800 as const, style: 'normal' as const }]
  } catch {
    return []
  }
}

/** Mirrors the homepage: ink ground, the three-word headline, and real work beside it. */
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
        fontFamily: 'Archivo, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          right: -150,
          top: 150,
          width: 640,
          borderRadius: 10,
          overflow: 'hidden',
          transform: 'rotate(-5deg)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', height: 28, background: '#e9e6df' }} />
        <img src={`${origin}/work/bhaggoes-home.jpg`} alt="" width={640} height={400} />
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: 330,
          top: 300,
          width: 150,
          height: 325,
          borderRadius: 22,
          border: '6px solid #0e0d0c',
          overflow: 'hidden',
          transform: 'rotate(4deg)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
        }}
      >
        <img src={`${origin}/work/shop-nextx-mobile.jpg`} alt="" width={150} height={325} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <img src={`${origin}/logo-agency-white-v2.svg`} alt="NextX Agency" width={155} height={65} />
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 800, letterSpacing: '-0.055em', lineHeight: 0.9 }}>
          <span>Design,</span>
          <span>websites</span>
          <span style={{ display: 'flex' }}>
            en software<span style={{ color: '#ed5f0f' }}>.</span>
          </span>
        </div>
        <span style={{ color: '#b3ada5', fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>NextX Agency · Paramaribo, Suriname</span>
      </div>
    </div>
  )
}

export function renderSocialImage(origin: string): ReactElement {
  return <SocialImage origin={origin} />
}
