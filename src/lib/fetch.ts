import useSWR, { SWRConfiguration } from 'swr'

const BASE_URL = 'https://statsapi.mlb.com'

export async function fetcher<T = any>(
	endpoint: string,
	base: string = BASE_URL,
) {
	const url = new URL(endpoint, base)
	const res = await fetch(url)
	return res.json() as Promise<T>
}

export function fetchMLBLive<T = any>(
	endpoint?: string,
	options?: SWRConfiguration,
) {
	if (!endpoint) return { data: null, isLoading: false }

	return useSWR<T>(endpoint, fetcher, {
		refreshInterval: 1000 * 3, // seconds
		...options,
	})
}

export function fetchPlayer(
	player?: MLB.BasicPlayerData,
	group?: 'hitting' | 'pitching',
) {
	if (!player) return { data: null, isLoading: false }

	const { data, isLoading } = fetchMLBLive<{ people: MLB.Player[] }>(
		[player.link, group && `?hydrate=stats(group=[${group}],type=[yearByYear])`]
			.filter(Boolean)
			.join(''),
	)

	if (isLoading || !data) return { data: null, isLoading: false }

	return {
		data: data?.people[0],
		isLoading,
	}
}

export function getStats(
	player: MLB.Player | null,
	year: number = new Date().getFullYear(),
) {
	if (!player) return null

	return (player as MLB.PlayerStat).stats?.[0].splits.find(
		(split) => split.season === year.toString(),
	)
}

export function fetchMLBStatsLive<T = any>(endpoint: string) {
	return useSWR<T>(
		endpoint,
		(url) => fetcher(url, 'https://bdfed.stitch.mlbinfra.com'),
		{
			refreshInterval: 1000 * 3, // seconds
		},
	)
}
