import Image from 'next/image'
import { cn } from '@/lib/utils'

/** The NextX identity as a specimen: the mark with its three colours. */
export function IdentitySheet({ className }: { className?: string }) {
  return (
    <div className={cn('nx-identity', className)}>
      <Image src="/logo-agency-white-v2.svg" alt="Het NextX Agency-logo" width={620} height={260} />
      <div className="nx-identity-chips" aria-hidden="true">
        <span style={{ background: '#ed5f0f' }} />
        <span style={{ background: '#f2f0eb' }} />
        <span style={{ background: '#0e0d0c' }} />
      </div>
    </div>
  )
}
