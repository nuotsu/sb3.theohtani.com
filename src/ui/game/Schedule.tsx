'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import SeasonProgress from './SeasonProgress'
import Game from './Game'

export default function Schedule() {
	const { date } = useStorage()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`,
	)

	if (isLoading)
		return (
			<section className="text-center">
				<h2>Loading games...</h2>
			</section>
		)

	if (!data || data.totalGames === 0)
		return (
			<section className="text-center">
				<h2>No games</h2>
			</section>
		)

	return (
		<section className="gap-ch grid">
			<SeasonProgress data={data} />

			<div className="gap-x-lh grid md:grid-cols-2">
				{data.dates[0].games.map((game) => (
					<Game game={game} key={game.gamePk} />
				))}
			</div>
		</section>
	)
}
