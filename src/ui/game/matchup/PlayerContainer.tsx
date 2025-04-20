import Headshot from '@/ui/Headshot'
import { cn } from '@/lib/utils'

export default function PlayerContainer<T extends React.ElementType = 'div'>({
	as = 'div' as T,
	player,
	className,
	children,
	subText: subText,
}: {
	as?: T
	player?: MLB.Player | null
	subText?: React.ReactNode
} & Omit<React.ComponentProps<T>, 'as' | 'player'>) {
	if (!player) return null

	const Tag = as as React.ElementType

	return (
		<Tag
			className={cn(
				'h-lh anim-fade flex gap-x-[.5ch] overflow-hidden px-[.5ch]',
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

				{subText && (
					<small className="line-clamp-1 text-current/50 tabular-nums lg:max-xl:hidden [@media(width>=30rem)]:max-sm:hidden">
						{subText}
					</small>
				)}
			</div>

			{children && (
				<div className="flex items-center gap-x-[inherit]">{children}</div>
			)}
		</Tag>
	)
}
