import { useGameContext } from '@/ui/game/store'
import { useEffect, useRef } from 'react'
import { fetchPlayer } from '@/lib/fetch'
import PlayerContainer from './PlayerContainer'
import Headshot from '@/ui/Headshot'
import { cn } from '@/lib/utils'

export default function UpNext() {
	const { data } = useGameContext()

	const ref = useRef<HTMLDivElement>(null)

	const { offense, inningHalf } = data?.liveData.linescore ?? {}
	const { teams } = data?.liveData.boxscore ?? {}

	const [batter, onDeck, inHole] = [
		fetchPlayer(offense?.batter),
		fetchPlayer(offense?.onDeck),
		fetchPlayer(offense?.inHole),
	].map((player) => player.data)

	const battingStats = (
		teams?.[inningHalf === 'Top' ? 'away' : 'home'].players[
			`ID${batter?.id}`
		] as MLB.BoxScoreTeamPlayer
	)?.stats?.batting

	useEffect(() => {
		if (!ref.current) return
		ref.current.scrollTo({ left: 0, behavior: 'smooth' })
	}, [offense?.battingOrder])

	return (
		<div
			ref={ref}
			className={cn(
				'no-scrollbar border-subdued/50 grid snap-x snap-mandatory auto-cols-[100%] [grid-auto-flow:column] overflow-x-auto border-b [--offset:4ch]! *:snap-start',
				'[&>*:not(:last-child):hover+*_img]:-translate-x-lh [&>*:not(:last-child):hover+*]:pointer-events-none',
			)}
		>
			<PlayerContainer player={batter} key={batter?.id}>
				{battingStats && (
					<>
						<small className="line-clamp-1 text-[x-small] opacity-50">
							{battingStats.summary.split(' | ')[1]}
						</small>
						<span className="flex items-baseline gap-x-[.2ch]">
							{battingStats.hits}
							<small> for </small>
							{battingStats.atBats}
						</span>
					</>
				)}
			</PlayerContainer>

			<NextBatter label="On deck" player={onDeck} />
			<NextBatter label="In hole" player={inHole} />
		</div>
	)
}

export function NextBatter({
	label,
	player,
}: {
	label: string
	player?: MLB.Player | null
}) {
	if (!player) return null

	return (
		<div
			className="flex snap-always items-center gap-[.5ch] px-[.5ch]"
			title={player?.fullName}
			key={player.id}
		>
			<Headshot player={player} className="h-lh transition-transform" />
			<span>{player?.lastName}</span>
			<small className="opacity-50">{label}</small>
		</div>
	)
}
