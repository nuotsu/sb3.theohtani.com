import { useGameContext } from './context'
import { cn } from '@/lib/utils'

export default function BSO({ className }: React.ComponentProps<'div'>) {
	const { data, isInterlude } = useGameContext()
	const { balls, strikes, outs } = data?.liveData.linescore ?? {}

	return (
		<div className={cn('leading-none', className)}>
			<dl
				className={cn(
					'grid grid-cols-[auto_1fr] items-center gap-0.5 transition-colors *:text-[x-small] [&_dt]:text-center',
					isInterlude && 'text-subdued',
				)}
			>
				<dt>B</dt>
				<dd>
					<Indicators
						className="text-green-500"
						current={isInterlude ? 0 : balls}
						max={3}
					/>
				</dd>
				<dt>S</dt>
				<dd>
					<Indicators
						className="text-yellow-300"
						current={isInterlude ? 0 : strikes}
					/>
				</dd>
				<dt>O</dt>
				<dd>
					<Indicators
						className="text-red-500"
						current={isInterlude ? 0 : outs}
					/>
				</dd>
			</dl>
		</div>
	)
}

function Indicators({
	current = 0,
	max = 2,
	className,
}: { current?: number; max?: number } & React.ComponentProps<'div'>) {
	return (
		<div className={cn('flex gap-0.5', className)}>
			{Array.from({ length: max }).map((_, i) => (
				<div
					className={cn(
						'relative size-2 overflow-hidden rounded-full transition-colors',
						'before:from-subdued before:via-subdued/30 before:to-subdued/30 before:absolute before:inset-0 before:-z-1 before:bg-linear-to-t',
						current > i && 'bg-current',
					)}
					key={i}
				/>
			))}
		</div>
	)
}
