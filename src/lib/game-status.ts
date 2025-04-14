export default function getGameStatus(game: MLB.ScheduleGame) {
	if (!game) return {}

	const { statusCode } = game.status

	return {
		isPreview: ['S', 'W', 'P'].includes(statusCode),
		isLive: ['I'].includes(statusCode),
		isFinal: ['O', 'F'].includes(statusCode),
	}
}
