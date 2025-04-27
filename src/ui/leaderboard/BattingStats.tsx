import { useLeaderboardContext } from './context'
import LeaderboardTable from './LeaderboardTable'
import ColumnHeader from './ColumnHeader'
import TeamColor from '@/ui/team/TeamColor'
import Headshot from '@/ui/Headshot'
import { cn } from '@/lib/utils'

export default function BattingStats() {
	const { data } = useLeaderboardContext()
	const { splits } = data?.stats[0] ?? {}

	return (
		<LeaderboardTable
			head={
				<>
					<ColumnHeader stat="avg">AVG</ColumnHeader>
					<ColumnHeader stat="homeRuns">HR</ColumnHeader>
					<ColumnHeader stat="rbi">RBI</ColumnHeader>
				</>
			}
		>
			{splits?.map(({ player, team, rank, stat }) => (
				<tr className="group *:px-[.5ch] hover:bg-current/5" key={player.id}>
					<TeamColor as="th" className="pl-0!" team={team as MLB.Team}>
						<div className="flex items-center gap-[.5ch]">
							<span className="w-[3ch] text-[x-small] tabular-nums group-[:not(:hover)]:text-current/50">
								{rank}
							</span>

							<Headshot
								className="size-lh object-contain"
								player={player}
								size={48}
							/>

							<span className="line-clamp-1 break-all">{player.fullName}</span>
						</div>
					</TeamColor>

					<Stats stat={stat as MLB.BattingStats} />
				</tr>
			))}
		</LeaderboardTable>
	)
}

function Stats({ stat }: { stat: MLB.BattingStats }) {
	return (
		<>
			<td
				className={cn('tabular-nums', {
					'text-green-200': parseFloat(stat.avg) >= 0.3,
					'text-red-200': parseFloat(stat.avg) < 0.2,
				})}
			>
				{stat.avg}
			</td>

			<td className="tabular-nums">{stat.homeRuns}</td>
			<td className="tabular-nums">{stat.rbi}</td>
		</>
	)
}
