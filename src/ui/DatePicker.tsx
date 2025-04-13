'use client'

import { useStorage } from '@/lib/store'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export default function DatePicker() {
	const { date, setDate, today } = useStorage()

	function addDay(days: number) {
		const newDate = new Date(date + `T00:00:00`)
		const localTimeInSeconds =
			new Date().getHours() * 3600 +
			new Date().getMinutes() * 60 +
			new Date().getSeconds()
		const delta = days * 24 * 60 * 60 * 1000

		return new Date(newDate.getTime() + delta).toLocaleDateString('en-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
	}

	const days = [-1, 0, 1, 2, 3].map(addDay)

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!ref.current) return
		ref.current.querySelector('[data-selected]')?.scrollIntoView()
	}, [date])

	return (
		<nav
			ref={ref}
			className="overflow-fade gap-ch grid snap-x snap-mandatory auto-cols-[minmax(10em,1fr)] [grid-auto-flow:column] items-end overflow-x-auto"
		>
			{days.map((day) => (
				<button
					className={cn('snap-center', day !== today && 'pt-[1lh]')}
					onClick={() => setDate(day)}
					data-selected={day === date || undefined}
					key={day}
				>
					{day === today && <span>Today</span>}
					<time
						className={cn('grid border', day !== date && 'border-current/50')}
						dateTime={day}
					>
						<span>{format(day, { weekday: 'long' })}</span>
						<span>{format(day, { month: 'short', day: 'numeric' })}</span>
					</time>
				</button>
			))}
		</nav>
	)
}

function format(date: string, options: Intl.DateTimeFormatOptions) {
	return new Date(date).toLocaleDateString('en-US', options)
}
