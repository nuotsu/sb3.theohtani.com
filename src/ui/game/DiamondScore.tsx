import getGameStatus from '@/lib/game-status'
import BaseRunners from './BaseRunners'
import CurrentInning from './CurrentInning'
import Team from './Team'
import { cn } from '@/lib/utils'
import GameStatus from './GameStatus'

export default function DiamondScore({
	data,
	game,
	className,
}: {
	data?: MLB.LiveData | null
	game: MLB.ScheduleGame
} & React.ComponentProps<'header'>) {
	const { isPreview, isLive, isFinal, isCancelled } = getGameStatus(game.status)

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
				<BaseRunners
					className={cn(
						'col-span-full row-span-full m-auto',
						!isLive && 'text-subdued [&_.base]:bg-bg',
					)}
					data={data}
				/>

				{isLive && (
					<CurrentInning
						className="relative col-span-full row-[2/-1]"
						data={data}
					/>
				)}

				{!isLive && <GameStatus game={game} />}
			</div>

			<Team side="away" data={data} game={game} />
			<Team side="home" data={data} game={game} />
		</header>
	)
}
