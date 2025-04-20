export default function HomeRun({
	currentPlay,
}: {
	currentPlay?: MLB.LivePlay
}) {
	const { result } = currentPlay ?? {}

	const text = {
		1: 'Solo Home Run',
		2: '2-Run Home Run',
		3: '3-Run Home Run',
		4: 'Grand Slam',
	}[result?.rbi ?? 0]

	return (
		<div className="h-lh text-bg bg-amber-400">
			{/* @ts-ignore */}
			<marquee
				className="font-dot text-2xl leading-none font-extrabold uppercase"
				direction="right"
				children={text}
			/>
		</div>
	)
}
