import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NextX Agency — Webdesign & Branding op maat',
    short_name: 'NextX Agency',
    description:
      'Digitaal bureau in Paramaribo. Websites, webshops en merken op maat voor Surinaamse bedrijven.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfaf7',
    theme_color: '#c45a2b',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
