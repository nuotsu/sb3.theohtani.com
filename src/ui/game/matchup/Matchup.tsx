import { useGameContext } from '@/ui/game/context'
import { fetchPlayer } from '@/lib/fetch'
import CurrentPitcher from './CurrentPitcher'
import UpNext from './UpNext'
import { cn } from '@/lib/utils'

export default function Matchup({ className }: React.ComponentProps<'div'>) {
	const { data, isInterlude } = useGameContext()
	const { defense } = data?.liveData.linescore ?? {}

	const { data: pitcher } = fetchPlayer(defense?.pitcher, 'pitching')

	return (
		<div
			className={cn(
				'h-[2lh] grow transition-colors',
				isInterlude && 'text-subdued [&_img]:opacity-20',
				className,
			)}
		>
			<CurrentPitcher player={pitcher} />
			<UpNext />
		</div>
	)
}
