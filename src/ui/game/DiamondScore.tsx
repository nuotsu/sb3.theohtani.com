import getGameStatus from '@/lib/game-status'
import BaseRunners from './BaseRunners'
import CurrentInning from './CurrentInning'
import TeamLogo, { teamLogoUrl } from '@/ui/TeamLogo'
import { cn } from '@/lib/utils'

export default function DiamondScore({
	data,
	game,
}: {
	data?: MLB.LiveData | null
	game: MLB.ScheduleGame
}) {
	const { isPreview, isLive, isFinal } = getGameStatus(game)

	return (
		<header className="grid grid-cols-[auto_1fr] grid-rows-2">
			<div className="row-span-full grid w-12 grid-rows-2 pr-1 pl-2">
				<BaseRunners
					className={cn(
						'col-span-full row-span-full m-auto',
						!isLive && 'text-subdued [&_.base]:bg-bg',
					)}
					data={data}
				/>

				{isLive && (
					<CurrentInning
						className="relative col-span-full row-[2/-1]"
						data={data}
					/>
				)}

				{(isFinal || isPreview) && (
					<span className="relative col-span-full row-span-full m-auto text-center text-[x-small] font-bold uppercase">
						{isFinal && game.status.detailedState}
						{isPreview && (
							<time dateTime={game.gameDate}>
								{new Date(game.gameDate).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: '2-digit',
								})}
							</time>
						)}
					</span>
				)}
			</div>

			<Team data={data} isLive={isLive} side="away" />
			<Team data={data} isLive={isLive} side="home" />
		</header>
	)
}

function Team({
	side,
	data,
	isLive,
}: {
	side: 'away' | 'home'
	data?: MLB.LiveData | null
	isLive?: boolean
}) {
	const team = data?.gameData.teams[side]
	const { inningState } = data?.liveData.linescore ?? {}

	const isOffense =
		isLive &&
		((inningState === 'Top' && side === 'away') ||
			(inningState === 'Bottom' && side === 'home'))

	return (
		<div
			className={cn(
				'flex items-center gap-x-[.5ch] p-px px-[.5ch]',
				team?.clubName === 'Padres' && 'text-bg',
				isOffense && 'ring ring-current/20 ring-inset',
			)}
			style={{
				backgroundImage: `url(${teamLogoUrl(team)})`,
				backgroundSize: '9999% 800%',
				backgroundPosition: '50% 2%',
			}}
			key={team?.id}
		>
			<TeamLogo className="h-[1lh]" team={team} draggable={false} />

			<h2 className="@max-lg:hidden">{team?.clubName || 'TBD'}</h2>

			<abbr className="@lg:hidden" title={team?.name}>
				{team?.abbreviation || 'TBD'}
			</abbr>

			<small className="tabular-nums opacity-50">
				{team?.record.wins}-{team?.record.losses}
			</small>

			<strong className="ml-auto text-right tabular-nums">
				{data?.liveData.linescore.teams[side].runs}
			</strong>
		</div>
	)
}
