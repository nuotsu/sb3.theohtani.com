import Headshot from '@/ui/Headshot'

export default function NextBatter({
	label,
	player,
}: {
	label: string
	player?: MLB.Player | null
}) {
	if (!player) return null

	return (
		<div
			className="flex items-center gap-[.5ch] px-[.5ch]"
			title={player?.fullName}
			key={player.id}
		>
			<Headshot type="colored" player={player} className="h-lh" size={96} />
			<span>{player?.lastName}</span>
			<small className="opacity-50">{label}</small>
		</div>
	)
}
