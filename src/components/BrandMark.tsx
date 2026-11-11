import clsx from 'clsx'
import { brandLogo } from '@/lib/brands'

/* Official logo if public/brands/<slug>.svg exists, otherwise the name in type. */
export function BrandMark({ name, className, textClassName }: { name: string; className?: string; textClassName?: string }) {
  const logo = brandLogo(name)
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo} alt={name} className={clsx('h-6 w-auto object-contain', className)} />
  }
  return <span className={clsx('display', textClassName)}>{name}</span>
}
