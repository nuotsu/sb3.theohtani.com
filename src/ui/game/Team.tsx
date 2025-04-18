import { useGameContext } from './store'
import Loading from '@/ui/Loading'
import getGameStatus from '@/lib/game-status'
import TeamColor from '@/ui/team/TeamColor'
import TeamLogo from '@/ui/team/TeamLogo'
import Flip from '@/ui/Flip'
import { cn } from '@/lib/utils'

export default function Team({ side }: { side: 'away' | 'home' }) {
	const { game, data } = useGameContext()
	const team = data?.gameData.teams[side]
	const { inningState } = data?.liveData.linescore ?? {}
	const { isPreview, isLive } = getGameStatus(game.status)

	const isOffense =
		isLive &&
		((inningState === 'Top' && side === 'away') ||
			(inningState === 'Bottom' && side === 'home'))

	return (
		<TeamColor
			team={team}
			className={cn(
				'relative flex items-center gap-x-[.5ch] overflow-hidden px-[.5ch]',
				isOffense && '',
				isPreview ? 'row-span-2' : 'col-span-2',
			)}
			key={team?.id}
		>
			{team ? (
				<>
					<TeamLogo
						className="size-lh object-cover"
						team={team}
						draggable={false}
					/>

					<div className="relative flex grow items-center gap-[inherit]">
						<h2 className="@max-lg:hidden">{team?.clubName}</h2>

						<abbr className="@lg:hidden" title={team?.name}>
							{team?.abbreviation}
						</abbr>

						{team?.record && (
							<small className="opacity-50">
								{team?.record.wins}-{team?.record.losses}
							</small>
						)}
					</div>

					{!isPreview && (
						<Flip
							className="text-right font-black tabular-nums"
							disable={!isLive}
						>
							{data?.liveData.linescore.teams[side].runs}
						</Flip>
					)}
				</>
			) : (
				<Loading />
			)}
		</TeamColor>
	)
}
