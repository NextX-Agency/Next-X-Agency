import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Device frames drawn in CSS. Screenshots stay plain image files, so a
 * project's media can be replaced without redrawing a mockup.
 */
export function BrowserFrame({ label, className, children }: { label?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('nx-browser', className)}>
      <div className="nx-browser-bar" aria-hidden="true">
        <i /><i /><i />
        {label && <b>{label}</b>}
      </div>
      <div className="nx-browser-screen">{children}</div>
    </div>
  )
}

export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('nx-phone', className)}>{children}</div>
}
