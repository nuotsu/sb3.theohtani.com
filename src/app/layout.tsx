import { Geist, Chakra_Petch, Doto } from 'next/font/google'
import '@/app.css'
import type { Metadata } from 'next'

const fontSans = Geist({
	subsets: ['latin'],
	weight: ['400', '900'],
})

const fontDot = Doto({
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
			<body className="bg-bg text-fg cursor-crosshair pb-[env(safe-area-inset-bottom)] antialiased">
				{children}
			</body>
		</html>
	)
}
