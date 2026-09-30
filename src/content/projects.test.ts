import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { projects, publishedProjects, type Project } from './projects'

describe('portfolio publication and media', () => {
  it('keeps drafts out of published work', () => {
    const draft = {
      ...projects[0],
      slug: 'private-draft',
      status: 'draft' as const,
    }
    expect(
      publishedProjects([...projects, draft]).map((p) => p.slug),
    ).not.toContain('private-draft')
  })
  it('supports creative projects without web-only fields', () => {
    const creative: Project = {
      slug: 'test-fixture',
      index: '00',
      name: 'Test fixture',
      type: 'Fotografie',
      discipline: 'photography-media',
      presentation: 'photography',
      summary: 'Test only',
      intro: 'Test only',
      contribution: 'Test only',
      cover: projects[0].cover,
      status: 'draft',
      origin: 'client',
    }
    expect(creative.mobile).toBeUndefined()
    expect(creative.url).toBeUndefined()
    expect(creative.stack).toBeUndefined()
    expect(publishedProjects([creative])).toEqual([])
  })
  it('only publishes the genuine projects and existing media', () => {
    expect(projects.map((p) => p.slug)).toEqual(['shop-nextx', 'indef-design'])
    for (const project of projects) {
      for (const image of [
        project.cover,
        ...(project.gallery ?? []),
        ...(project.mobile ? [project.mobile] : []),
      ]) {
        expect(existsSync('public' + image.src), image.src).toBe(true)
        expect(image.alt.length).toBeGreaterThan(0)
        expect(image.width).toBeGreaterThan(0)
        expect(image.height).toBeGreaterThan(0)
      }
    }
  })
})
