import { Geist, Doto, Chakra_Petch } from 'next/font/google'
import Nav from '@/ui/nav'
import '@/app.css'
import type { Metadata } from 'next'

const f1 = Geist({
	subsets: ['latin'],
	weight: ['400', '900'],
})

const f2 = Doto({
	subsets: ['latin'],
})

const f3 = Chakra_Petch({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
	title: 'Live Scorebug',
	description: 'Live Scorebug',
	icons: [
		{
			url: '/icon-48.png',
			sizes: '48x48',
			type: 'image/png',
		},
		{
			url: '/icon-192.png',
			sizes: '192x192',
			type: 'image/png',
		},
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="no-scrollbar">
			<body className="bg-bg text-fg cursor-crosshair antialiased has-open:overflow-hidden">
				<main className="flex min-h-svh flex-col">
					{children}

					<Nav />
				</main>
			</body>
		</html>
	)
}
