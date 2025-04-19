export default function TeamLogo({
	team,
	size = 96,
	...props
}: {
	team?: MLB.Team
	size?: number
} & React.ComponentProps<'img'>) {
	if (!team) return null

	return (
		<img
			src={teamLogoUrl(team, size)}
			alt={team.name}
			title={team.name}
			width={size}
			height={size}
			{...props}
		/>
	)
}

export function teamLogoUrl(team?: MLB.Team, size = 128) {
	if (!team) return undefined
	return `https://midfield.mlbstatic.com/v1/team/${team.id}/spots/${size}`
}

export function getInvert(team?: MLB.Team) {
	return [
		// 'Houston Astros',
		'Miami Marlins',
		'San Diego Padres',
		'San Francisco Giants',
		'Tampa Bay Rays',
	].includes(team?.name ?? '')
}
