import { useGameContext } from './store'
import getGameStatus from '@/lib/game-status'
import Loading from '@/ui/Loading'
import TeamColor from '@/ui/team/TeamColor'
import TeamLogo from '@/ui/team/TeamLogo'
import Flip from '@/ui/Flip'
import { cn } from '@/lib/utils'

export default function Team({ side }: { side: 'away' | 'home' }) {
	const { data, hasNoSpoiler } = useGameContext()
	const { isPreview, isLive } = getGameStatus()

	const team = data?.gameData.teams[side]

	return (
		<TeamColor
			team={team}
			className={cn(
				'relative flex items-center gap-x-[.5ch] overflow-hidden px-[.5ch]',
				isPreview || hasNoSpoiler ? 'row-span-2' : 'col-span-2',
			)}
			key={team?.id}
		>
			{!team ? (
				<Loading />
			) : (
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
							<small className="no-spoiler:hidden text-current/50">
								{team?.record.wins}-{team?.record.losses}
							</small>
						)}
					</div>

					{!isPreview && (
						<Flip
							className="no-spoiler:hidden text-right font-black tabular-nums"
							disable={!isLive}
						>
							{data?.liveData.linescore.teams[side].runs}
						</Flip>
					)}
				</>
			)}
		</TeamColor>
	)
}
