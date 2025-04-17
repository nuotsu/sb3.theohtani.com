import getGameStatus from '@/lib/game-status'
import { useGameContext } from './store'
import { cn } from '@/lib/utils'

const runnerKeys: Record<string, number> = {
	first: 0,
	second: 1,
	third: 2,
}

export default function BaseRunners({
	className,
}: React.ComponentProps<'div'>) {
	const { game, data } = useGameContext()
	const { offense = {}, inningState } = data?.liveData.linescore ?? {}

	const runners = Object.keys(offense)
		.map((key) => runnerKeys[key])
		.filter(Number.isInteger)

	const interlude = ['Middle', 'End'].includes(inningState ?? '')

	const { isLive } = getGameStatus(game.status)

	return (
		<div
			className={cn(
				'ring-bg grid rotate-45 grid-cols-2 gap-1 ring-4 transition-colors',
				interlude && 'text-subdued',
				className,
			)}
		>
			{Array.from({ length: 3 }).map((_, i) => {
				const base = Object.keys(offense).find((key) => runnerKeys[key] === i)
				const runner = offense[base as keyof typeof offense] as
					| MLB.BasicPlayerData
					| undefined

				return (
					<span
						className={cn(
							'base bg-bg size-4 border transition-colors',
							i === 0 && 'order-2',
							i === 1 && 'order-1',
							i === 2 && 'order-3',
							isLive &&
								runners.includes(i) &&
								'border-yellow-400 bg-yellow-400',
						)}
						title={`${runner?.fullName} on ${base}`}
						key={i}
					/>
				)
			})}
		</div>
	)
}
