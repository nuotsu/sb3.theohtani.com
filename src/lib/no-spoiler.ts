import { useLocalStorage } from './store'

export default function checkNoSpoiler(game?: MLB.ScheduleGame) {
	const { noSpoilers } = useLocalStorage()

	if (!game) return false

	return [game.teams.away.team.id, game.teams.home.team.id].some(
		(id) => id && noSpoilers.includes(id),
	)
}
