'use client'

import Dialog from '@/ui/Dialog'

export default function NavItem({
	label,
	triggerClassName,
	...props
}: {
	label: string
	triggerClassName?: string
} & React.ComponentProps<'div'>) {
	return (
		<Dialog
			trigger={(props) => (
				<button className={triggerClassName} {...props}>
					{label}
				</button>
			)}
			{...props}
		/>
	)
}
