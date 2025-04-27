'use client'

import TeamColor from '@/ui/team/TeamColor'
import Headshot from '@/ui/Headshot'

export default function Team({ split }: { split: MLB.PlayerStatSplit }) {
	console.log(split)

	return (
		<TeamColor
			as="th"
			className="sticky left-0 w-[16ch] pl-0! md:w-[24ch]"
			team={split.team as MLB.Team}
		>
			<div className="flex items-center gap-[.5ch]">
				<span className="w-[3ch] text-[x-small] group-[:not(:hover)]:text-current/50">
					{split.rank}
				</span>

				<Headshot
					className="size-lh object-contain"
					player={split.player}
					size={48}
				/>

				<div className="line-clamp-1 break-all">
					<span className="max-md:hidden">{split.player.fullName}</span>
					<span className="md:hidden">{split.player.lastName}</span>
				</div>
			</div>
		</TeamColor>
	)
}
