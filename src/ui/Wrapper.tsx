'use client'

import { useEffect, useRef } from 'react'

export default function Wrapper({
	className,
	children,
}: React.ComponentProps<'header'>) {
	const ref = useRef<HTMLDivElement>(null)

	// set --header-height
	useEffect(() => {
		if (typeof window === 'undefined') return

		function setHeight() {
			if (!ref.current) return
			document.documentElement.style.setProperty(
				'--header-height',
				`${ref.current.offsetHeight ?? 0}px`,
			)
		}
		setHeight()
		window.addEventListener('resize', setHeight)

		return () => window.removeEventListener('resize', setHeight)
	}, [])

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	)
}
