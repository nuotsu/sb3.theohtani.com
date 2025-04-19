import { useGameContext } from './store'
import getGameStatus from '@/lib/game-status'
import { cn } from '@/lib/utils'

export default function Venue(props: React.ComponentProps<'div'>) {
	const { data } = useGameContext()
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
		<div {...props}>
			<p
				className={cn(
					'gap-x-ch grid text-center text-balance text-current/50',
					hasWeather && 'grid-cols-3',
					interlude && 'text-subdued',
				)}
			>
				<small
					className={cn(
						'line-clamp-2',
						isPreview && !hasWeather ? 'text-right' : 'text-left',
					)}
				>
					{venue?.name}
				</small>

				{hasWeather && (
					<>
						<small>
							{[weather.condition, `${weather.temp}°F`]
								.filter(Boolean)
								.join(' / ')}
						</small>
						<small className="text-right">{weather.wind}</small>
					</>
				)}
			</p>
		</div>
	)
}
