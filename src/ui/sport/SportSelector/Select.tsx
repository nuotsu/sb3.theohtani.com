'use client'

import { useStorage } from '@/lib/store'

export default function Select(props: React.ComponentProps<'select'>) {
	const { sportId, setSportId } = useStorage()

	return (
		<select
			{...props}
			value={sportId}
			onChange={(e) => setSportId(Number(e.target.value))}
		/>
	)
}
