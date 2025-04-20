import { useStorage } from '@/lib/store'
import { useGameContext } from '@/ui/game/context'
import { useEffect, useRef } from 'react'
import { fetchPlayer, getStats } from '@/lib/fetch'
import PlayerContainer from './PlayerContainer'
import Headshot from '@/ui/Headshot'
import { cn } from '@/lib/utils'

export default function UpNext() {
	const { date } = useStorage()
	const { data } = useGameContext()

	const ref = useRef<HTMLDivElement>(null)

	const { offense, inningHalf } = data?.liveData.linescore ?? {}
	const { teams } = data?.liveData.boxscore ?? {}

	const [batter, onDeck, inHole] = [
		fetchPlayer(offense?.batter, 'hitting'),
		fetchPlayer(offense?.onDeck, 'hitting'),
		fetchPlayer(offense?.inHole, 'hitting'),
	].map((player) => player.data)

	const gameStats = (
		teams?.[inningHalf === 'Top' ? 'away' : 'home'].players[
			`ID${batter?.id}`
		] as MLB.BoxScoreTeamPlayer
	)?.stats?.batting

	const year = new Date(date).getFullYear()
	const seasonStats = getStats(batter, year)?.stat as MLB.BattingStats | null

	useEffect(() => {
		if (!ref.current) return
		ref.current.scrollTo({ left: 0, behavior: 'smooth' })
	}, [offense?.battingOrder])

	return (
		<div
			ref={ref}
			className={cn(
				'no-scrollbar border-subdued/50 grid snap-x snap-mandatory auto-cols-[100%] [grid-auto-flow:column] overflow-x-auto border-b [--offset:4ch]!',
				'[&>*:not(:last-child):hover+*_figure]:-translate-x-lh [&>*:not(:last-child):hover+*]:pointer-events-none',
			)}
		>
			<PlayerContainer
				className="snap-start"
				player={batter}
				subText={seasonStats?.avg}
				key={batter?.id}
			>
				{gameStats && (
					<>
						<small className="line-clamp-1 text-[x-small] text-current/50">
							{gameStats.summary.split(' | ')[1]}
						</small>

						<span className="flex items-baseline gap-x-[.2ch]">
							{gameStats.hits}
							<small> for </small>
							{gameStats.atBats}
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
			className="flex snap-start snap-always items-center gap-[.5ch] px-[.5ch]"
			title={player?.fullName}
			key={player.id}
		>
			<figure className="blur-gradient-to-l transition-transform">
				<Headshot player={player} className="h-lh" />
			</figure>
			<span>{player?.lastName}</span>
			<small className="text-current/50">{label}</small>
		</div>
	)
}
