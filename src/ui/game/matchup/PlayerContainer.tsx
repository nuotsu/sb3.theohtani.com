import { cn } from '@/lib/utils'
import Headshot from '@/ui/Headshot'

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
				type="colored"
				player={player}
				className="anim-fade-to-t h-full"
				size={96}
			/>

			<div
				className="flex grow items-center gap-x-[inherit]"
				title={player.fullName}
			>
				<span className="line-clamp-1">{player?.lastName}</span>
			</div>

			<div className="flex items-center gap-x-[inherit]">{children}</div>
		</div>
	)
}
