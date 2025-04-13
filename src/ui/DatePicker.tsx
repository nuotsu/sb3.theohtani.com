'use client'

import { useStorage } from '@/lib/store'

function format(date: string, options: Intl.DateTimeFormatOptions) {
	const now = new Date()
	const localTime = [
		now.getHours().toString().padStart(2, '0'),
		now.getMinutes().toString().padStart(2, '0'),
		now.getSeconds().toString().padStart(2, '0'),
	].join(':')

	return new Date(date + 'T' + localTime).toLocaleDateString('en-US', options)
}

export default function DatePicker() {
	const { date, setDate, today } = useStorage()

	function addDay(days: number = 1) {
		const current = new Date(date)
		const localTime =
			(current.getHours() +
				current.getMinutes() / 60 +
				current.getSeconds() / 3600) /
			24
		current.setDate(current.getDate() + localTime + days)
		setDate(current.toISOString().split('T')[0])
	}

	const dayOfWeek = format(date, { weekday: 'long' })

	return (
		<div className="gap-ch flex items-center justify-between text-center">
			<button className="click px-2" onClick={() => addDay(-1)}>
				&lt;
			</button>
			<button className="click order-last px-2" onClick={() => addDay(1)}>
				&gt;
			</button>

			<div className="gap-ch flex items-center justify-center">
				<label className="contents">
					<span className="anim-fade [--y:-0.5em]" key={date}>
						{dayOfWeek}
					</span>

					<input
						className="anim-fade appearance-none text-center font-bold"
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</label>

				{date !== today && (
					<button
						className="click anim-fade-to-r"
						onClick={() => setDate(today)}
					>
						Today
					</button>
				)}
			</div>
		</div>
	)
}
