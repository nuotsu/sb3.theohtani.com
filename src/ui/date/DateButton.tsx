'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import { VscLoading } from 'react-icons/vsc'
import Flip from '@/ui/Flip'
import { cn } from '@/lib/utils'

export default function DateButton({ day }: { day: string }) {
	const { date, setDate, today } = useStorage()

	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${day}&endDate=${day}`,
	)

	const isToday = compareDate(day, today)
	const isSelected = compareDate(day, date)

	const dayOfWeek = format(day, { weekday: 'short' })

	return (
		<button
			className={cn('flex flex-col items-center', !isToday && 'mt-lh')}
			onClick={() => setDate(day)}
			data-selected={isSelected || undefined}
		>
			{isToday && <span>Today</span>}

			<time
				className={cn(
					'gap-ch sm:py-ch grid w-full grow border py-[.5ch] leading-none',
					day !== date && 'border-subdued',
				)}
				dateTime={day}
			>
				<small
					className={cn(
						'uppercase',
						['Sat', 'Sun'].includes(dayOfWeek) && 'text-red-300',
					)}
				>
					{dayOfWeek}
				</small>

				<strong>{format(day, { month: 'short', day: 'numeric' })}</strong>

				{isLoading ? (
					<small>
						<VscLoading className="h-lh mx-auto my-[.5ch] animate-spin" />
					</small>
				) : !data || data.totalGames === 0 ? (
					<>
						<small className="my-[.5ch] line-clamp-1 max-sm:hidden">
							No games
						</small>
						<small className="my-[.5ch] sm:hidden">-</small>
					</>
				) : (
					<small className="*:px-ch bg-subdued mx-auto flex items-center rounded-full *:py-[.5ch]">
						{data.totalGamesInProgress > 0 && (
							<b className="bg-bg ring-subdued -mr-[.5ch] flex items-center gap-x-1 rounded-full pl-[.75ch]! ring ring-inset">
								<span className="animate-pulse text-green-400">•</span>{' '}
								<Flip>{data.totalGamesInProgress}</Flip>
							</b>
						)}
						<span className="inline-block">{data.totalGames}</span>
					</small>
				)}
			</time>
		</button>
	)
}

function compareDate(d1: string, d2: string) {
	return (
		new Date(d1 + 'T00:00:00').getTime() ===
		new Date(d2 + 'T00:00:00').getTime()
	)
}

function format(date: string, options: Intl.DateTimeFormatOptions) {
	return new Date(date + 'T00:00:00').toLocaleDateString('en-US', options)
}
