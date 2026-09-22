import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: 'Digitale studio in Paramaribo voor websites, webshops en merken.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e0d0c',
    theme_color: '#0e0d0c',
    icons: [{ src: '/favicon.png', sizes: '471x416', type: 'image/png' }],
  }
}
