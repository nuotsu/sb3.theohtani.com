import getGameStatus from '@/lib/game-status'
import { cn } from '@/lib/utils'

export default function Venue({
	data,
	className,
}: {
	data?: MLB.LiveData | null
} & React.ComponentProps<'div'>) {
	const { isPreview } = getGameStatus(data?.gameData.status)
	const { venue, weather } = data?.gameData || {}
	const hasWeather =
		(weather?.condition && weather.condition !== 'Unknown') ||
		weather?.temp ||
		weather?.wind

	const interlude = ['Middle', 'End'].includes(
		data?.liveData.linescore.inningState ?? '',
	)

	return (
		<div className={className}>
			<p
				className={cn(
					'gap-x-ch h-lh grid text-center text-xs/tight text-balance opacity-50',
					hasWeather && 'grid-cols-3',
					interlude && 'text-subdued',
				)}
			>
				<span
					className={cn(
						'line-clamp-2',
						isPreview && !hasWeather ? 'text-right' : 'text-left',
					)}
				>
					{venue?.name}
				</span>

				{hasWeather && (
					<>
						<span>
							{[weather.condition, `${weather.temp}°F`]
								.filter(Boolean)
								.join(' / ')}
						</span>
						<span className="text-right">{weather.wind}</span>
					</>
				)}
			</p>
		</div>
	)
}
