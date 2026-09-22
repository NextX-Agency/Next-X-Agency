import { cn } from '@/lib/utils'

/** Right arrow for internal links. Decorative; the link text carries meaning. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn('arrow shrink-0', className)}
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** North-east arrow for links that leave the site. */
export function ArrowOut({ className }: { className?: string }) {
  return (
    <svg
      className={cn('arrow-ne shrink-0', className)}
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 10L10 1M3 1h7v7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
