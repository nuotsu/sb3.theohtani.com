import { cn } from '@/lib/utils'

export default function Headshot({
	type = 'colored',
	player,
	size = 96,
	zoom,
	className,
	...props
}: {
	type?: 'transparent' | 'colored'
	player?: MLB.Player | null
	size?: number
	zoom?: number
} & React.ComponentProps<'img'>) {
	if (!player) return null

	const TYPE_MAP = {
		transparent: `https://img.mlbstatic.com/mlb-photos/image/upload/d_people.png/w_${size}/people/${player.id}/headshot/silo/current`,
		colored: `https://midfield.mlbstatic.com/v1/people/${player.id}/spots/${size}`,
	}

	const url = new URL(TYPE_MAP[type])

	if (zoom) {
		url.searchParams.set('zoom', zoom.toString())
	}

	return (
		<img
			className={cn('text-transparent', className)}
			src={url.toString()}
			alt={player.fullName}
			title={player.fullName}
			width={size}
			height={size}
			onError={(e) => (e.currentTarget.style.opacity = '0')}
			{...props}
		/>
	)
}
