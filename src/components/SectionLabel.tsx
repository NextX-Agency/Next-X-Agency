import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  center?: boolean
}

export function SectionLabel({ children, className, center = false }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-4 mb-6', center && 'justify-center', className)}>
      <div className="h-px w-8 bg-primary/60" />
      <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-500">
        {children}
      </span>
    </div>
  )
}
