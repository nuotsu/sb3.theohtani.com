export default function Headshot({
	player,
	size = 128,
	...props
}: {
	player?: MLB.Player | null
	size?: number
} & React.ComponentProps<'img'>) {
	if (!player) return null

	return (
		<img
			src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people.png/w_${size}/people/${player.id}/headshot/silo/current`}
			alt={player.fullName}
			title={player.fullName}
			width={size}
			height={size}
			{...props}
		/>
	)
}
