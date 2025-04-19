import { useGameContext } from './context'
import { VscTriangleUp } from 'react-icons/vsc'
import Flip from '@/ui/Flip'
import { cn } from '@/lib/utils'

export default function CurrentInning({
	className,
}: React.ComponentProps<'div'>) {
	const { data } = useGameContext()

	if (!data) return null

	const { currentInning, inningState = '' } = data?.liveData.linescore ?? {}
	const isActive = ['Top', 'Bottom'].includes(inningState)

	return (
		<div
			className={cn(
				'm-auto flex items-center gap-0.5 text-center',
				isActive ? 'row-[2/-1]' : 'row-span-full',
				className,
			)}
		>
			{isActive && (
				<VscTriangleUp
					className={cn(
						'anim-fade -mr-0.5 text-xs text-yellow-400',
						inningState === 'Bottom' && 'rotate-180',
					)}
				/>
			)}

			{inningState === 'Middle' && (
				<b className="anim-fade text-[xx-small] uppercase">Mid</b>
			)}
			{inningState === 'End' && (
				<b className="anim-fade text-[xx-small] uppercase">End</b>
			)}

			<Flip className="font-bold">{currentInning}</Flip>
		</div>
	)
}
