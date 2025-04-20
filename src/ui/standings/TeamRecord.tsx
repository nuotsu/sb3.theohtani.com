import { useLocalStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import TeamColor from '@/ui/team/TeamColor'
import TeamLogo from '@/ui/team/TeamLogo'
import { cn } from '@/lib/utils'

export default function TeamRecord({
	teamRecord,
}: {
	teamRecord: MLB.StandingsTeamRecord
}) {
	const { noSpoilers } = useLocalStorage()

	const hasNoSpoiler = noSpoilers.includes(teamRecord.team.id)

	return (
		<tr className="*:px-[.5ch]" key={teamRecord.team.id}>
			<Team teamRecord={teamRecord} />

			{hasNoSpoiler ? (
				<td colSpan={5} />
			) : (
				<>
					<td className="whitespace-nowrap">
						{teamRecord.wins}-{teamRecord.losses}
					</td>

					<td
						className={cn({
							'text-green-200': parseFloat(teamRecord.winningPercentage) > 0.5,
							'text-red-200': parseFloat(teamRecord.winningPercentage) < 0.5,
						})}
					>
						{teamRecord.winningPercentage}
					</td>

					<td>{teamRecord.divisionGamesBack}</td>

					<td
						className={cn({
							'text-green-200': teamRecord.streak?.streakType === 'wins',
							'text-red-200': teamRecord.streak?.streakType === 'losses',
						})}
					>
						{teamRecord.streak?.streakCode}
					</td>

					<td data-rank>{teamRecord.leagueRank}</td>
				</>
			)}
		</tr>
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
			<div className="flex items-center gap-x-[.5ch] *:line-clamp-1">
				<span className="leading-none @max-lg:hidden">
					{teamRecord.team.name}
				</span>

				<span className="leading-none @max-sm:hidden @lg:hidden">
					{team?.clubName}
				</span>

				<abbr className="leading-none @sm:hidden" title={teamRecord.team.name}>
					{team?.abbreviation}
				</abbr>

				<TeamLogo
					className="h-lh ml-auto inline-block shrink-0"
					team={team}
					draggable={false}
				/>
			</div>
		</TeamColor>
	)
}
