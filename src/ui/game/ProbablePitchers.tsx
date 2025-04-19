import { useGameContext } from './store'
import { useStorage } from '@/lib/store'
import checkHasNoSpoiler from '@/lib/no-spoiler'
import { fetchPlayer, getStats } from '@/lib/fetch'
import TeamColor from '@/ui/team/TeamColor'
import Headshot from '@/ui/Headshot'
import { cn } from '@/lib/utils'

export default function ProbablePitchers({
	className,
}: React.ComponentProps<'div'>) {
	const { data } = useGameContext()
	const { probablePitchers, teams } = data?.gameData ?? {}

	const { date } = useStorage()
	const year = new Date(date).getFullYear()

	return (
		<div className={cn('grid grid-cols-2', className)}>
			<ProbablePitcher
				player={probablePitchers?.away}
				team={teams?.away}
				year={year}
			/>
			<ProbablePitcher
				player={probablePitchers?.home}
				team={teams?.home}
				year={year}
			/>
		</div>
	)
}

function ProbablePitcher({
	player,
	team,
	year,
}: {
	player?: MLB.BasicPlayerData
	team?: MLB.Team
	year?: number
}) {
	const hasNoSpoiler = checkHasNoSpoiler()
	const { data: pitcher, isLoading } = fetchPlayer(player, 'pitching')

	if (isLoading || !pitcher) return <div />

	const stat = getStats(pitcher, year)?.stat as MLB.PitchingStats | null

	return (
		<div className="anim-fade-to-b relative px-[.5ch]">
			<TeamColor
				className="pointer-events-none absolute inset-0 -z-1 opacity-50"
				team={team}
			/>

			<div className="flex items-center gap-[.5ch]">
				<Headshot
					type="transparent"
					player={pitcher}
					className="size-lh self-start"
				/>
				<div className="flex flex-wrap items-center gap-x-[inherit]">
					<span className="line-clamp-1 break-all" title={pitcher.fullName}>
						{pitcher.lastName}
					</span>

					{stat && !hasNoSpoiler && (
						<small className="text-current/50 tabular-nums">
							({stat.wins}-{stat.losses}, {stat.era})
						</small>
					)}
				</div>
			</div>
		</div>
	)
}
