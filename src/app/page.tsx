import Header from '@/ui/Header'
import DatePicker from '@/ui/date/DatePicker'
import Schedule from '@/ui/game/Schedule'

export default function Home() {
	return (
		<main>
			<Header />
			<DatePicker />
			<Schedule />
		</main>
	)
}
