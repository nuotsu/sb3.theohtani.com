import { fetchMLB } from '@/lib/fetch'
import Select from './Select'

export default async function SportSelector(
	props: Omit<React.ComponentProps<'select'>, 'children'>,
) {
	const { sports } = await fetchMLB<MLB.Sports>('/api/v1/sports')

	return (
		<Select {...props}>
			{sports.map((sport) => (
				<option value={sport.id} key={sport.id}>
					{sport.abbreviation}
				</option>
			))}
		</Select>
	)
}
