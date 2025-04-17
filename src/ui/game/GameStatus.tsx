import getGameStatus from '@/lib/game-status'
import { VscCircleSlash } from 'react-icons/vsc'

export default function GameStatus({ game }: { game: MLB.ScheduleGame }) {
	const { isPreview, isFinal, isCancelled } = getGameStatus(game.status)

	const EndState =
		game.status.reason ||
		(game.status.detailedState === 'Cancelled' && (
			<VscCircleSlash className="text-2xl" title={game.status.detailedState} />
		)) ||
		game.status.detailedState

	return (
		<span className="relative col-span-full row-span-full m-auto text-center text-[x-small] font-bold uppercase">
			{(isFinal || isCancelled) && EndState}

			{isPreview && (
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
