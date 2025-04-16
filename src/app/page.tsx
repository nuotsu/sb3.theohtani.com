import Header from '@/ui/Header'
import DatePicker from '@/ui/date/DatePicker'
import Schedule from '@/ui/game/Schedule'
import Standings from '@/ui/standings/Standings'
import Nav from '@/ui/Nav'

export default function Home() {
	return (
		<main className="flex min-h-svh flex-col">
			<Header />

			<section id="scores" className="gap-ch grid">
				<DatePicker />
				<Schedule />
			</section>

			<Standings />
			<Nav />
		</main>
	)
}
