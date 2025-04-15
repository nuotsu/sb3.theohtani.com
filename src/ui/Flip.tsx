import { cn } from '@/lib/utils'

export default function Flip({
	disable,
	children,
	className,
	...props
}: { disable?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
	if (disable)
		return (
			<span className={className} {...props}>
				{children}
			</span>
		)

	return (
		<span
			className={cn('grid place-content-center overflow-hidden', className)}
			key={children?.toString()}
			{...props}
		>
			<span className="anim-fade-to-b inline-block duration-300">
				{children}
			</span>
		</span>
	)
}
