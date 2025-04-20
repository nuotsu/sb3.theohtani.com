import { useEffect, useRef } from 'react'
import { useGameContext } from '@/ui/game/context'
import { fetchPlayer } from '@/lib/fetch'
import { getPitchingStats } from '@/ui/game/matchup/PitchingStats'
import { NumberOfPitches } from '@/ui/game/matchup/CurrentPitcher'
import Pitch from './Pitch'
import { cn } from '@/lib/utils'

export default function PitchSequence() {
	const { game, data } = useGameContext()
	const { playEvents } = data?.liveData?.plays.currentPlay ?? {}

	const pitches = playEvents?.filter((event) => event.isPitch) as
		| MLB.LivePlayPitch[]
		| undefined

	const { defense, inningHalf } = data?.liveData.linescore ?? {}
	const { data: pitcher } = fetchPlayer(defense?.pitcher, 'pitching')
	const gameStats = getPitchingStats(pitcher, data, inningHalf === 'Top')

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!ref.current) return

		ref.current.scrollTo({
			top: ref.current.scrollHeight,
			behavior: 'smooth',
		})
	}, [pitches?.length])

	return (
		<div
			className={cn(
				'ml-lh absolute inset-0 left-auto z-1 max-h-full min-w-1/2 border-l border-current/20 text-left backdrop-blur-sm transition-transform',
				'group-not-has-[[name="pitch-sequence"]:checked]/game:translate-x-full',
			)}
		>
			<div ref={ref} className="max-h-full overflow-y-auto">
				<div className="gap-ch blur-gradient-to-b h-lh sticky top-0 z-1 flex px-[.5ch] *:text-sm before:-bottom-2">
					<span className="line-clamp-1 grow">Pitch Sequence</span>

					{gameStats && <NumberOfPitches value={gameStats.numberOfPitches} />}
				</div>

				<ol className="space-y-1 pr-[.5ch]">
					{pitches?.map((pitch) => (
						<Pitch pitch={pitch} key={pitch.pitchNumber} />
					))}
				</ol>
			</div>

			<label
				className="size-lh absolute top-0 right-full grid place-content-center group-not-has-[[name='pitch-sequence']:checked]/game:hidden"
				htmlFor={`pitch-sequence-${game.gamePk}`}
			>
				&times;
			</label>
		</div>
	)
}
