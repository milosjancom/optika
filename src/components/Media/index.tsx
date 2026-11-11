import type { Media as MediaType } from '@/lib/types'
import clsx from 'clsx'

/* Stand-in for the template's <Media resource={...} />. Uses a plain <img>
   so the static preview works without the image optimizer. */
export function Media({
  resource,
  className,
  imgClassName,
  priority,
}: {
  resource: MediaType
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  return (
    <div className={clsx('overflow-hidden bg-tile', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resource.url}
        alt={resource.alt}
        width={resource.width}
        height={resource.height}
        loading={priority ? 'eager' : 'lazy'}
        className={clsx('h-full w-full object-cover', imgClassName)}
      />
    </div>
  )
}
