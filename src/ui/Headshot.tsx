export default function Headshot({
	type = 'transparent',
	player,
	size = 128,
	zoom,
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
			src={url.toString()}
			alt={player.fullName}
			title={player.fullName}
			width={size}
			height={size}
			{...props}
		/>
	)
}
