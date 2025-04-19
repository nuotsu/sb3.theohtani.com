import { useStorage } from '@/lib/store'
import { useGameContext } from '@/ui/game/context'
import { fetchPlayer, getStats } from '@/lib/fetch'
import PlayerContainer from './PlayerContainer'
import PitchingStats, { getPitchingStats } from './PitchingStats'
import Flip from '@/ui/Flip'
import UpNext from './UpNext'
import { cn } from '@/lib/utils'

export default function Matchup({ className }: React.ComponentProps<'div'>) {
	const { date } = useStorage()
	const { data, isInterlude } = useGameContext()
	const { defense } = data?.liveData.linescore ?? {}

	const { data: pitcher } = fetchPlayer(defense?.pitcher, 'pitching')

	const { inningHalf } = data?.liveData.linescore ?? {}
	const gameStats = getPitchingStats(pitcher, data, inningHalf === 'Top')

	const year = new Date(date).getFullYear()
	const seasonStats = getStats(pitcher, year)?.stat as MLB.PitchingStats | null

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
				subText={
					seasonStats && (
						<>
							({seasonStats.wins}-{seasonStats.losses}, {seasonStats.era})
						</>
					)
				}
				key={pitcher?.id}
			>
				{gameStats && (
					<>
						{gameStats.summary !== '0.0 IP, 0 ER, 0 K, 0 BB' && (
							<PitchingStats stats={gameStats} />
						)}

						<span className="flex shrink-0 items-baseline tabular-nums">
							<small>P:</small>
							<Flip>{gameStats.numberOfPitches}</Flip>
						</span>
					</>
				)}
			</PlayerContainer>

			<UpNext />
		</div>
	)
}
