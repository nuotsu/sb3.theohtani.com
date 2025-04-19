import Headshot from '@/ui/Headshot'
import { cn } from '@/lib/utils'

export default function PlayerContainer({
	player,
	className,
	children,
}: {
	player?: MLB.Player | null
} & React.ComponentProps<'div'>) {
	if (!player) return null

	return (
		<div
			className={cn(
				'h-lh anim-fade relative flex gap-x-[.5ch] overflow-hidden px-[.5ch]',
				className,
			)}
		>
			<Headshot
				player={player}
				className="anim-fade-to-t size-lh object-contain"
			/>

			<div
				className="player-name flex grow items-center gap-x-[inherit]"
				title={player.fullName}
			>
				<span className="line-clamp-1 break-all">{player?.lastName}</span>
			</div>

			<div className="flex items-center gap-x-[inherit]">{children}</div>
		</div>
	)
}
