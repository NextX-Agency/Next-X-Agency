'use client'

import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import 'yet-another-react-lightbox/styles.css'
import { useReducedMotion } from 'framer-motion'
import type { ProjectImage } from '@/content/projects'

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  ssr: false,
})

export function ProjectGallery({
  images,
  layout = 'editorial',
}: {
  images: ProjectImage[]
  layout?: 'editorial' | 'album'
}) {
  const [index, setIndex] = useState(-1)
  const reduced = useReducedMotion()
  if (!images.length) return null
  return (
    <div className="project-gallery">
      {layout === 'album' ? (
        <RowsPhotoAlbum
          photos={images}
          targetRowHeight={350}
          defaultContainerWidth={1200}
          onClick={({ index }) => setIndex(index)}
          render={{
            image: (props, { photo, width, height }) => (
              <Image
                src={photo.src}
                alt={photo.alt ?? ''}
                width={width}
                height={height}
                sizes="(min-width: 768px) 50vw, 100vw"
                style={props.style}
              />
            ),
          }}
        />
      ) : (
        <div className="editorial-gallery">
          {images.map((image, i) => (
            <figure
              key={image.src}
              className={
                image.width < image.height ? 'gallery-portrait' : undefined
              }
            >
              <button
                type="button"
                className="gallery-open group"
                aria-label={`Vergroot afbeelding ${i + 1}: ${image.alt}`}
                onClick={() => setIndex(i)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 768px) 70vw, 100vw"
                />
                <span className="gallery-enlarge" aria-hidden="true">
                  ↗
                </span>
              </button>
              {(image.caption || image.credit) && (
                <figcaption className="t-small mt-3">
                  {image.caption}
                  {image.credit && ` · ${image.credit}`}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
      {index >= 0 && (
        <Lightbox
          open
          index={index}
          close={() => setIndex(-1)}
          slides={images}
          controller={{ aria: true }}
          animation={reduced ? { fade: 0, swipe: 0, navigation: 0 } : undefined}
          labels={{
            Close: 'Sluiten',
            Next: 'Volgende afbeelding',
            Previous: 'Vorige afbeelding',
          }}
        />
      )}
    </div>
  )
}
