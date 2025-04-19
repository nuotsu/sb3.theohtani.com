import { getInvert, teamLogoUrl } from '@/ui/team/TeamLogo'
import { cn } from '@/lib/utils'

type TeamColorProps<T extends React.ElementType> = {
	as?: T
	team?: MLB.Team
} & Omit<React.ComponentProps<T>, 'as' | 'team'>

export default function TeamColor<T extends React.ElementType = 'div'>({
	as = 'div' as T,
	team,
	className,
	...props
}: TeamColorProps<T>) {
	const invert = getInvert(team)

	const Tag = as as React.ElementType

	return (
		<Tag
			className={cn(invert ? 'text-bg' : 'text-shadow-2xs', className)}
			style={{
				backgroundImage: team ? `url(${teamLogoUrl(team)})` : undefined,
				backgroundSize: '9999% 800%',
				backgroundPosition: '50% 2%',
			}}
			{...(props as React.ComponentProps<T>)}
		/>
	)
}
