'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import { cn, count } from '@/lib/utils'

export default function DateButton({ day }: { day: string }) {
	const { date, setDate, today } = useStorage()

	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${day}&endDate=${day}`,
	)

	const isToday = compareDate(day, today)
	const isSelected = compareDate(day, date)

	return (
		<button
			className={cn('snap-center', !isToday && 'mt-[1lh]')}
			onClick={() => setDate(day)}
			data-selected={isSelected || undefined}
		>
			{isToday && <span>Today</span>}
			<time
				className={cn('grid border', day !== date && 'border-current/50')}
				dateTime={day}
			>
				<span>{format(day, { weekday: 'long' })}</span>
				<strong>{format(day, { month: 'short', day: 'numeric' })}</strong>

				<span className={cn(!data?.totalGames && 'capitalize')}>
					{isLoading ? (
						'Loading...'
					) : !data ? (
						'No games'
					) : (
						<>
							{data.totalGamesInProgress > 0 && (
								<span>
									<b>{data.totalGamesInProgress}</b> of{' '}
								</span>
							)}
							{count(data.totalGames, 'game')}
						</>
					)}
				</span>
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
