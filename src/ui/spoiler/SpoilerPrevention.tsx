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

	const teamIds = [
		...new Set(
			data.dates?.[0]?.games?.flatMap(({ teams }) =>
				Object.values(teams).map(({ team }: MLB.ScheduleTeam) => team.id),
			),
		),
	]

	return (
		<fieldset>
			<legend>Spoiler Prevention</legend>

			<div className="gap-ch flex flex-wrap">
				{teamIds?.map((id) => <TeamToggle id={id} key={id} />)}
			</div>
		</fieldset>
	)
}
