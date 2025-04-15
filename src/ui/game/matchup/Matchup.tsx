import { fetchPlayer } from '@/lib/fetch'
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
				'relative grow transition-colors',
				interlude && 'text-subdued [&_img]:opacity-20',
				className,
			)}
		>
			<PlayerContainer player={pitcher} key={pitcher?.id}>
				{pitchingStats && (
					<div className="flex items-center gap-x-[inherit]">
						<small className="line-clamp-1 opacity-50">
							{pitchingStats.summary}
						</small>
						P:{pitchingStats.numberOfPitches}
					</div>
				)}
			</PlayerContainer>

			<PlayerContainer player={batter} key={batter?.id}>
				{battingStats && (
					<div className="flex items-center gap-[inherit]">
						<small className="line-clamp-1 opacity-50">
							{battingStats.summary.split(' | ')[1]}
						</small>
						<span>
							{battingStats.hits} <small>for</small> {battingStats.atBats}
						</span>
					</div>
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
			className={cn('h-lh anim-fade-to-r relative flex gap-x-[.5ch] px-[.5ch]')}
			title={player.fullName}
		>
			<Headshot className="size-lh" player={player} size={96} />

			<div className="flex grow items-center gap-x-[inherit]">
				{player?.lastName}

				<small className="opacity-50">#{player.primaryNumber}</small>
			</div>

			{children}
		</div>
	)
}
