'use client'

import { cn } from '@/lib/utils'
import { useRef } from 'react'

export default function Dialog({
	trigger: Trigger,
	className,
	children,
}: {
	trigger: (props: React.ComponentProps<'button'>) => React.ReactNode
} & React.ComponentProps<'div'>) {
	const ref = useRef<HTMLDialogElement>(null)

	function close() {
		ref.current?.close()
	}

	return (
		<>
			<Trigger onClick={() => ref.current?.showModal()} />

			<dialog
				ref={ref}
				className="text-fg anim-fade-to-t m-auto max-h-full max-w-none bg-transparent duration-400 backdrop:backdrop-blur-xl"
			>
				<div className="no-scrollbar relative flex h-dvh w-screen flex-col overflow-y-auto">
					<button className="fixed inset-0 outline-none" onClick={close} />

					<div
						className={cn(
							'not-standalone:pb-[calc(1lh+env(safe-area-inset-bottom))] standalone:pb-[calc(1lh+1rem)] relative my-auto w-screen',
							className,
						)}
					>
						{children}
					</div>

					<nav className="blur-gradient-to-t fixed inset-x-0 bottom-0 text-center">
						<button
							className="font-dot not-standalone:pb-[env(safe-area-inset-bottom)] standalone:pb-4 w-full outline-none"
							onClick={close}
							autoFocus
						>
							&times;
						</button>
					</nav>
				</div>
			</dialog>
		</>
	)
}
