import { useGameContext } from './context'
import { cn } from '@/lib/utils'

export default function Venue(props: React.ComponentProps<'div'>) {
	const { data, isPreview, isInterlude, hasNoSpoiler } = useGameContext()
	const { venue, weather } = data?.gameData || {}

	const hasWeather =
		(weather?.condition && weather.condition !== 'Unknown') ||
		weather?.temp ||
		weather?.wind

	const attendance = data?.gameData.gameInfo.attendance?.toLocaleString()

	return (
		<div {...props}>
			<p
				className={cn(
					'gap-x-ch grid text-center leading-tight text-balance text-current/50',
					hasWeather && 'grid-cols-3',
					!hasNoSpoiler && isInterlude && 'text-subdued',
				)}
			>
				<small
					className={cn(
						'flex flex-wrap items-center gap-x-[.5ch] *:inline-block',
						isPreview && !hasWeather ? 'text-right' : 'text-left',
					)}
				>
					<span className="line-clamp-1">{venue?.name}</span>
					{attendance && <small>({attendance})</small>}
				</small>

				{hasWeather && (
					<>
						<small className="line-clamp-2">
							{[weather.condition, `${weather.temp}°F`]
								.filter(Boolean)
								.join(' / ')}
						</small>

						<small className="line-clamp-2 text-right">{weather.wind}</small>
					</>
				)}
			</p>
		</div>
	)
}
