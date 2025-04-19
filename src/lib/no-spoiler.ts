import { useGameContext } from '@/ui/game/store'
import { useLocalStorage } from './store'

export default function checkHasNoSpoiler() {
	const { game } = useGameContext()
	const { noSpoilers } = useLocalStorage()

	return [game.teams.away.team.id, game.teams.home.team.id].some(
		(id) => id && noSpoilers.includes(id),
	)
}
