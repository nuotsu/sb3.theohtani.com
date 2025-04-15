import { VscTriangleUp } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import Flip from '@/ui/Flip'

export default function CurrentInning({
	data,
	className,
}: {
	data?: MLB.LiveData | null
} & React.ComponentProps<'div'>) {
	if (!data) return null

	const { currentInning, inningState } = data.liveData.linescore

	return (
		<div
			className={cn('m-auto flex items-center gap-0.5 text-center', className)}
		>
			{['Top', 'Bottom'].includes(inningState) && (
				<VscTriangleUp
					className={cn(
						'anim-fade -mr-0.5 text-xs',
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
