'use client'

import { GameProvider } from './store'
import { fetchMLBLive } from '@/lib/fetch'
import getGameStatus from '@/lib/game-status'
import Loading from '@/ui/Loading'
import DiamondScore from './DiamondScore'
import Scoreboard from './Scoreboard'
import BSO from './BSO'
import Matchup from './matchup/Matchup'
import Details from './Details/Details'
import ProbablePitchers from './ProbablePitchers'
import Venue from './Venue'
import { cn } from '@/lib/utils'

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { data } = fetchMLBLive<MLB.LiveData>(game.link)
	const { isPreview, isLive, isFinal, isCancelled } = getGameStatus(game.status)

	if (!data) return <Loading className="m-auto" />

	return (
		<GameProvider value={{ game, data }}>
			<article className="@container grid grid-cols-2">
				<DiamondScore className={cn(isPreview && 'col-span-2')} />

				{!isPreview && <Scoreboard />}

				{isLive && (
					<div className="relative z-1 col-span-full grid grid-cols-[auto_1fr_50%] @max-lg:grid-cols-[auto_1fr] @max-lg:grid-rows-[auto_auto]">
						<div className="row-span-full grid w-12">
							<BSO className="mx-auto" />
						</div>

						<Matchup className="grow" />
						<Details />
					</div>
				)}

				{isPreview && <ProbablePitchers className="col-span-full ml-12" />}

				{!isLive && <Venue className="h-lh col-span-full ml-12" />}
			</article>
		</GameProvider>
	)
}
