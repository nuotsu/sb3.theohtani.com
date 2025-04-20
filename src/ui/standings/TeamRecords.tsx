import { useMemo } from 'react'
import { useLocalStorage } from '@/lib/store'
import TeamRecord from './TeamRecord'
import { cn } from '@/lib/utils'

export default function TeamRecords({
	heading,
	teamRecords,
}: {
	heading?: string
	teamRecords: MLB.StandingsTeamRecord[]
}) {
	const { noSpoilers } = useLocalStorage()

	if (!teamRecords.length) return null

	const records = useMemo(
		() =>
			structuredClone(teamRecords).sort((a, b) => {
				if (noSpoilers.includes(a.team.id)) return 1
				if (noSpoilers.includes(b.team.id)) return -1
				return 0
			}),
		[noSpoilers],
	)

	return (
		<table className="w-full text-center tabular-nums">
			<thead>
				<tr className="align-end max-md:bg-bg/50 sticky top-0 uppercase max-md:backdrop-blur">
					<th className="sticky left-0 w-[8ch] @sm:w-[14ch] @lg:w-[20ch]">
						<small className="block leading-tight">{heading}</small>
					</th>

					{['W-L', 'Pct', 'GB', 'Strk', 'Rank'].map((label) => (
						<td
							className={cn(
								'text-current/25',
								label === 'W-L' && 'min-w-[6ch]',
							)}
							data-rank={label === 'Rank' || undefined}
							key={label}
						>
							<small>{label}</small>
						</td>
					))}
				</tr>
			</thead>

			<tbody>
				{records.map((teamRecord) => (
					<TeamRecord teamRecord={teamRecord} key={teamRecord.team.id} />
				))}
			</tbody>
		</table>
	)
}
