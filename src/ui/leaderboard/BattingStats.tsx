import { useLeaderboardContext } from './context'
import { useStorage } from '@/lib/store'
import LeaderboardTable from './LeaderboardTable'
import ColumnHeader from './ColumnHeader'
import { cn } from '@/lib/utils'
import Team from './Team'

export default function BattingStats() {
	const { data } = useLeaderboardContext()
	const { splits, group } = data?.stats?.[0] ?? {}

	if (!splits) return null

	return (
		<LeaderboardTable
			head={
				<>
					<td className="uppercase">{group?.displayName}</td>
					<ColumnHeader stat="avg">AVG</ColumnHeader>
					<ColumnHeader stat="atBats">AB</ColumnHeader>
					<ColumnHeader stat="hits">H</ColumnHeader>
					<ColumnHeader stat="doubles">2B</ColumnHeader>
					<ColumnHeader stat="triples">3B</ColumnHeader>
					<ColumnHeader stat="runs">R</ColumnHeader>
					<ColumnHeader stat="homeRuns">HR</ColumnHeader>
					<ColumnHeader stat="rbi">RBI</ColumnHeader>
					<ColumnHeader stat="obp">OBP</ColumnHeader>
					<ColumnHeader stat="slg">SLG</ColumnHeader>
					<ColumnHeader stat="ops">OPS</ColumnHeader>
					<ColumnHeader stat="baseOnBalls">BB</ColumnHeader>
					<ColumnHeader stat="strikeOuts">SO</ColumnHeader>
					<ColumnHeader stat="stolenBases">SB</ColumnHeader>
					<ColumnHeader stat="stolenBasePercentage">SB%</ColumnHeader>
				</>
			}
		>
			{splits?.map((split) => (
				<tr className="group *:px-ch hover:bg-current/5" key={split.player.id}>
					<Team split={split} />
					<Stats stat={split.stat as MLB.BattingStats} />
				</tr>
			))}
		</LeaderboardTable>
	)
}

function Stats({ stat }: { stat: MLB.BattingStats }) {
	const { sortStat } = useStorage()

	const Stat = ({
		value,
		bordered,
		className,
		children,
	}: {
		value: keyof MLB.BattingStats
		bordered?: boolean
	} & React.ComponentProps<'td'>) => (
		<td
			className={cn(
				sortStat === value && 'bg-fg/5',
				bordered && 'border-l border-current/20',
				className,
			)}
		>
			{children || stat[value]}
		</td>
	)

	return (
		<>
			<Stat
				value="avg"
				className={cn({
					'text-green-200': parseFloat(stat.avg) >= 0.3,
					'text-red-200': parseFloat(stat.avg) < 0.2,
				})}
			/>
			<Stat value="atBats" />
			<Stat value="hits" bordered />
			<Stat value="doubles" />
			<Stat value="triples" />
			<Stat value="runs" />
			<Stat value="homeRuns" />
			<Stat value="rbi" />
			<Stat value="obp" bordered />
			<Stat value="slg" />
			<Stat
				value="ops"
				className={cn({
					'text-green-200': parseFloat(stat.ops) >= 1,
				})}
			/>
			<Stat value="baseOnBalls" bordered />
			<Stat value="strikeOuts" />
			<Stat value="stolenBases" />
			<Stat
				value="stolenBasePercentage"
				className={cn({
					'text-green-200': parseFloat(stat.stolenBasePercentage) === 1,
				})}
			>
				{isNaN(parseFloat(stat.stolenBasePercentage)) ||
					`${(parseFloat(stat.stolenBasePercentage) * 100).toFixed(0)}%`}
			</Stat>
		</>
	)
}
