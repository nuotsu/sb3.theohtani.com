'use client'

import Dialog from '@/ui/Dialog'

export default function NavItem({
	label,
	triggerClassName,
	children,
}: {
	label: string
	triggerClassName?: string
} & React.ComponentProps<'dialog'>) {
	return (
		<Dialog
			trigger={(props) => (
				<button className={triggerClassName} {...props}>
					{label}
				</button>
			)}
			className="text-fg m-auto bg-transparent"
		>
			{children}
		</Dialog>
	)
}
