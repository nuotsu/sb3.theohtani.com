import { createContext, useContext } from 'react'
import checkNoSpoiler from '@/lib/no-spoiler'
import getGameStatus from '@/lib/game-status'

type Props = {
	// initial
	game: MLB.ScheduleGame
	data?: MLB.LiveData | null
} & Partial<
	// derived
	{
		hasNoSpoiler: boolean
	} & ReturnType<typeof getGameStatus>
>

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
	const { game, data } = value

	return (
		<GameContext.Provider
			value={{
				game,
				data,
				...getGameStatus(game.status),
				hasNoSpoiler: checkNoSpoiler(game),
			}}
			children={children}
		/>
	)
}

export function useGameContext() {
	return useContext(GameContext)
}
