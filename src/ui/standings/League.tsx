'use client'

import { fetchMLBLive } from '@/lib/fetch'
import TeamRecords from './TeamRecords'

export default function League({ record }: { record: MLB.StandingsRecord }) {
	const { data, isLoading } = fetchMLBLive<MLB.Leagues>(record.league.link)

	if (isLoading) return <article>Loading...</article>

	const [league] = data?.leagues ?? []

	return (
		<article className="@container border">
			<h2>{league.name}</h2>
			<TeamRecords teamRecords={record.teamRecords} />
		</article>
	)
}
