'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import Division from './Division'
import TeamRecords from './TeamRecords'
import { cn } from '@/lib/utils'

export default function Standings() {
	const { date } = useStorage()

	const { data, isLoading } = fetchMLBLive<MLB.Standings>(
		`/api/v1/standings?leagueId=103,104&season=${new Date(date).getFullYear()}`,
		{ refreshInterval: 1000 * 60 },
	)

	if (isLoading)
		return (
			<section>
				<h2>Loading standings...</h2>
			</section>
		)

	if (!data || data.records.length === 0)
		return (
			<section>
				<h2>No standings</h2>
			</section>
		)

	return (
		<section>
			<h2>Standings</h2>

			<div
				className={cn('gap-ch grid', {
					'md:grid-cols-2': data.records.length >= 2,
					'md:grid-cols-3': data.records.length > 4,
				})}
			>
				{data.records.map((record, i) =>
					record.division ? (
						<Division record={record} key={record.division.id} />
					) : (
						<div className="border" key={i}>
							<TeamRecords teamRecords={record.teamRecords} />
						</div>
					),
				)}
			</div>
		</section>
	)
}
