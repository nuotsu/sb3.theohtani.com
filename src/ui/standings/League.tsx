'use client'

import { fetchMLBLive } from '@/lib/fetch'
import Loading from '@/ui/Loading'
import TeamRecords from './TeamRecords'

export default function League({ record }: { record: MLB.StandingsRecord }) {
	const { data, isLoading } = fetchMLBLive<MLB.Leagues>(record.league.link)

	if (isLoading) return <Loading />

	const [league] = data?.leagues ?? []

	return (
		<article className="@container">
			<TeamRecords heading={league.name} teamRecords={record.teamRecords} />
		</article>
	)
}
