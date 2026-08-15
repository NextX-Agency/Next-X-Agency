'use client'

import { useState, type ComponentProps } from 'react'
import Image from 'next/image'

type Props = ComponentProps<typeof Image>

/**
 * The demo photography is hosted elsewhere, and remote images rot: an id that
 * resolves today can 404 next year. A broken-image icon makes a finished page
 * look unfinished, so when a load fails we paint a neutral tile in its place
 * and keep the layout intact.
 */
export default function DemoImage({ alt, className = '', ...props }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}
        style={props.fill ? { position: 'absolute', inset: 0 } : undefined}
      >
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M18 18.75h.008v.008H18v-.008zM2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75z"
          />
        </svg>
      </span>
    )
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
