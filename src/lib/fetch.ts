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

export function fetchPlayer(player?: MLB.BasicPlayerData) {
	if (!player) return { data: null, isLoading: false }

	const { data, isLoading } = fetchMLBLive<{ people: MLB.Player[] }>(
		player.link,
	)

	return { data: data?.people[0], isLoading }
}
