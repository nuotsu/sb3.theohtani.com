'use client'

import { GameProvider, useGameContext } from './context'
import { fetchMLBLive } from '@/lib/fetch'
import Loading from '@/ui/Loading'
import NoSpoilerCheckboxes from '@/ui/spoiler/NoSpoilerCheckbox'
import DiamondScore from './DiamondScore'
import Scoreboard from './Scoreboard'
import BSO from './BSO'
import Matchup from './matchup/Matchup'
import PitchSequence from './pitch/PitchSequence'
import Details from './Details/Details'
import ProbablePitchers from './ProbablePitchers'
import Decisions from './Decisions'
import Venue from './Venue'
import { cn } from '@/lib/utils'

function GameComponent() {
	const { isPreview, isLive, isFinal, hasNoSpoiler } = useGameContext()

	return (
		<article
			className={cn(
				'anim-fade group/game @container isolate grid grid-cols-2 overflow-hidden',
				isFinal && 'grid-rows-[auto_auto_1fr]',
			)}
		>
			<NoSpoilerCheckboxes />

			<DiamondScore
				className={cn((isPreview || hasNoSpoiler) && 'relative z-1 col-span-2')}
			/>

			{!isPreview && !hasNoSpoiler && <Scoreboard />}

			{isLive && !hasNoSpoiler && (
				<>
					<div className="relative z-1 col-span-full grid grid-cols-[auto_1fr_50%] @max-lg:grid-cols-[auto_1fr] @max-lg:grid-rows-[auto_auto]">
						<div className="row-span-full grid w-12">
							<BSO className="mx-auto" />
						</div>

						<Matchup className="grow" />
						<Details />
					</div>

					<PitchSequence />
				</>
			)}

			{(isPreview || hasNoSpoiler) && (
				<ProbablePitchers className="col-span-full ml-12" />
			)}

			{isFinal && !hasNoSpoiler && (
				<Decisions className="col-span-full ml-12" />
			)}

			{(!isLive || hasNoSpoiler) && (
				<Venue className="h-lh col-span-full ml-12 p-[.5ch] text-sm" />
			)}
		</article>
	)
}

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { data } = fetchMLBLive<MLB.LiveData>(game.link)

	if (!data) return <Loading className="m-auto" />

	return (
		<GameProvider value={{ game, data }}>
			<GameComponent />
		</GameProvider>
	)
}
