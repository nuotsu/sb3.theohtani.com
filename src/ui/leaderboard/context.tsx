import { createContext, useContext } from 'react'

type Props = {
	// initial
	data?: MLB.Leaderboard | null
}

const LeaderboardContext = createContext<Props>({
	data: null,
})

export function LeaderboardProvider({
	value,
	children,
}: {
	value: Props
	children: React.ReactNode
}) {
	return <LeaderboardContext.Provider value={value} children={children} />
}

export function useLeaderboardContext() {
	return useContext(LeaderboardContext)
}
