'use client'

import { useStorage } from '@/lib/store'

export default function SportSelector({ sports }: { sports: MLB.Sport[] }) {
	const { sportId, setSportId } = useStorage()

	return (
		<select
			className="bg-fg text-bg text-center outline-none"
			value={sportId}
			onChange={(e) => setSportId(Number(e.target.value))}
		>
			{sports.map((sport) => (
				<option value={sport.id} key={sport.id}>
					{sport.abbreviation}
				</option>
			))}
		</select>
	)
}
