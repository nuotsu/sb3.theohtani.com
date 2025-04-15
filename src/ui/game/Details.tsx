'use client'

import { fetchPlayer } from '@/lib/fetch'
import Headshot from '../Headshot'

export default function Details({ data }: { data?: MLB.LiveData | null }) {
	const { plays, linescore } = data?.liveData ?? {}
	const currentPlay = plays?.currentPlay.result.description

	const { battingOrder = 1, onDeck, inHole } = linescore?.offense ?? {}

	const nextBattingOrder = battingOrder + 1 > 9 ? 1 : battingOrder + 1

	return (
		<div className="h-[2lh]">
			<div className="h-lh">
				{currentPlay && (
					// @ts-ignore
					<marquee
						className="overflow-fade"
						title={currentPlay}
						children={currentPlay}
					/>
				)}
			</div>

			<ol
				className="gap-ch flex snap-x snap-mandatory overflow-x-auto whitespace-nowrap"
				start={nextBattingOrder}
			>
				<NextBatter label="On deck" player={onDeck} />
				<NextBatter label="In hole" player={inHole} />
			</ol>
		</div>
	)
}

function NextBatter({
	label,
	player,
}: {
	label: string
	player?: MLB.BasicPlayerData
}) {
	const { data, isLoading } = fetchPlayer(player)

	if (!player || isLoading) return null

	return (
		<li
			className="inline-flex shrink-0 snap-start items-center gap-[.5ch]"
			title={player?.fullName}
			key={player.id}
		>
			<small className="opacity-50">{label}:</small>
			<Headshot player={data} className="anim-fade-to-t h-lh" size={96} />
			<span className="anim-fade">{data?.lastName}</span>
		</li>
	)
}
