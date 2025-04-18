import { Geist, Doto } from 'next/font/google'
import '@/app.css'
import type { Metadata } from 'next'

const f1 = Geist({
	subsets: ['latin'],
	weight: ['400', '900'],
})

const f2 = Doto({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'MLB Scorebug',
	description: 'Live MLB Scorebug',
	icons: [
		{
			url: '/icon-48.png',
			sizes: '48x48',
			type: 'image/png',
		},
		{
			url: '/icon.png',
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
				{children}
			</body>
		</html>
	)
}
