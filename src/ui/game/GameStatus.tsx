import { useGameContext } from './store'
import getGameStatus from '@/lib/game-status'
import checkHasNoSpoiler from '@/lib/no-spoiler'
import { VscCircleSlash } from 'react-icons/vsc'

export default function GameStatus() {
	const { game } = useGameContext()
	const { isPreview, isFinal, isCancelled } = getGameStatus()
	const hasNoSpoiler = checkHasNoSpoiler()

	const { reason, detailedState } = game.status

	const EndState =
		(reason === 'Inclement Weather' && (
			<span className="break-all">Weather</span>
		)) ||
		reason ||
		(detailedState === 'Cancelled' && (
			<VscCircleSlash className="text-2xl" title={detailedState} />
		)) ||
		(detailedState === 'Completed Early' && 'Compl. early') ||
		detailedState

	return (
		<span className="relative col-span-full row-span-full m-auto w-[2.25rem] text-center text-[x-small] font-bold uppercase">
			{(isFinal || isCancelled) && !hasNoSpoiler && EndState}

			{(isPreview || hasNoSpoiler) && (
				<time dateTime={game.gameDate}>
					{new Date(game.gameDate).toLocaleTimeString('en-US', {
						hour: 'numeric',
						minute: '2-digit',
					})}
				</time>
			)}
		</span>
	)
}
