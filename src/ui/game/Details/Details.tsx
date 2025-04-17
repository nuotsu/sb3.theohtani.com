'use client'

import { cn } from '@/lib/utils'
import HomeRun from './HomeRun'
import Venue from '@/ui/game/Venue'

export default function Details({ data }: { data?: MLB.LiveData | null }) {
	const { plays } = data?.liveData ?? {}
	console.log(plays)
	const currentPlay = plays?.currentPlay.result.description

	const scoring = ['homers', 'scores'].some((type) =>
		currentPlay?.includes(type),
	)

	return (
		<div className={cn('relative flex h-[2lh] flex-col items-stretch')}>
			{currentPlay && (
				// @ts-ignore
				<marquee
					className={cn(
						'overflow-fade my-auto text-sm',
						scoring && 'text-yellow-400',
					)}
					title={currentPlay}
					children={currentPlay}
				/>
			)}

			{currentPlay?.includes('homers') && <HomeRun currentPlay={currentPlay} />}

			<Venue
				className={cn(
					'absolute inset-x-0 top-0 -z-1 p-[.5ch] transition-opacity',
					currentPlay && 'opacity-0',
				)}
				data={data}
			/>
		</div>
	)
}
