import { cn } from '@/lib/utils'

const runnerKeys: Record<string, number> = {
	first: 0,
	second: 1,
	third: 2,
}

export default function BaseRunners({
	data,
	className,
}: {
	data?: MLB.LiveData | null
} & React.ComponentProps<'div'>) {
	const { offense = {} } = data?.liveData.linescore ?? {}

	const runners = Object.keys(offense)
		.map((key) => runnerKeys[key])
		.filter(Number.isInteger)

	return (
		<div
			className={cn(
				'ring-bg grid rotate-45 grid-cols-2 gap-1 ring-4',
				className,
			)}
		>
			{[1, 0, 2].map((i) => (
				<div
					className={cn(
						'base bg-bg size-4 border transition-colors',
						runners.includes(i) && 'bg-fg',
					)}
					key={i}
				/>
			))}
		</div>
	)
}
