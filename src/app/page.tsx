import DatePicker from '@/ui/date/DatePicker'
import Schedule from '@/ui/game/Schedule'

export default function Home() {
	return (
		<>
			<section className="gap-ch mb-lh grid">
				<DatePicker />
				<Schedule />
			</section>
		</>
	)
}
