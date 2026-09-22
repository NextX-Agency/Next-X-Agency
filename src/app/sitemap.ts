import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { projects } from '@/content/projects'
import { examples } from '@/content/examples'

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  })

  return [
    page('', 1, 'weekly'),
    page('/services', 0.9, 'weekly'),
    page('/portfolio', 0.8),
    ...projects.map((project) => page(`/portfolio/${project.slug}`, 0.7)),
    page('/about', 0.7),
    page('/contact', 0.8),
    page('/examples', 0.6),
    ...examples.map((example) => page(`/examples/${example.slug}`, 0.4)),
  ]
}
