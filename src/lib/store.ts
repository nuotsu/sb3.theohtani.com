import { create } from 'zustand'

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
