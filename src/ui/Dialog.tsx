'use client'

import { useRef } from 'react'

export default function Dialog({
	trigger: Trigger,
	children,
}: {
	trigger: (props: React.ComponentProps<'button'>) => React.ReactNode
	children?: React.ReactNode
}) {
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
				<div className="no-scrollbar relative flex h-dvh flex-col overflow-y-auto">
					<button className="fixed inset-0 outline-none" onClick={close} />

					<div className="pb-lh relative my-auto w-screen">{children}</div>

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
