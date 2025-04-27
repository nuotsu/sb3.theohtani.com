'use client'

import { useStorage } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function ColumnHeader({
	stat,
	children,
}: {
	stat?: keyof (MLB.BattingStats & MLB.PitchingStats)
} & React.ComponentProps<'th'>) {
	const { sortStat, setSortStat } = useStorage()

	return (
		<th className={cn('*:p-[.5ch]', sortStat === stat && 'bg-fg/5')}>
			{stat ? (
				<button
					className="hover:text-fg w-full transition-colors"
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
