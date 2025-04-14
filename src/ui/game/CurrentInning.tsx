import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

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
			{inningState === 'Top' && <VscTriangleUp className="text-[x-small]" />}
			{inningState === 'Bottom' && (
				<VscTriangleDown className="text-[x-small]" />
			)}

			{inningState === 'Middle' && (
				<span className="text-[xx-small] uppercase">Mid</span>
			)}
			{inningState === 'End' && (
				<small className="text-[xx-small] uppercase">End</small>
			)}

			{currentInning}
		</div>
	)
}
