'use client'

import { useStorage } from '@/lib/store'
import { cn } from '@/lib/utils'
import css from './SeasonProgress.module.css'

const MAX = 162

export default function SeasonProgress({ data }: { data: MLB.Schedule }) {
	const { games } = data.dates[0]

	const gameCounts = games
		.filter((game) => game.seriesDescription === 'Regular Season')
		.flatMap((game) => {
			const isFinal = game.status.abstractGameState === 'Final'
			const teams = Object.values(game.teams) as MLB.ScheduleTeam[]
			return teams.map(
				(team) =>
					team.leagueRecord.wins + team.leagueRecord.losses + (isFinal ? 0 : 1),
			)
		})

	if (gameCounts.length === 0) return null

	const { date, today } = useStorage()

	const current = Math.min(
		Math.round(gameCounts.reduce((a, b) => a + b, 0) / gameCounts.length),
		MAX,
	)

	return (
		<div className={cn(css.root, 'grid items-stretch gap-x-[.5ch] uppercase')}>
			<div
				className="mr-auto [grid-area:current]"
				style={{ marginLeft: `calc(100% * ${current / MAX})` }}
			>
				<div className="grid -translate-x-1/2 text-center">
					<small className="text-[xx-small]/1 font-bold">Game</small>
					<b
						className={cn(
							'anim-fade text-2xl/[1] [--x:-0.5ch]',
							date > today && css.future,
						)}
						key={current}
					>
						{current}
					</b>
				</div>
			</div>

			<div
				className={cn(
					css.progress,
					'relative flex flex-col justify-center [grid-area:progress]',
				)}
				style={
					{
						'--progress': `calc(100% * ${current / MAX})`,
					} as React.CSSProperties
				}
			/>

			<b className="text-lg/[1] [grid-area:first]">01</b>
			<b className="text-lg/[1] [grid-area:last]">{MAX}</b>
		</div>
	)
}
