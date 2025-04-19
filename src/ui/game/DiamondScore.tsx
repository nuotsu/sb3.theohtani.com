import { useGameContext } from './store'
import getGameStatus from '@/lib/game-status'
import BaseRunners from './BaseRunners'
import CurrentInning from './CurrentInning'
import GameStatus from './GameStatus'
import Team from './Team'
import { cn } from '@/lib/utils'

export default function DiamondScore({
	className,
}: React.ComponentProps<'header'>) {
	const { game, hasNoSpoiler } = useGameContext()
	const { isLive } = getGameStatus()

	return (
		<header
			className={cn(
				'grid grid-cols-[auto_1fr_1fr] grid-rows-[1lh_1fr_1fr]',
				className,
			)}
		>
			<p className="col-[2/-1] flex items-end justify-center text-center">
				<small className="line-clamp-1">{game.description}</small>
			</p>

			<div className="relative z-1 col-[1/2] row-[2/-1] grid w-12 grid-rows-2 pr-1 pl-2">
				<BaseRunners className="col-span-full row-span-full m-auto" />

				{isLive && !hasNoSpoiler && (
					<CurrentInning className="relative col-span-full" />
				)}

				{(!isLive || hasNoSpoiler) && <GameStatus />}
			</div>

			<Team side="away" />
			<Team side="home" />
		</header>
	)
}
