export default function Pitch({ pitch }: { pitch?: MLB.LivePlayPitch }) {
	const { details, pitchNumber } = pitch ?? {}
	const { endSpeed } = pitch?.pitchData ?? {}

	return (
		<li className="anim-fade-to-b flex items-center gap-[.5ch]">
			<b
				className="size-lh tabular grid aspect-square shrink-0 place-content-center rounded-full text-[xx-small]"
				style={{ backgroundColor: details?.ballColor }}
			>
				{pitchNumber}
			</b>

			{details?.type?.description && (
				<small className="line-clamp-1 grow">
					{details?.type?.description.replace('Fastball', '').trim()}
				</small>
			)}

			<small className="line-clamp-1 text-current/50">
				{details?.description}
			</small>

			{endSpeed && (
				<small
					className="grid min-w-[3ch] items-center text-center leading-none tabular-nums"
					style={{
						color: `color-mix(in srgb, var(--color-yellow-300), red ${heatPercentage(endSpeed)})`,
					}}
				>
					<span>{endSpeed.toFixed(1)}</span>
					<sub className="text-[6px]">MPH</sub>
				</small>
			)}
		</li>
	)
}

function heatPercentage(speed: number = 0) {
	const min = 80
	const max = 100
	const range = Math.max(min, Math.min(max, speed))
	const percentage = (range - min) / (max - min)

	return (percentage * 100).toFixed(0) + '%'
}
