'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import Loading from '@/ui/Loading'
import SeasonProgress from './SeasonProgress'
import Game from './Game'

export default function Schedule() {
	const { date } = useStorage()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`,
	)

	if (isLoading)
		return <Loading className="justify-center">Loading games...</Loading>

	if (!data || data.totalGames === 0)
		return <h2 className="text-center">No games</h2>

	return (
		<>
			<SeasonProgress data={data} />

			<div className="gap-lh grid md:grid-cols-2">
				{data.dates[0].games.map((game) => (
					<Game game={game} key={game.gamePk} />
				))}
			</div>
		</>
	)
}
