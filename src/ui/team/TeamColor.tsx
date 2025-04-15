import { getInvert, teamLogoUrl } from '@/ui/team/TeamLogo'
import { cn } from '@/lib/utils'

export default function TeamColor({
	as: Tag = 'div',
	team,
	className,
	...props
}: {
	as?: React.ElementType
	team?: MLB.Team
} & React.ComponentProps<'div'>) {
	const invert = getInvert(team)

	return (
		<Tag
			className={cn(invert ? 'text-bg' : 'text-shadow-2xs', className)}
			style={{
				backgroundImage: team ? `url(${teamLogoUrl(team)})` : undefined,
				backgroundSize: '9999% 800%',
				backgroundPosition: '50% 2%',
			}}
			{...props}
		/>
	)
}
