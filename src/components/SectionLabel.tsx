import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  center?: boolean
  /** Editorial section number shown at the right end of the rule, e.g. "02" */
  number?: string
}

export function SectionLabel({ children, className, center = false, number }: SectionLabelProps) {
  if (center) {
    return (
      <div className={cn('flex flex-col items-center gap-3 mb-6', className)}>
        <div className="h-0.5 w-10 bg-foreground" />
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-foreground">
          {children}
        </span>
      </div>
    )
  }
  return (
    <div className={cn('flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-8', className)}>
      <span className="text-xs font-bold tracking-[0.18em] uppercase text-foreground">
        {children}
      </span>
      {number && (
        <span className="text-xs font-medium text-muted-foreground tabular-nums">{number}</span>
      )}
    </div>
  )
}
