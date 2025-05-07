'use client'

import { useStorage, GROUPS } from '@/lib/store'

export default function GroupSwitcher() {
	const { group, setGroup } = useStorage()

	return (
		<select
			className="uppercase"
			value={group}
			onChange={(e) => setGroup(e.target.value as (typeof GROUPS)[number])}
		>
			{GROUPS.map((group) => (
				<option value={group} key={group}>
					{group.charAt(0).toUpperCase() + group.slice(1)}
				</option>
			))}
		</select>
	)
}
