import { useGameContext } from './context'
import Headshot from '@/ui/Headshot'
import { fetchPlayer } from '@/lib/fetch'
import { cn } from '@/lib/utils'

export default function TopPerformers({
	className,
}: React.ComponentProps<'dl'>) {
	const { data } = useGameContext()
	const { topPerformers } = data?.liveData.boxscore ?? {}

	return (
		<dl
			className={cn(
				'anim-fade-to-b gap-lh flex justify-center pt-[.5ch] text-center [body:not(:has(#show-top-performers:checked))_&]:hidden',
				className,
			)}
		>
			{topPerformers?.map((performer) => (
				<Performer performer={performer} key={performer.player.person.id} />
			))}
		</dl>
	)
}

function Performer({
	performer,
}: {
	performer: MLB.TopPerformerHitter | MLB.TopPerformerStarter
}) {
	if (!performer) return null

	const { player, type } = performer
	const { data } = fetchPlayer(performer.player.person)

	return (
		<div>
			<dt>
				<Headshot
					className="mx-auto size-[1.5lh] object-cover"
					player={player.person as MLB.Player}
				/>
				<span className="line-clamp-1">{data?.lastName}</span>
			</dt>

			<dd className="text-xs/tight text-current/50">
				{type === 'starter'
					? player.stats.pitching.summary
					: player.stats.batting.summary}
			</dd>
		</div>
	)
}
