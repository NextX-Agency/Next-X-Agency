import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: 'Ontwerpstudio en softwarebouwer in Paramaribo: design, websites en software.',
    lang: 'nl',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e0d0c',
    theme_color: '#0e0d0c',
    icons: [
      { src: '/nextx-icon-v2.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-touch-icon-v2.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
