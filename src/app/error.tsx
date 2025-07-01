'use client'

export default function Error({ reset }: { reset: () => void }) {
	return (
		<section className="gap-lh grid min-h-svh place-content-center">
			{':('}

			<button className="underline" onClick={reset}>
				Refresh
			</button>
		</section>
	)
}
