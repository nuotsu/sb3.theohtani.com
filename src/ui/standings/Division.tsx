'use client'

import { fetchMLBLive } from '@/lib/fetch'
import Loading from '@/ui/Loading'
import TeamRecords from './TeamRecords'

export default function Division({ record }: { record: MLB.StandingsRecord }) {
	const { data, isLoading } = fetchMLBLive<MLB.Divisions>(record.division.link)

	if (isLoading) return <Loading />

	const [division] = data?.divisions ?? []

	return (
		<article className="@container">
			<TeamRecords
				heading={division.nameShort}
				teamRecords={record.teamRecords}
			/>
		</article>
	)
}
