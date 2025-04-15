import getGameStatus from '@/lib/game-status'
import TeamLogo, { getInvert, teamLogoUrl } from '@/ui/TeamLogo'
import Flip from '@/ui/Flip'
import { cn } from '@/lib/utils'

export default function Team({
	side,
	data,
	game,
}: {
	side: 'away' | 'home'
	data?: MLB.LiveData | null
	game: MLB.ScheduleGame
}) {
	const team = data?.gameData.teams[side]
	const { inningState } = data?.liveData.linescore ?? {}
	const { isPreview, isLive } = getGameStatus(game.status)

	const isOffense =
		isLive &&
		((inningState === 'Top' && side === 'away') ||
			(inningState === 'Bottom' && side === 'home'))

	const invert = getInvert(team)

	return (
		<div
			className={cn(
				'relative flex items-center gap-x-[.5ch] px-[.5ch]',
				invert && 'text-bg',
				isOffense && '',
				isPreview ? 'row-span-2' : 'col-span-2',
			)}
			style={{
				backgroundImage: `url(${teamLogoUrl(team)})`,
				backgroundSize: '9999% 800%',
				backgroundPosition: '50% 2%',
			}}
			key={team?.id}
		>
			<TeamLogo className="h-lh" team={team} draggable={false} />

			<div className="flex grow items-center gap-[inherit]">
				<h2 className="@max-lg:hidden">{team?.clubName || 'Loading...'}</h2>

				<abbr className="@lg:hidden" title={team?.name}>
					{team?.abbreviation || 'Loading...'}
				</abbr>

				{team?.record && (
					<small className="opacity-50">
						{team?.record.wins}-{team?.record.losses}
					</small>
				)}
			</div>

			{!isPreview && (
				<Flip className="text-right font-black tabular-nums" disable={!isLive}>
					{data?.liveData.linescore.teams[side].runs}
				</Flip>
			)}
		</div>
	)
}
