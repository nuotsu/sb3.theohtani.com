import { create } from 'zustand'

const TODAY = new Date().toISOString().slice(0, 10)

export const useStorage = create<{
	date: string
	setDate: (date: string) => void
	today: string
}>((set) => ({
	date: TODAY,
	setDate: (date) => set({ date }),
	today: TODAY,
}))
