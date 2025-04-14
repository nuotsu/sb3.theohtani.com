'use client'

import getGameStatus from '@/lib/game-status'
import { fetchMLBLive } from '@/lib/fetch'
import DiamondScore from './DiamondScore'
import Scoreboard from './Scoreboard'
import BSO from './BSO'
import Details from './Details'
import { cn } from '@/lib/utils'

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { isPreview, isLive } = getGameStatus(game.status)
	const { data } = fetchMLBLive<MLB.LiveData>(game.link)

	return (
		<article
			className={cn('@container grid grid-cols-2', {
				'order-first': isLive,
				'-order-1': isPreview,
			})}
		>
			<DiamondScore
				data={data}
				game={game}
				className={cn(isPreview && 'col-span-2')}
			/>

			{!isPreview && <Scoreboard data={data} />}

			{isLive && (
				<div className="relative col-span-2 flex">
					<BSO className="w-12" data={data} />
					<div className="bg-fg text-bg relative grow">Matchup</div>
				</div>
			)}

			<Details className="col-span-2 ml-12" data={data} />
		</article>
	)
}
