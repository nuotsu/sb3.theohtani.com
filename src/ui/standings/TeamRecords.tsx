export default function TeamRecords({
	teamRecords,
}: {
	teamRecords: MLB.StandingsTeamRecord[]
}) {
	if (!teamRecords.length) return null

	return (
		<ol>
			{teamRecords.map((teamRecord) => (
				<li className="flex items-center gap-[.5ch]" key={teamRecord.team.id}>
					{teamRecord.team.name}
					<small className="opacity-50">
						{teamRecord.wins}-{teamRecord.losses}
					</small>
				</li>
			))}
		</ol>
	)
}
