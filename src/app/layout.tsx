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
	icons: 'https://fav.farm/⚾',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="bg-bg text-fg cursor-crosshair antialiased">
				{children}
			</body>
		</html>
	)
}
