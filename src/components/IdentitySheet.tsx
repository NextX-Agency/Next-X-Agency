import Image from 'next/image'
import { cn } from '@/lib/utils'

/** The NextX identity set out like a sheet from a brand manual: mark, colours, typeface. */
export function IdentitySheet({ className }: { className?: string }) {
  return (
    <div className={cn('nx-identity', className)}>
      <div className="nx-identity-mark">
        <Image src="/logo-agency-white-v2.svg" alt="Het NextX Agency-logo" width={620} height={260} />
      </div>
      <div className="nx-identity-row" aria-hidden="true">
        <span style={{ '--chip': '#ed5f0f' } as React.CSSProperties}>Oranje</span>
        <span style={{ '--chip': '#f2f0eb' } as React.CSSProperties}>Papier</span>
        <span style={{ '--chip': '#0e0d0c' } as React.CSSProperties}>Inkt</span>
        <b>Aa</b>
      </div>
    </div>
  )
}
