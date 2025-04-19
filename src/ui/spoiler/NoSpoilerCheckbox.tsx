'use client'

import { useLocalStorage } from '@/lib/store'
import { useGameContext } from '@/ui/game/context'

export default function NoSpoilerCheckboxes() {
	const { game } = useGameContext()

	return (
		<>
			<NoSpoilerCheckbox id={game.teams.away.team.id} />
			<NoSpoilerCheckbox id={game.teams.home.team.id} />
		</>
	)
}

function NoSpoilerCheckbox({ id }: { id?: number }) {
	const { noSpoilers, addNoSpoiler, removeNoSpoiler } = useLocalStorage()

	if (!id) return null

	return (
		<input
			name="no-spoiler"
			id={`no-spoiler-${id}`}
			type="checkbox"
			hidden
			checked={noSpoilers.includes(id)}
			onChange={() => {
				if (noSpoilers.includes(id)) {
					removeNoSpoiler(id)
				} else {
					addNoSpoiler(id)
				}
			}}
		/>
	)
}
