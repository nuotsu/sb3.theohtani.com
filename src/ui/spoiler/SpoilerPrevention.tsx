'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import TeamToggle from './TeamToggle'

export default function SpoilerPrevention() {
	const { sportId, date } = useStorage()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=${sportId}&startDate=${date}&endDate=${date}`,
	)

	if (isLoading || !data) return null

	const { games } = data.dates?.[0]

	return (
		<fieldset>
			<legend>Spoiler Prevention</legend>

			<div className="gap-ch flex flex-wrap">
				{games?.map((game) => (
					<div className="grid grid-cols-2" key={game.gamePk}>
						<TeamToggle id={game.teams.away.team.id} />
						<TeamToggle id={game.teams.home.team.id} />
					</div>
				))}
			</div>
		</fieldset>
	)
}
