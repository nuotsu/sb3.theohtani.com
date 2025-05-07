import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const TODAY = new Date().toLocaleDateString('en-CA')

export const GROUPS = ['hitting', 'pitching'] as const

export const useStorage = create<{
	sportId: number
	setSportId: (sportId: number) => void

	date: string
	setDate: (date: string) => void
	today: string

	group: (typeof GROUPS)[number]
	setGroup: (group: (typeof GROUPS)[number]) => void

	sortStat: string
	setSortStat: (sortStat: string) => void
}>((set) => ({
	sportId: 1,
	setSportId: (sportId) => set({ sportId }),

	date: TODAY,
	setDate: (date) => set({ date }),
	today: TODAY,

	group: GROUPS[0],
	setGroup: (group) => set({ group }),

	sortStat: 'avg',
	setSortStat: (sortStat) => set({ sortStat }),
}))

export const useLocalStorage = create<{
	noSpoilers: number[]
	addNoSpoiler: (teamId: number) => void
	removeNoSpoiler: (teamId: number) => void
}>()(
	persist(
		(set) => ({
			noSpoilers: [],
			addNoSpoiler: (teamId) =>
				set((state) => ({
					noSpoilers: [...new Set([...state.noSpoilers, teamId])],
				})),
			removeNoSpoiler: (teamId) =>
				set((state) => ({
					noSpoilers: state.noSpoilers.filter((t) => t !== teamId),
				})),
		}),
		{
			name: 'sb3-local-storage',
		},
	),
)
