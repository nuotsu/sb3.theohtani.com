'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import { LeaderboardProvider } from './context'
import Loading from '@/ui/Loading'
import BattingStats from './BattingStats'
import PitchingStats from './PitchingStats'
import { useEffect } from 'react'

function LeaderboardComponent() {
	const { group } = useStorage()

	switch (group) {
		case 'pitching':
			return <PitchingStats />

		default:
			return <BattingStats />
	}
}

export default function Leaderboard() {
	const { date, sportId, group, sortStat, setSortStat } = useStorage()
	const year = new Date(date).getFullYear()

	useEffect(() => {
		if (group === 'hitting') setSortStat('avg')
		if (group === 'pitching') setSortStat('era')
	}, [group])

	const { data, isLoading } = fetchMLBLive<MLB.Leaderboard>(
		`/api/v1/stats?sportId=${sportId}&stats=season&season=${year}&gameType=R&limit=${100}&group=${group}&sortStat=${sortStat}`,
	)

	if (isLoading) return <Loading>Loading leaderboard...</Loading>
	if (!data) return <div>No data</div>

	return (
		<LeaderboardProvider value={{ data }}>
			<LeaderboardComponent />
		</LeaderboardProvider>
	)
}
