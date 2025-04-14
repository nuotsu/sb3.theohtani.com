export default function getGameStatus(status?: MLB.GameStatus) {
	if (!status?.codedGameState) return {}

	const { codedGameState } = status

	return {
		isPreview: ['S', 'W', 'P'].includes(codedGameState),
		isLive: ['I'].includes(codedGameState),
		isFinal: ['D', 'O', 'F'].includes(codedGameState),
		isCancelled: ['C'].includes(codedGameState),
	}
}
