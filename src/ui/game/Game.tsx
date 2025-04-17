'use client'

import getGameStatus from '@/lib/game-status'
import { fetchMLBLive } from '@/lib/fetch'
import DiamondScore from './DiamondScore'
import Scoreboard from './Scoreboard'
import BSO from './BSO'
import Matchup from './matchup/Matchup'
import Details from './Details/Details'
import ProbablePitchers from './ProbablePitchers'
import Venue from './Venue'
import { cn } from '@/lib/utils'

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { isPreview, isLive } = getGameStatus(game.status)
	const { data } = fetchMLBLive<MLB.LiveData>(game.link)

	return (
		<>
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
					<div className="relative z-1 col-span-full grid grid-cols-[auto_1fr_50%] @max-lg:grid-cols-[auto_1fr] @max-lg:grid-rows-[auto_auto]">
						<div className="row-span-full grid w-12">
							<BSO className="mx-auto" data={data} />
						</div>

						<Matchup className="grow" data={data} />
						<Details data={data} />
					</div>
				)}

				{isPreview && (
					<ProbablePitchers className="col-span-full ml-12" data={data} />
				)}

				{!isLive && <Venue className="col-span-full ml-12" data={data} />}
			</article>

			{isLive && (
				<hr
					data-active
					className="border-subdued -order-2 col-span-full border-dashed data-[active]:not-first-of-type:hidden"
				/>
			)}

			{isPreview && (
				<hr
					data-scheduled
					className="border-subdued -order-1 col-span-full hidden border-dashed data-[scheduled]:not-last-of-type:hidden [[data-active]~&]:block"
				/>
			)}
		</>
	)
}
