import { formatRSD } from '@/lib/data'
import clsx from 'clsx'

/* Same props as the template's <Price> (amount | lowestAmount+highestAmount). */
type Props = {
  className?: string
  as?: 'span' | 'p'
} & ({ amount: number; lowestAmount?: never; highestAmount?: never } | { amount?: never; lowestAmount: number; highestAmount: number })

export function Price({ amount, lowestAmount, highestAmount, className, as = 'p' }: Props) {
  const El = as
  if (typeof amount === 'number') return <El className={clsx('tabular-nums', className)}>{formatRSD(amount)}</El>
  if (lowestAmount === highestAmount) return <El className={clsx('tabular-nums', className)}>{formatRSD(lowestAmount!)}</El>
  return <El className={clsx('tabular-nums', className)}>od {formatRSD(lowestAmount!)}</El>
}
