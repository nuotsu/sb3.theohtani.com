'use client'

import { useGameContext } from './context'
import { useStorage } from '@/lib/store'
import { fetchPlayer, getStats } from '@/lib/fetch'
import PlayerContainer from './matchup/PlayerContainer'
import PitchingStats, { getPitchingStats } from './matchup/PitchingStats'
import { cn } from '@/lib/utils'

export default function Decisions({ className }: React.ComponentProps<'div'>) {
	const { data } = useGameContext()
	const { decisions } = data?.liveData ?? {}

	const { date } = useStorage()
	const year = new Date(date).getFullYear()

	const [{ data: winner, isLoading }, { data: save }, { data: loser }] = [
		fetchPlayer(decisions?.winner, 'pitching'),
		fetchPlayer(decisions?.save, 'pitching'),
		fetchPlayer(decisions?.loser, 'pitching'),
	]

	if (isLoading) return null

	const [winnerStats, saveStats, loserStats] = [
		winner && (getStats(winner, year)?.stat as MLB.PitchingStats),
		save && (getStats(save, year)?.stat as MLB.PitchingStats),
		loser && (getStats(loser, year)?.stat as MLB.PitchingStats),
	]

	const winningPitcherIsHomeTeam =
		data?.liveData.boxscore.teams.home.pitchers.includes(winner?.id!)

	return (
		<div
			className={cn(
				'gap-x-lh border-subdued/50 flex flex-wrap border-b @max-md:flex-col',
				className,
			)}
		>
			<PlayerContainer
				className="relative"
				player={winner}
				subText={
					<>
						{winnerStats && (
							<>
								({winnerStats.wins}-{winnerStats.losses}, {winnerStats.era})
							</>
						)}
					</>
				}
			>
				<PitchingStats
					stats={getPitchingStats(winner, data, winningPitcherIsHomeTeam)}
				/>
				<Label className="bg-green-700">W</Label>
			</PlayerContainer>

			<PlayerContainer
				className="relative mr-auto @max-md:order-last"
				player={save}
				subText={
					saveStats && (
						<>
							{saveStats.saves}
							<span className="text-[xx-small]"> SV</span>
						</>
					)
				}
			>
				<Label className="bg-blue-700">SV</Label>
			</PlayerContainer>

			<PlayerContainer
				className="relative"
				player={loser}
				subText={
					loserStats && (
						<>
							({loserStats.wins}-{loserStats.losses}, {loserStats.era})
						</>
					)
				}
			>
				<PitchingStats
					stats={getPitchingStats(loser, data, !winningPitcherIsHomeTeam)}
				/>
				<Label className="bg-red-700">L</Label>
			</PlayerContainer>
		</div>
	)
}

function Label({ className, children }: React.ComponentProps<'b'>) {
	return (
		<b
			className={cn(
				'absolute bottom-0 left-0 grid size-[1lh] place-content-center text-[6px]',
				className,
			)}
		>
			{children}
		</b>
	)
}
