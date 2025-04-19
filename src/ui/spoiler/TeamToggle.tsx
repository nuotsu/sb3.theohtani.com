'use client'

import { useLocalStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import TeamColor from '@/ui/team/TeamColor'
import { cn } from '@/lib/utils'

export default function TeamToggle({ id }: { id: number }) {
	const { noSpoilers } = useLocalStorage()

	const { data, isLoading } = fetchMLBLive<{ teams: MLB.Team[] }>(
		`/api/v1/teams/${id}`,
	)

	if (isLoading) return null

	const team = data?.teams?.[0]

	return (
		<TeamColor
			team={team}
			className={cn(noSpoilers.includes(id) && 'opacity-50')}
			as="label"
			htmlFor={`no-spoiler-${id}`}
			key={id}
		>
			{team?.abbreviation}
		</TeamColor>
	)
}
