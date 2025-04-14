'use client'

import { fetchMLBLive } from '@/lib/fetch'
import TeamRecords from './TeamRecords'

export default function Division({ record }: { record: MLB.StandingsRecord }) {
	const { data, isLoading } = fetchMLBLive<MLB.Divisions>(record.division.link)

	if (isLoading) return <article>Loading...</article>

	const [division] = data?.divisions ?? []

	return (
		<article className="border">
			<h2>{division.nameShort}</h2>
			<TeamRecords teamRecords={record.teamRecords} />
		</article>
	)
}
