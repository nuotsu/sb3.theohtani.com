import useSWR, { SWRConfiguration } from 'swr'

const BASE_URL = 'https://statsapi.mlb.com'

export async function fetchMLB<T = any>(endpoint: string) {
	const url = new URL(endpoint, BASE_URL)
	const res = await fetch(url)
	return res.json() as Promise<T>
}

export function fetchMLBLive<T = any>(
	endpoint?: string,
	options?: SWRConfiguration,
) {
	if (!endpoint) return { data: null, isLoading: false }

	return useSWR<T>(endpoint, fetchMLB, {
		refreshInterval: 1000 * 3, // seconds
		...options,
	})
}

export function fetchPlayer(
	player?: MLB.BasicPlayerData,
	group?: 'hitting' | 'pitching',
) {
	if (!player) return { data: null, isLoading: false }

	const { data, ...rest } = fetchMLBLive<{ people: MLB.Player[] }>(
		[player.link, group && `?hydrate=stats(group=[${group}],type=[yearByYear])`]
			.filter(Boolean)
			.join(''),
	)

	if (rest.isLoading || !data) return { data: null, isLoading: false }

	return {
		data: data?.people[0],
		...rest,
	}
}

export function getStats(
	player: MLB.Player,
	year: number = new Date().getFullYear(),
) {
	return (player as MLB.PlayerStat).stats?.[0].splits.find(
		(split) => split.season === year.toString(),
	)
}
