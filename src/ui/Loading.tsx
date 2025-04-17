import { VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function Loading({
	className,
	children,
}: React.ComponentProps<'aside'>) {
	return (
		<aside
			className={cn('inline-flex items-center gap-[.5ch] px-[.5ch]', className)}
		>
			<span className="size-lh grid place-content-center">
				<VscLoading className="animate-spin" />
			</span>

			{children || 'Loading...'}
		</aside>
	)
}
