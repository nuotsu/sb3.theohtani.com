'use client'

import Dialog from '@/ui/Dialog'

export default function NavItem({
	label,
	triggerClassName,
	children,
}: {
	label: string
	triggerClassName?: string
	children?: React.ReactNode
}) {
	return (
		<Dialog
			trigger={(props) => (
				<button className={triggerClassName} {...props}>
					{label}
				</button>
			)}
		>
			{children}
		</Dialog>
	)
}
