import { useGameContext } from '@/ui/game/context'
import { cn } from '@/lib/utils'

export default function PitchSequenceToggle() {
	const { game, isInterlude } = useGameContext()

	return (
		<>
			<input
				name="pitch-sequence"
				id={`pitch-sequence-${game.gamePk}`}
				type="checkbox"
				hidden
			/>

			<span
				className={cn(
					'absolute top-1/2 left-full -translate-y-1/2 pr-[.25ch] transition-transform',
					'group-hover/pitcher:blur-gradient-to-l group-has-[:checked]/pitcher:blur-gradient-to-l group-hover/pitcher:-translate-x-full md:group-has-[:checked]/pitcher:-translate-x-full',
					isInterlude && 'opacity-20',
				)}
			>
				<span className="inline-block group-has-[:checked]/pitcher:animate-spin">
					⚾
				</span>
			</span>
		</>
	)
}
