import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const TODAY = new Date().toLocaleDateString('en-CA')

export const useStorage = create<{
	sportId: number
	setSportId: (sportId: number) => void

	date: string
	setDate: (date: string) => void
	today: string
}>((set) => ({
	sportId: 1,
	setSportId: (sportId) => set({ sportId }),

	date: TODAY,
	setDate: (date) => set({ date }),
	today: TODAY,
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
