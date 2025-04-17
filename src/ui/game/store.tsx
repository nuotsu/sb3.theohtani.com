import { createContext, useContext } from 'react'

type Props = {
	game: MLB.ScheduleGame
	data?: MLB.LiveData | null
}

const GameContext = createContext<Props>({
	game: {} as MLB.ScheduleGame,
	data: null,
})

export function GameProvider({
	value,
	children,
}: {
	value: Props
	children: React.ReactNode
}) {
	return <GameContext.Provider value={value} children={children} />
}

export function useGameContext() {
	return useContext(GameContext)
}
