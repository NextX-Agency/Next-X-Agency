import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${site.name} — digitale studio in ${site.location.city}`

const INK = '#0e0d0c'
const PAPER = '#f2f0eb'
const ORANGE = '#ed5f0f'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: INK,
          color: PAPER,
          fontFamily: 'sans-serif',
          padding: '80px 96px',
          position: 'relative',
        }}
      >
        {/* one restrained technical device: a thin arc, echoing the globe */}
        <div
          style={{
            position: 'absolute',
            right: -220,
            top: -220,
            width: 640,
            height: 640,
            borderRadius: '50%',
            border: `1px solid rgba(242,240,235,0.14)`,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -140,
            top: -140,
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: `1px solid ${ORANGE}`,
            opacity: 0.55,
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              border: `3px solid ${ORANGE}`,
              padding: '10px 22px',
            }}
          >
            <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', color: PAPER }}>
              Next
            </span>
            <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', color: ORANGE }}>
              X
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, display: 'flex' }}>
            Websites. Webshops. Identiteit.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              fontFamily: 'monospace',
              letterSpacing: '0.08em',
              color: 'rgba(242,240,235,0.6)',
              textTransform: 'uppercase',
            }}
          >
            {site.location.city}, {site.location.countryCode} · NEXTXAGENCY.COM
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
