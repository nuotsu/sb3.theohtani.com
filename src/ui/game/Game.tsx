'use client'

import getGameStatus from '@/lib/game-status'
import { fetchMLBLive } from '@/lib/fetch'
import DiamondScore from './DiamondScore'
import BSO from './BSO'
import { cn } from '@/lib/utils'

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { isPreview, isLive } = getGameStatus(game)
	const { data } = fetchMLBLive<MLB.LiveData>(game.link)

	return (
		<article
			className={cn('@container grid grid-cols-2', {
				'order-first': isLive,
				'-order-1': isPreview,
			})}
		>
			<DiamondScore data={data} game={game} />

			<div>scoreboard</div>

			{isLive && (
				<div className="relative flex">
					<BSO className="w-12" data={data} />
					<div className="bg-fg text-bg relative grow">Matchup</div>
				</div>
			)}

			<div className={cn(!isLive && 'col-span-full ml-12')}>details</div>
		</article>
	)
}
