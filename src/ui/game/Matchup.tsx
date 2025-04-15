import { fetchPlayer } from '@/lib/fetch'
import Flip from '@/ui/Flip'
import Headshot from '@/ui/Headshot'
import { cn } from '@/lib/utils'

export default function Matchup({
	data,
	className,
}: { data?: MLB.LiveData | null } & React.ComponentProps<'div'>) {
	const { defense, offense, inningState, inningHalf } =
		data?.liveData.linescore ?? {}
	const { teams } = data?.liveData.boxscore ?? {}

	const interlude = ['Middle', 'End'].includes(inningState ?? '')

	const [{ data: pitcher }, { data: batter }] = [
		fetchPlayer(defense?.pitcher),
		fetchPlayer(offense?.batter),
	]

	const pitchingStats = (
		teams?.[inningHalf === 'Top' ? 'home' : 'away'].players[
			`ID${pitcher?.id}`
		] as MLB.BoxScoreTeamPlayer
	)?.stats?.pitching

	const battingStats = (
		teams?.[inningHalf === 'Top' ? 'away' : 'home'].players[
			`ID${batter?.id}`
		] as MLB.BoxScoreTeamPlayer
	)?.stats?.batting

	return (
		<div
			className={cn(
				'relative h-[2lh] grow transition-colors',
				interlude && 'text-subdued [&_img]:opacity-20',
				className,
			)}
		>
			<PlayerContainer player={pitcher} key={pitcher?.id}>
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

			<PlayerContainer player={batter} key={batter?.id}>
				{battingStats && (
					<>
						<small className="line-clamp-1 opacity-50">
							{battingStats.summary.split(' | ')[1]}
						</small>
						<span>
							{battingStats.hits}
							<small> for </small>
							{battingStats.atBats}
						</span>
					</>
				)}
			</PlayerContainer>
		</div>
	)
}

function PlayerContainer({
	player,
	children,
}: {
	player?: MLB.Player | null
} & React.ComponentProps<'div'>) {
	if (!player) return null

	return (
		<div
			className={cn(
				'h-lh border-subdued/50 anim-fade relative flex gap-x-[.5ch] overflow-hidden border-b px-[.5ch]',
			)}
		>
			<Headshot player={player} className="anim-fade-to-t h-full" size={96} />

			<div
				className="flex grow items-center gap-x-[inherit]"
				title={player.fullName}
			>
				{player?.lastName}

				<small className="opacity-50">#{player.primaryNumber}</small>
			</div>

			<div className="flex items-center gap-x-[inherit]">{children}</div>
		</div>
	)
}
