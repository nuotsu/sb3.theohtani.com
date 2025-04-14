import getGameStatus from '@/lib/game-status'

export default function Scoreboard({ data }: { data?: MLB.LiveData | null }) {
	const { innings = [] } = data?.liveData.linescore ?? {}

	return (
		<div className="overflow-fade-r pr-ch overflow-x-auto">
			<table className="min-w-full table-fixed text-center whitespace-nowrap">
				<thead>
					<tr className="h-lh align-bottom *:min-w-[calc((50vw/9)-0.5px)] *:text-xs sm:*:min-w-[2.5ch]">
						{Array.from({ length: Math.max(innings.length, 9) }).map((_, i) => (
							<th className="text-subdued font-normal" key={i}>
								{i + 1}
							</th>
						))}
						<th className="text-subdued font-normal">R</th>
						<th className="text-subdued font-normal">H</th>
						<th className="text-subdued font-normal">E</th>
						<th className="text-subdued font-normal">LOB</th>
					</tr>
				</thead>
				<tbody>
					<Row data={data} side="away" />
					<Row data={data} side="home" />
				</tbody>
			</table>
		</div>
	)
}

function Row({
	data,
	side,
}: {
	data?: MLB.LiveData | null
	side: 'home' | 'away'
}) {
	const { innings = [], teams } = data?.liveData.linescore ?? {}
	const { isFinal } = getGameStatus(data?.gameData.status)

	return (
		<tr>
			{Array.from({ length: Math.max(innings.length, 9) }).map((_, i) => {
				const { runs } = innings[i]?.[side] ?? {}
				const calledEarly = isFinal && side === 'home' && i >= 8 && isNaN(runs)

				return <td key={i}>{calledEarly ? 'x' : runs}</td>
			})}
			<td className="border-l font-bold">{teams?.[side].runs}</td>
			<td>{teams?.[side].hits}</td>
			<td>{teams?.[side].errors}</td>
			<td>{teams?.[side].leftOnBase}</td>
		</tr>
	)
}
