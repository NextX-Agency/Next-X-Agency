import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Media remains visible before hydration and without JavaScript. */
export function CoverReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('frame', className)}>{children}</div>
}
