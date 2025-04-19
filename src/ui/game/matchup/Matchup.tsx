import { useGameContext } from '@/ui/game/context'
import { fetchPlayer } from '@/lib/fetch'
import PlayerContainer from './PlayerContainer'
import PitchingStats, { getPitchingStats } from './PitchingStats'
import Flip from '@/ui/Flip'
import UpNext from './UpNext'
import { cn } from '@/lib/utils'

export default function Matchup({ className }: React.ComponentProps<'div'>) {
	const { data, isInterlude } = useGameContext()
	const { defense } = data?.liveData.linescore ?? {}

	const { data: pitcher } = fetchPlayer(defense?.pitcher)

	const { inningHalf } = data?.liveData.linescore ?? {}
	const pitchingStats = getPitchingStats(pitcher, data, inningHalf === 'Top')

	return (
		<div
			className={cn(
				'relative h-[2lh] grow transition-colors',
				isInterlude && 'text-subdued [&_img]:opacity-20',
				className,
			)}
		>
			<PlayerContainer
				className="border-subdued/50 border-b"
				player={pitcher}
				key={pitcher?.id}
			>
				{pitchingStats && (
					<>
						{pitchingStats.summary !== '0.0 IP, 0 ER, 0 K, 0 BB' && (
							<PitchingStats stats={pitchingStats} />
						)}

						<span className="flex items-baseline tabular-nums">
							<small>P:</small>
							<Flip>{pitchingStats.numberOfPitches}</Flip>
						</span>
					</>
				)}
			</PlayerContainer>

			<UpNext />
		</div>
	)
}
