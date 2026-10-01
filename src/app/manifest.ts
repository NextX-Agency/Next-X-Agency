import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description:
      'Creatieve en digitale studio in Paramaribo voor web, software, fotografie, design en marketing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e0d0c',
    theme_color: '#0e0d0c',
    icons: [{ src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  }
}
