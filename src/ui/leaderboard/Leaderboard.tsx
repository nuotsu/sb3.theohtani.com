'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import { LeaderboardProvider } from './context'
import Loading from '@/ui/Loading'
import BattingStats from './BattingStats'

function LeaderboardComponent() {
	return <BattingStats />
}

export default function Leaderboard() {
	const { date, sportId, sortStat } = useStorage()
	const year = new Date(date).getFullYear()

	const { data, isLoading } = fetchMLBLive<MLB.Leaderboard>(
		`/api/v1/stats?sportId=${sportId}&stats=season&season=${year}&gameType=R&limit=${100}&group=${'hitting'}&sortStat=${sortStat}`,
	)

	if (isLoading) return <Loading>Loading leaderboard...</Loading>
	if (!data) return <div>No data</div>

	return (
		<LeaderboardProvider value={{ data }}>
			<LeaderboardComponent />
		</LeaderboardProvider>
	)
}
