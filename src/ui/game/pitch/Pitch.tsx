import { cn } from '@/lib/utils'

export default function Pitch({ pitch }: { pitch?: MLB.LivePlayPitch }) {
	const { details } = pitch ?? {}
	const { startSpeed } = pitch?.pitchData ?? {}
	const { ballColor } = pitch?.details ?? {}

	return (
		<li className="anim-fade-to-b flex items-center gap-[.5ch] overflow-hidden">
			<Zone pitch={pitch} color={ballColor} />

			{details?.type?.description && (
				<small className="shrink-0 grow">
					{details?.type?.description.replace('Fastball', '').trim()}
				</small>
			)}

			<small
				className="line-clamp-1"
				style={{ color: `color-mix(in srgb, #fff, ${ballColor} 40%)` }}
			>
				{details?.description}
			</small>

			{startSpeed && (
				<small
					className="grid min-w-[3ch] items-center text-center leading-none tabular-nums"
					style={{
						color: `color-mix(in srgb, var(--color-yellow-300), red ${heatPercentage(startSpeed)})`,
					}}
				>
					<span>{startSpeed.toFixed(1)}</span>
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

function Zone({ pitch, color }: { pitch?: MLB.LivePlayPitch; color?: string }) {
	if (!pitch?.pitchData.coordinates) return null

	const { pX, pZ } = pitch.pitchData.coordinates

	return (
		<div className="px-ch -mr-[.5ch] grid h-full place-content-center">
			<div className="relative m-auto aspect-[0.75] h-[0.75lh] border-[.5px] border-current/50">
				<span
					className="absolute size-[4px] -translate-1/2 rounded-full"
					style={{
						left: pitchToCSS(pX, pZ).leftPosition,
						top: pitchToCSS(pX, pZ).topPosition,
						backgroundColor: color,
					}}
				/>
			</div>
		</div>
	)
}

function pitchToCSS(pX: number, pZ: number) {
	// Constants
	const PLATE_HALF_WIDTH = 0.7085 // feet
	const ZONE_MIDDLE_HEIGHT = 2.5 // feet
	const ZONE_HALF_HEIGHT = 1.0 // feet

	// CSS strike zone dimensions
	const ZONE_HEIGHT_LH = 0.8
	const ZONE_WIDTH_LH = ZONE_HEIGHT_LH * 0.7

	// Convert to percentages from center
	const pXPercentage = (pX / PLATE_HALF_WIDTH) * 100
	const pZPercentage = ((pZ - ZONE_MIDDLE_HEIGHT) / ZONE_HALF_HEIGHT) * 100

	// Convert to lh units from center
	const pXInLh = (pXPercentage / 100) * (ZONE_WIDTH_LH / 2)
	const pZInLh = (pZPercentage / 100) * (ZONE_HEIGHT_LH / 2)

	// Calculate CSS positions (from center)
	return {
		xFromCenter: `${pXInLh.toFixed(3)}lh`,
		yFromCenter: `${pZInLh.toFixed(3)}lh`,
		// For absolute positioning from top-left
		leftPosition: `calc(50% - ${pXInLh.toFixed(3)}lh)`,
		topPosition: `calc(50% - ${pZInLh.toFixed(3)}lh)`,
		// Raw values
		xPercentage: pXPercentage,
		yPercentage: pZPercentage,
	}
}
