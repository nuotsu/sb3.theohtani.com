'use client'

import { useGameContext } from '@/ui/game/store'
import HomeRun from './HomeRun'
import Venue from '@/ui/game/Venue'
import { cn } from '@/lib/utils'

export default function Details() {
	const { data } = useGameContext()
	const currentPlay = data?.liveData?.plays.currentPlay.result.description

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
			/>
		</div>
	)
}
