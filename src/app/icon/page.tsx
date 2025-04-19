import { cn } from '@/lib/utils'

export default function Page() {
	return (
		<main className="gap-lh flex min-h-svh flex-wrap place-content-center bg-neutral-400">
			<Icon className="px-16 pt-26">
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

			<Icon className="font-collegiate relative">
				<div className="font-bold *:absolute *:-translate-x-1/2 *:-translate-y-[49%]">
					<span className="top-[43%] left-[42%] z-1 text-[11lh] drop-shadow-2xl drop-shadow-black/50">
						S
					</span>
					<span className="top-[56%] left-[56.9%] text-[10.9lh]">B</span>
				</div>

				<div className="absolute inset-[1lh] z-2 bg-linear-to-b from-white to-white mix-blend-multiply" />
			</Icon>
		</main>
	)
}

function Icon({ className, ...props }: React.ComponentProps<'article'>) {
	return (
		<article
			className={cn(
				'bg-bg aspect-square w-1/4 overflow-hidden rounded-[4remX]',
				className,
			)}
			{...props}
		/>
	)
}
