import { cn } from '@/lib/utils'

export default function BSO({
	data,
	className,
}: { data?: MLB.LiveData | null } & React.ComponentProps<'div'>) {
	const { balls, strikes, outs } = data?.liveData.linescore ?? {}

	return (
		<div className={cn('leading-none', className)}>
			<dl className="grid grid-cols-[auto_1fr] items-center gap-0.5 text-sm/[1] [&_dt]:text-center">
				<dt>B</dt>
				<dd>
					<Indicators className="text-green-500" current={balls} max={3} />
				</dd>
				<dt>S</dt>
				<dd>
					<Indicators className="text-yellow-300" current={strikes ?? 0} />
				</dd>
				<dt>O</dt>
				<dd>
					<Indicators className="text-red-500" current={outs ?? 0} />
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
						'size-2 rounded-full transition-colors',
						current > i
							? 'bg-current'
							: 'from-subdued bg-linear-to-t via-transparent',
					)}
					key={i}
				/>
			))}
		</div>
	)
}
