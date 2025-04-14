export function teamLogoUrl(team?: MLB.Team, size = 128) {
	if (!team) return undefined
	return `https://midfield.mlbstatic.com/v1/team/${team.id}/spots/${size}`
}

export default function TeamLogo({
	team,
	size,
	...props
}: {
	team?: MLB.Team
	size?: number
} & React.ComponentProps<'img'>) {
	if (!team) return null

	return (
		<img
			src={teamLogoUrl(team, size)}
			alt=""
			width={size}
			height={size}
			{...props}
		/>
	)
}
