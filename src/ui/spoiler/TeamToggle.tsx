'use client'

import { useLocalStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import Loading from '@/ui/Loading'
import TeamColor from '@/ui/team/TeamColor'
import TeamLogo from '@/ui/team/TeamLogo'
import { VscEyeClosed } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function TeamToggle({ id }: { id: number }) {
	const { noSpoilers } = useLocalStorage()

	const { data, isLoading } = fetchMLBLive<{ teams: MLB.Team[] }>(
		`/api/v1/teams/${id}`,
	)

	if (isLoading) return <div className="h-[calc(1lh+1ch)]" />

	const team = data?.teams?.[0]
	const hide = noSpoilers.includes(id)

	return (
		<TeamColor
			team={team}
			className="bg-subdued/50 relative overflow-hidden p-[.5ch]"
			as="label"
			htmlFor={`no-spoiler-${id}`}
			key={id}
		>
			<TeamLogo
				team={team}
				className="absolute top-1/2 left-1/4 size-[3lh] -translate-1/2 object-contain opacity-10"
				size={256}
			/>

			<span className="relative">{team?.abbreviation}</span>

			<div
				className={cn(
					'absolute inset-0 grid place-content-center border-b-2 border-black/10 bg-black/70 backdrop-blur-[1.5px] transition-transform',
					!hide && '-translate-y-full',
				)}
			>
				<VscEyeClosed className="text-white" />
			</div>
		</TeamColor>
	)
}
