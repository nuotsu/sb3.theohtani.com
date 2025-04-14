import Header from '@/ui/Header'
import DatePicker from '@/ui/date/DatePicker'
import Schedule from '@/ui/game/Schedule'
import Standings from '@/ui/standings/Standings'

export default function Home() {
	return (
		<main>
			<Header />
			<DatePicker />
			<Schedule />
			<Standings />
		</main>
	)
}
