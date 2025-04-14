'use client'

import { useStorage } from '@/lib/store'
import DateButton from './DateButton'
import { cn } from '@/lib/utils'

export default function DatePicker() {
	const { date, setDate, today } = useStorage()

	function addDay(days: number) {
		// const hours = new Date(date).getHours().toString().padStart(2, '0')
		const newDate = new Date(date + `T00:00:00`)
		const delta = days * 24 * 60 * 60 * 1000

		return new Date(newDate.getTime() + delta).toISOString().slice(0, 10)
	}

	const days = [-1, 0, 1, 2, 3].map(addDay)

	return (
		<nav className="relative grid">
			{!days.includes(today) && (
				<button
					className={cn('absolute top-0 z-1', {
						'left-0 before:content-["⇠_"]':
							new Date(today) < new Date(days.at(0)!),
						'right-0 after:content-["_⇢"]':
							new Date(today) > new Date(days.at(-1)!),
					})}
					onClick={() => setDate(today)}
				>
					Today
				</button>
			)}

			<div className="gap-ch overflow-fade grid snap-x snap-mandatory auto-cols-[minmax(10em,1fr)] [grid-auto-flow:column] items-end overflow-x-auto">
				{days.map((day) => (
					<DateButton day={day} key={day} />
				))}
			</div>

			<label className="ml-auto grid *:col-span-full *:row-span-full *:ml-auto">
				<input
					className="opacity-0"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<span>
					{new Date(date).toLocaleDateString('en-US', {
						month: 'long',
						year: 'numeric',
					})}
				</span>
			</label>
		</nav>
	)
}
