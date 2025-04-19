'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import TeamToggle from './TeamToggle'
import { cn } from '@/lib/utils'
import getGameStatus from '@/lib/game-status'

export default function SpoilerProtection() {
	const { sportId, date } = useStorage()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=${sportId}&startDate=${date}&endDate=${date}`,
	)

	if (isLoading || !data) return null

	const { games } = data.dates?.[0] ?? {}

	return (
		<fieldset className="space-y-ch">
			<legend className="mx-auto">Spoiler Protection</legend>

			<div className="gap-ch grid grid-cols-[repeat(auto-fill,minmax(14ch,1fr))]">
				{games?.map((game) => <Matchup game={game} key={game.gamePk} />)}
			</div>
		</fieldset>
	)
}

function Matchup({ game }: { game: MLB.ScheduleGame }) {
	const { isLive } = getGameStatus(game.status)

	return (
		<div className="relative grid grid-cols-2" key={game.gamePk}>
			<TeamToggle id={game.teams.away.team.id} />
			<TeamToggle id={game.teams.home.team.id} />

			<small
				className={cn(
					'absolute top-1/2 left-1/2 -translate-1/2 px-[.5ch] text-[x-small]! leading-tight font-bold uppercase',
					isLive ? 'text-fg bg-green-600' : 'bg-fg text-bg',
				)}
			>
				{isLive ? <span className="animate-pulse">Live</span> : 'vs'}
			</small>
		</div>
	)
}
