'use client'

import { useStorage } from '@/lib/store'
import DateButton from './DateButton'
import { cn } from '@/lib/utils'

export default function DatePicker() {
	const { date, setDate, today } = useStorage()

	function addDay(days: number) {
		const newDate = new Date(date + `T00:00:00`)
		const delta = days * 24 * 60 * 60 * 1000

		return new Date(newDate.getTime() + delta).toISOString().slice(0, 10)
	}

	const days = [-3, -2, -1, 0, 1, 2, 3].map(addDay)

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

			<div className="lg:gap-ch grid grid-cols-5 gap-[.5ch] max-md:*:first-of-type:hidden max-md:*:last-of-type:hidden md:grid-cols-7">
				{days.map((day) => (
					<DateButton day={day} key={day} />
				))}
			</div>

			<label className="ml-auto inline-grid *:col-span-full *:row-span-full *:ml-auto">
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
