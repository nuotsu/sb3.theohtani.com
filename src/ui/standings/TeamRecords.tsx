import TeamColor from '@/ui/team/TeamColor'
import TeamLogo from '@/ui/team/TeamLogo'
import { fetchMLBLive } from '@/lib/fetch'
import { cn } from '@/lib/utils'

export default function TeamRecords({
	heading,
	teamRecords,
}: {
	heading?: string
	teamRecords: MLB.StandingsTeamRecord[]
}) {
	if (!teamRecords.length) return null

	return (
		<table className="w-full table-fixed text-center tabular-nums">
			<thead>
				<tr className="align-end bg-bg/60 sticky top-0 uppercase backdrop-blur">
					<th className="sticky left-0 w-[8ch] @sm:w-[14ch] @lg:w-[20ch]">
						<small className="block leading-tight">{heading}</small>
					</th>

					{['W-L', 'Pct', 'GB', 'Strk', 'Rank'].map((label) => (
						<td
							className={cn('text-subdued', label === 'W-L' && 'w-[6ch]')}
							key={label}
						>
							<small>{label}</small>
						</td>
					))}
				</tr>
			</thead>

			<tbody>
				{teamRecords.map((teamRecord) => (
					<tr className="*:px-[.5ch]" key={teamRecord.team.id}>
						<Team teamRecord={teamRecord} />

						<td className="whitespace-nowrap">
							{teamRecord.wins}-{teamRecord.losses}
						</td>

						<td
							className={cn({
								'text-green-200':
									parseFloat(teamRecord.winningPercentage) > 0.5,
								'text-red-200': parseFloat(teamRecord.winningPercentage) < 0.5,
							})}
						>
							{teamRecord.winningPercentage}
						</td>

						<td>{teamRecord.divisionGamesBack}</td>

						{teamRecord.streak && (
							<td
								className={cn({
									'text-green-200': teamRecord.streak.streakType === 'wins',
									'text-red-200': teamRecord.streak.streakType === 'losses',
								})}
							>
								{teamRecord.streak.streakCode}
							</td>
						)}

						<td>{teamRecord.leagueRank}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

function Team({ teamRecord }: { teamRecord: MLB.StandingsTeamRecord }) {
	const { data } = fetchMLBLive<{ teams: MLB.Team[] }>(teamRecord.team.link)
	const [team] = data?.teams ?? []

	return (
		<TeamColor
			as="th"
			team={teamRecord.team as MLB.Team}
			className="pr-0! text-left"
		>
			<div className="flex items-center gap-x-[.5ch]">
				<span className="line-clamp-1 leading-none @max-lg:hidden">
					{teamRecord.team.name}
				</span>

				<span className="leading-none @max-sm:hidden @lg:hidden">
					{team?.clubName}
				</span>

				<abbr className="leading-none @sm:hidden" title={teamRecord.team.name}>
					{team?.abbreviation}
				</abbr>

				<TeamLogo
					className="h-lh ml-auto inline-block"
					team={team}
					draggable={false}
				/>
			</div>
		</TeamColor>
	)
}
