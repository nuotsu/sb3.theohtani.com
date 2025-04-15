import { cn } from '@/lib/utils'

export default function TeamRecords({
	teamRecords,
}: {
	teamRecords: MLB.StandingsTeamRecord[]
}) {
	if (!teamRecords.length) return null

	return (
		<table className="w-full table-fixed text-center tabular-nums">
			<tbody>
				{teamRecords.map((teamRecord) => (
					<tr key={teamRecord.team.id}>
						<th className="w-[18ch] text-right font-normal">
							{teamRecord.team.name}
						</th>
						<td>
							{teamRecord.wins}-{teamRecord.losses}
						</td>
						<td>{teamRecord.winningPercentage}</td>
						<td>{teamRecord.divisionGamesBack}</td>

						<td
							className={cn({
								'text-green-200': teamRecord.streak.streakType === 'wins',
								'text-red-200': teamRecord.streak.streakType === 'losses',
							})}
						>
							{teamRecord.streak.streakCode}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
