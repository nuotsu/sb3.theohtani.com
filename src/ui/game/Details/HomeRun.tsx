export default function HomeRun({ currentPlay }: { currentPlay?: string }) {
	const scorers = currentPlay?.match(/scores/g)?.length ?? 0

	const size = currentPlay?.includes('grand slam')
		? 4
		: scorers
			? scorers + 1
			: 1

	const text = {
		1: 'Solo Home Run',
		2: '2-Run Home Run',
		3: '3-Run Home Run',
		4: 'Grand Slam',
	}[size]

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
