import getGameStatus from '@/lib/game-status'
import { cn } from '@/lib/utils'

export default function Details({
	data,
	className,
}: {
	data?: MLB.LiveData | null
} & React.ComponentProps<'div'>) {
	const { isPreview } = getGameStatus(data?.gameData.status)
	const { venue, weather } = data?.gameData || {}
	const hasWeather = weather?.condition || weather?.temp || weather?.wind

	return (
		<div className={cn('', className)}>
			<p
				className={cn(
					'gap-x-ch grid text-center text-xs/tight text-balance',
					hasWeather && 'grid-cols-3',
				)}
			>
				<span
					className={cn(isPreview && !hasWeather ? 'text-right' : 'text-left')}
				>
					{venue?.name}
				</span>

				{hasWeather && (
					<>
						<span>
							{weather.condition} / {weather.temp}°F
						</span>
						<span className="text-right">{weather.wind}</span>
					</>
				)}
			</p>
		</div>
	)
}
