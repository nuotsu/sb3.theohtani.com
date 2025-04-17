'use client'

import { cn } from '@/lib/utils'
import { useRef } from 'react'

export default function Dialog({
	trigger: Trigger,
	className,
	children,
}: {
	trigger: (props: React.ComponentProps<'button'>) => React.ReactNode
} & React.ComponentProps<'dialog'>) {
	const ref = useRef<HTMLDialogElement>(null)

	function close() {
		ref.current?.close()
	}

	return (
		<>
			<Trigger onClick={() => ref.current?.showModal()} />

			<dialog
				ref={ref}
				className={cn('group *:group-open:anim-fade', className)}
			>
				<button className="fixed inset-0 backdrop-blur" onClick={close} />

				<div className="relative">{children}</div>
			</dialog>
		</>
	)
}
