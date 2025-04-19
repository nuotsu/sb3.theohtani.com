'use client'

import { useGameContext } from '@/ui/game/store'
import HomeRun from './HomeRun'
import Venue from '@/ui/game/Venue'
import { cn } from '@/lib/utils'

export default function Details() {
	const { data } = useGameContext()

	const { currentPlay, scoringPlays } = data?.liveData?.plays ?? {}
	const { description } = currentPlay?.result ?? {}

	const scoring = currentPlay && scoringPlays?.includes(currentPlay.atBatIndex)

	return (
		<div className={cn('relative flex h-[2lh] flex-col items-stretch')}>
			{description && (
				// @ts-ignore
				<marquee
					className={cn(
						'overflow-fade my-auto text-sm',
						scoring && 'text-yellow-400',
					)}
					data-scoring={scoring || undefined}
					title={description}
					children={description}
				/>
			)}

			{description?.includes('homers') && <HomeRun currentPlay={description} />}

			<Venue
				className={cn(
					'absolute inset-x-0 top-0 -z-1 p-[.5ch] text-sm transition-opacity',
					description && 'opacity-0',
				)}
			/>
		</div>
	)
}
