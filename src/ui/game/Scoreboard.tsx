import { useGameContext } from './context'
import Flip from '@/ui/Flip'
import { cn } from '@/lib/utils'

export default function Scoreboard() {
	const { data } = useGameContext()
	const { innings = [] } = data?.liveData.linescore ?? {}

	return (
		<div className="overflow-fade-r pr-ch overflow-x-auto">
			<table className="min-w-full table-fixed text-center whitespace-nowrap">
				<thead>
					<tr className="h-lh align-bottom *:min-w-[calc((50vw/9)-0.5px)] *:text-xs sm:*:min-w-[2.5ch]">
						{Array.from({ length: Math.max(innings.length, 9) }).map((_, i) => (
							<th className="text-subdued font-normal" key={i}>
								{i + 1}
							</th>
						))}
						<th className="text-subdued font-normal">R</th>
						<th className="text-subdued font-normal">H</th>
						<th className="text-subdued font-normal">E</th>
						<th className="text-subdued font-normal">LOB</th>
					</tr>
				</thead>
				<tbody>
					<Row side="away" />
					<Row side="home" />
				</tbody>
			</table>
		</div>
	)
}

function Row({ side }: { side: 'away' | 'home' }) {
	const { data, isFinal, isLive, isCancelled } = useGameContext()

	const {
		innings = [],
		inningState,
		currentInning,
		teams,
	} = data?.liveData.linescore ?? {}

	const isOffense =
		isLive &&
		((inningState === 'Top' && side === 'away') ||
			(inningState === 'Bottom' && side === 'home'))

	return (
		<tr>
			{Array.from({ length: Math.max(innings.length, 9) }).map((_, i) => {
				const { runs } = innings[i]?.[side] ?? {}
				const current = currentInning
					? currentInning - 1 === i && isOffense
					: false

				const calledEarly =
					!isCancelled && isFinal && side === 'home' && i >= 8 && isNaN(runs)

				return (
					<td
						className={cn(
							'border-subdued/50 h-lh transition-colors data-[third]:border-l',
							runs > 0 ? 'font-bold' : 'text-fg/50',
							current && 'bg-subdued/50',
						)}
						data-third={(i !== 0 && i % 3 === 0) || undefined}
						key={i}
					>
						<Flip
							className={cn(
								current &&
									'group-has-data-[scoring]/game:animate-pulse group-has-data-[scoring]/game:text-yellow-400',
							)}
							disable={!current}
						>
							{calledEarly ? 'X' : runs}
						</Flip>
					</td>
				)
			})}
			<td className="border-subdued border-l font-bold">
				<Flip disable={!isLive}>{teams?.[side].runs}</Flip>
			</td>
			<td>
				<Flip disable={!isLive}>{teams?.[side].hits}</Flip>
			</td>
			<td>
				<Flip disable={!isLive}>{teams?.[side].errors}</Flip>
			</td>
			<td>
				<Flip disable={!isLive}>{teams?.[side].leftOnBase}</Flip>
			</td>
		</tr>
	)
}
