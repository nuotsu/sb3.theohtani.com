'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import Loading from '@/ui/Loading'
import TeamColor from '@/ui/team/TeamColor'
import Headshot from '@/ui/Headshot'
import BattingStats from './BattingStats'

export default function Leaderboard() {
	const { date, sportId } = useStorage()
	const year = new Date(date).getFullYear()

	const { data, isLoading } = fetchMLBLive<{
		stats: MLB.StatEntry<MLB.PlayerStatSplit>[]
	}>(
		`/api/v1/stats?sportId=${sportId}&stats=season&season=${year}&gameType=R&limit=${100}&group=${'hitting'}`,
	)

	if (isLoading) return <Loading>Loading leaderboard...</Loading>
	if (!data) return <div>No data</div>

	const { splits } = data.stats[0]

	return (
		<table className="w-full table-fixed">
			<thead className="sticky top-0 z-1">
				<tr className="">
					<th></th>
					{['AVG', 'HR'].map((label) => (
						<th className="text-current/25 backdrop-blur" key={label}>
							<small>{label}</small>
						</th>
					))}
				</tr>
			</thead>

			<tbody className="text-center">
				{splits.map((split) => (
					<tr
						className="group *:px-[.5ch] hover:bg-current/5"
						key={split.player.id}
					>
						<TeamColor as="th" className="pl-0!" team={split.team as MLB.Team}>
							<div className="flex items-center gap-[.5ch]">
								<span className="w-[3ch] text-[x-small] tabular-nums group-[:not(:hover)]:text-current/50">
									{split.rank}
								</span>

								<Headshot
									className="size-lh object-contain"
									player={split.player}
									size={48}
								/>

								<span className="line-clamp-1 break-all">
									{split.player.fullName}
								</span>
							</div>
						</TeamColor>

						<BattingStats stat={split.stat as MLB.BattingStats} />
					</tr>
				))}
			</tbody>
		</table>
	)
}
