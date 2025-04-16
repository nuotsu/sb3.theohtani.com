'use client'

import { cn } from '@/lib/utils'
import HomeRun from './HomeRun'

export default function Details({ data }: { data?: MLB.LiveData | null }) {
	const { plays } = data?.liveData ?? {}
	const currentPlay = plays?.currentPlay.result.description

	const scoring = ['homers', 'scores'].some((type) =>
		currentPlay?.includes(type),
	)

	return (
		<div className={cn('flex h-[2lh] flex-col items-center')}>
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
		</div>
	)
}
