import { fetchMLB } from '@/lib/fetch'
import SportSelector from './sport/SportSelector'

export default async function Header() {
	const { sports } = await fetchMLB<MLB.Sports>('/api/v1/sports')

	return (
		<header className="gap-x-ch flex flex-wrap items-center justify-center">
			<h1 className="font-dot gap-x-ch flex items-center text-center font-bold">
				Live Scorebug
				<SportSelector sports={sports} />
			</h1>
		</header>
	)
}
