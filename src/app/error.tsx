'use client'

export default function Error({ reset }: { reset: () => void }) {
	return (
		<section className="gap-lh grid min-h-svh place-content-center">
			{':('}

			<button onClick={reset}>Refresh</button>
		</section>
	)
}
