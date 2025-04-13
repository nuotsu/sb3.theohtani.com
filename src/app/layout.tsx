import type { Metadata } from 'next'
import { Geist, Chakra_Petch } from 'next/font/google'
import '@/app.css'

const fontSans = Geist({
	subsets: ['latin'],
	weight: ['400', '900'],
})

const fontCollegiate = Chakra_Petch({
	subsets: ['latin'],
	weight: ['400', '700'],
})

export const metadata: Metadata = {
	title: 'The Clubhouse — MLB Scorebug',
	description: 'MLB Scorebug, in the style of The Clubhouse on Netflix.',
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
