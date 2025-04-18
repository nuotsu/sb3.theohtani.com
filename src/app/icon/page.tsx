import { cn } from '@/lib/utils'
import BaseRunners from '@/ui/game/BaseRunners'

export default function Page() {
	return (
		<main className="gap-lh flex min-h-svh flex-wrap place-content-center bg-neutral-400">
			<Icon className="rounded-none px-16 pt-20">
				<div className="gap-lh grid w-full rotate-45 grid-cols-2">
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							className={cn(
								'aspect-square w-full border-4',
								i === 1 && 'bg-current text-yellow-400',
							)}
							key={i}
						/>
					))}
				</div>
			</Icon>

			<Icon className="px-16 pt-20"></Icon>
		</main>
	)
}

function Icon({ className, ...props }: React.ComponentProps<'article'>) {
	return (
		<article
			className={cn(
				'bg-bg aspect-square w-1/4 overflow-hidden rounded-[4rem]',
				className,
			)}
			{...props}
		/>
	)
}
