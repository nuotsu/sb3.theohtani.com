import { useStorage } from '@/lib/store'
import { useGameContext } from '@/ui/game/context'
import { getStats } from '@/lib/fetch'
import PitchingStats, { getPitchingStats } from './PitchingStats'
import PlayerContainer from './PlayerContainer'
import Flip from '@/ui/Flip'
import PitchSequenceToggle from '@/ui/game/pitch/PitchSequenceToggle'

export default function CurrentPitcher({
	player,
}: {
	player: MLB.Player | null
}) {
	const { date } = useStorage()
	const { data } = useGameContext()

	const { inningHalf } = data?.liveData.linescore ?? {}
	const gameStats = getPitchingStats(player, data, inningHalf === 'Top')

	const year = new Date(date).getFullYear()
	const seasonStats = getStats(player, year)?.stat as MLB.PitchingStats | null

	return (
		<PlayerContainer
			as="label"
			htmlFor="pitch-sequence"
			className="border-subdued/50 group/pitcher border-b"
			player={player}
			subText={
				seasonStats && (
					<>
						({seasonStats.wins}-{seasonStats.losses}, {seasonStats.era})
					</>
				)
			}
			key={player?.id}
		>
			{gameStats && (
				<>
					{gameStats.summary !== '0.0 IP, 0 ER, 0 K, 0 BB' && (
						<PitchingStats stats={gameStats} />
					)}

					<NumberOfPitches value={gameStats.numberOfPitches} />
				</>
			)}

			<PitchSequenceToggle />
		</PlayerContainer>
	)
}

export function NumberOfPitches({
	label = 'P:',
	value,
}: {
	label?: string
	value: number
}) {
	if (isNaN(value)) return null

	return (
		<span className="flex shrink-0 items-baseline tabular-nums">
			{label && <small>{label}</small>}
			<Flip>{value}</Flip>
		</span>
	)
}
