import { useLeaderboardContext } from './context'
import { useStorage } from '@/lib/store'
import GroupSwitcher from './GroupSwitcher'
import LeaderboardTable from './LeaderboardTable'
import ColumnHeader from './ColumnHeader'
import Team from './Team'
import { cn } from '@/lib/utils'

export default function PitchingStats() {
	const { data } = useLeaderboardContext()
	const { splits } = data?.stats?.[0] ?? {}

	if (!splits) return null

	return (
		<LeaderboardTable
			head={
				<>
					<td className="uppercase">
						<GroupSwitcher />
					</td>
					<ColumnHeader stat="era">ERA</ColumnHeader>
					<ColumnHeader stat="wins">W</ColumnHeader>
					<ColumnHeader stat="losses">L</ColumnHeader>
					<ColumnHeader stat="gamesPitched">G</ColumnHeader>
					<ColumnHeader stat="gamesStarted">GS</ColumnHeader>
					<ColumnHeader stat="completeGames">CG</ColumnHeader>
					<ColumnHeader stat="shutouts">SHO</ColumnHeader>
					<ColumnHeader stat="saves">SV</ColumnHeader>
					<ColumnHeader stat="saveOpportunities">SVO</ColumnHeader>
					<ColumnHeader stat="strikeOuts">K</ColumnHeader>
					<ColumnHeader stat="avg">AVG</ColumnHeader>
					<ColumnHeader stat="whip">WHIP</ColumnHeader>
					<ColumnHeader stat="strikeoutWalkRatio">K/BB</ColumnHeader>
					<ColumnHeader stat="pickoffs">PO</ColumnHeader>
					<ColumnHeader stat="inningsPitched">IP</ColumnHeader>
					<ColumnHeader stat="hits">H</ColumnHeader>
					<ColumnHeader stat="runs">R</ColumnHeader>
					<ColumnHeader stat="earnedRuns">ER</ColumnHeader>
					<ColumnHeader stat="homeRuns">HR</ColumnHeader>
					<ColumnHeader stat="baseOnBalls">BB</ColumnHeader>
					<ColumnHeader stat="hitBatsmen">HB</ColumnHeader>
					<ColumnHeader stat="wildPitches">WP</ColumnHeader>
				</>
			}
		>
			{splits?.map((split) => (
				<tr className="group *:px-ch hover:bg-current/5" key={split.player.id}>
					<Team split={split} />
					<Stats stat={split.stat as MLB.PitchingStats} />
				</tr>
			))}
		</LeaderboardTable>
	)
}

function Stats({ stat }: { stat: MLB.PitchingStats }) {
	const { sortStat } = useStorage()

	const Stat = ({
		value,
		bordered,
		className,
		children,
		...props
	}: {
		value?: keyof MLB.PitchingStats
		bordered?: boolean
	} & React.ComponentProps<'td'>) => (
		<td
			className={cn(
				sortStat === value && 'bg-fg/5',
				bordered && 'border-l border-current/20',
				className,
			)}
			{...props}
		>
			{children || (value && stat[value])}
		</td>
	)

	return (
		<>
			<Stat
				value="era"
				className={cn({
					'text-green-200': parseFloat(stat.era) < 2,
					'text-red-200': parseFloat(stat.era) >= 10,
				})}
			/>
			<Stat colSpan={2}>
				{stat.wins}-{stat.losses}
			</Stat>
			<Stat value="gamesPitched" bordered />
			<Stat value="gamesStarted" />
			<Stat value="completeGames" />
			<Stat value="shutouts" />
			<Stat colSpan={2}>
				{stat.saves}/{stat.saveOpportunities}
			</Stat>
			<Stat value="strikeOuts" bordered />
			<Stat
				value="avg"
				className={cn({
					'text-green-200': parseFloat(stat.avg) < 0.2,
				})}
			/>
			<Stat
				value="whip"
				className={cn({
					'text-green-200': parseFloat(stat.whip) < 1,
				})}
			/>
			<Stat
				value="strikeoutWalkRatio"
				className={cn({
					'text-green-200': parseFloat(stat.strikeoutWalkRatio) > 5,
					'text-red-200': parseFloat(stat.strikeoutWalkRatio) < 1,
				})}
			/>
			<Stat value="pickoffs" />
			<Stat value="inningsPitched" bordered />
			<Stat value="hits" />
			<Stat value="runs" />
			<Stat value="earnedRuns" />
			<Stat value="homeRuns" />
			<Stat value="baseOnBalls" />
			<Stat value="hitBatsmen" />
			<Stat value="wildPitches" />
		</>
	)
}
