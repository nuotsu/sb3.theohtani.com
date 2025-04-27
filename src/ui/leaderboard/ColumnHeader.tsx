'use client'

import { useStorage } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function ColumnHeader({
	stat,
	children,
}: { stat?: string } & React.ComponentProps<'th'>) {
	const { sortStat, setSortStat } = useStorage()

	return (
		<th>
			{stat ? (
				<button
					className={cn(
						'hover:text-fg transition-colors',
						stat === sortStat && 'text-fg',
					)}
					onClick={() => setSortStat(stat)}
				>
					{children}
				</button>
			) : (
				children
			)}
		</th>
	)
}
