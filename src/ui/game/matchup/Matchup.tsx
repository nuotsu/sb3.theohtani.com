import { useGameContext } from '@/ui/game/store'
import { fetchPlayer } from '@/lib/fetch'
import Flip from '@/ui/Flip'
import PlayerContainer from './PlayerContainer'
import UpNext from './UpNext'
import { cn } from '@/lib/utils'

export default function Matchup({ className }: React.ComponentProps<'div'>) {
	const { data } = useGameContext()
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
							<table className="text-center text-[x-small]/none opacity-50">
								<tbody>
									<tr className="text-[smaller]">
										<th>IP</th>
										<th>ER</th>
										<th>K</th>
										<th>BB</th>
									</tr>
									<tr className="tabular-nums *:px-[.5ch]">
										<td>{pitchingStats.inningsPitched}</td>
										<td>{pitchingStats.earnedRuns}</td>
										<td>{pitchingStats.strikeOuts}</td>
										<td>{pitchingStats.baseOnBalls}</td>
									</tr>
								</tbody>
							</table>
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
