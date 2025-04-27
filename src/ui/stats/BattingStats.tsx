import { cn } from '@/lib/utils'

export default function BattingStats({ stat }: { stat: MLB.BattingStats }) {
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
		</>
	)
}
