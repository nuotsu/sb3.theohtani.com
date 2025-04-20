'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import Loading from '@/ui/Loading'
import Division from './Division'
import League from './League'
import { cn } from '@/lib/utils'

export default function Standings() {
	const { date } = useStorage()

	const leagueIds = getLeagueIds()

	const { data, isLoading } = fetchMLBLive<MLB.Standings>(
		`/api/v1/standings?leagueId=${leagueIds.join(',')}&season=${new Date(date).getFullYear()}`,
	)

	if (isLoading)
		return <Loading className="justify-center">Loading standings...</Loading>

	if (!data || data.records.length === 0)
		return (
			<section>
				<h2 className="text-center">No standings</h2>
			</section>
		)

	return (
		<section>
			<h2 className="font-dot text-center">Standings</h2>

			<div
				className={cn('gap-ch grid has-[td[colspan]]:[&_[data-rank]]:hidden', {
					'md:grid-cols-2': data.records.length >= 2,
					'md:grid-cols-3':
						data.records.length > 4 && data.records.length !== 5,
				})}
			>
				{data.records.map((record) =>
					record.division ? (
						<Division record={record} key={record.division.id} />
					) : (
						<League record={record} key={record.league.id} />
					),
				)}
			</div>
		</section>
	)
}

function getLeagueIds() {
	const { sportId } = useStorage()
	const { data, isLoading } = fetchMLBLive<{ teams: MLB.Team[] }>(
		`/api/v1/teams?sportId=${sportId}`,
	)

	if (isLoading) return []

	return [...new Set(data?.teams?.map((team) => team.league.id).filter(Number))]
}
