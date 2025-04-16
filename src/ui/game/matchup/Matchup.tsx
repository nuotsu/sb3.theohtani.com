import { fetchPlayer } from '@/lib/fetch'
import Flip from '@/ui/Flip'
import PlayerContainer from './PlayerContainer'
import UpNext from './UpNext'
import { cn } from '@/lib/utils'

export default function Matchup({
	data,
	className,
}: { data?: MLB.LiveData | null } & React.ComponentProps<'div'>) {
	const { defense, inningState, inningHalf } = data?.liveData.linescore ?? {}
	const { teams } = data?.liveData.boxscore ?? {}

	const interlude = ['Middle', 'End'].includes(inningState ?? '')

	const { data: pitcher } = fetchPlayer(defense?.pitcher)

	const pitchingStats = (
		teams?.[inningHalf === 'Top' ? 'home' : 'away'].players[
			`ID${pitcher?.id}`
		] as MLB.BoxScoreTeamPlayer
	)?.stats?.pitching

	return (
		<div
			className={cn(
				'relative h-[2lh] grow transition-colors',
				interlude && 'text-subdued [&_img]:opacity-20',
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
							<small className="line-clamp-1 opacity-50">
								{pitchingStats.summary}
							</small>
						)}
						<span className="flex items-baseline tabular-nums">
							<small>P:</small>
							<Flip>{pitchingStats.numberOfPitches}</Flip>
						</span>
					</>
				)}
			</PlayerContainer>

			<UpNext data={data} />
		</div>
	)
}
