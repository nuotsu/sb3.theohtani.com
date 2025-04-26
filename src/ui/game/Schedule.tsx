'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import getGameStatus from '@/lib/game-status'
import Loading from '@/ui/Loading'
import SeasonProgress from './SeasonProgress'
import Game from './Game'
import { cn } from '@/lib/utils'

export default function Schedule() {
	const { sportId, date } = useStorage()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=${sportId}&startDate=${date}&endDate=${date}`,
	)

	if (isLoading)
		return <Loading className="justify-center">Loading games...</Loading>

	if (!data || data.totalGames === 0)
		return <h2 className="text-center">No games</h2>

	const { games } = data.dates[0]

	const [liveGames, previewGames, finalGames] = [
		games.filter(({ status }) => getGameStatus(status).isLive),
		games.filter(({ status }) => getGameStatus(status).isPreview),
		games.filter(
			({ status }) =>
				getGameStatus(status).isFinal || getGameStatus(status).isCancelled,
		),
	]

	return (
		<>
			<SeasonProgress data={data} />

			<Group games={liveGames} />
			<Group
				label={!!(liveGames.length + finalGames.length) && 'Scheduled'}
				games={previewGames}
			/>
			<Group
				label={!!(liveGames.length + previewGames.length) && 'Final'}
				games={finalGames}
			/>
		</>
	)
}

function Group({
	label,
	games,
}: {
	label?: string | false
	games: MLB.ScheduleGame[]
}) {
	if (!games.length) return null

	return (
		<div className="[&+&]:mt-ch">
			{label && (
				<h2 className="blur-gradient-to-b sticky top-0 z-1">
					<small
						className={cn(
							'gap-ch flex font-bold text-current/25 uppercase',
							'before:my-auto before:grow before:border-b before:border-dashed',
							'after:my-auto after:grow after:border-b after:border-dashed',
						)}
					>
						{label}
					</small>
				</h2>
			)}

			<div className="gap-lh grid items-start md:grid-cols-2">
				{games.map((game) => (
					<Game game={game} key={game.gamePk} />
				))}
			</div>
		</div>
	)
}
