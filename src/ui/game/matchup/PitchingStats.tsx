export function getPitchingStats(
	player?: MLB.Player | null,
	data?: MLB.LiveData | null,
	isHome?: boolean,
) {
	const { teams } = data?.liveData.boxscore ?? {}

	return (
		teams?.[isHome ? 'home' : 'away'].players[
			`ID${player?.id}`
		] as MLB.BoxScoreTeamPlayer
	)?.stats?.pitching
}

export default function PitchingStats({
	stats,
}: {
	stats: MLB.PitchingStats | null
}) {
	if (!stats) return null

	return (
		<table className="text-center text-[x-small]/none text-current/50">
			<tbody>
				<tr className="text-[smaller]">
					<th>IP</th>
					<th>H</th>
					<th>R</th>
					<th>BB</th>
					<th>K</th>
				</tr>
				<tr className="tabular-nums *:px-[.5ch]">
					<td>{parseFloat(stats.inningsPitched)}</td>
					<td>{stats.hits}</td>
					<td>{stats.earnedRuns}</td>
					<td>{stats.baseOnBalls}</td>
					<td>{stats.strikeOuts}</td>
				</tr>
			</tbody>
		</table>
	)
}
