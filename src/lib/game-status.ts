import { useGameContext } from '@/ui/game/store'

export default function getGameStatus(overrideStatus?: MLB.GameStatus) {
	const { game } = useGameContext()

	const status = overrideStatus ?? game.status

	if (!status?.codedGameState) return {}

	const { codedGameState } = status

	return {
		isPreview: ['S', 'W', 'P'].includes(codedGameState),
		isLive: ['I', 'U', 'M'].includes(codedGameState),
		isFinal: ['O', 'F'].includes(codedGameState),
		isCancelled: ['D', 'C'].includes(codedGameState),
	}
}
