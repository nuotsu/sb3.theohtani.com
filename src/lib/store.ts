import { create } from 'zustand'

const TODAY = new Date().toLocaleDateString('en-CA', {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
})

export const useStorage = create<{
	date: string
	setDate: (date: string) => void
	today: string
}>((set) => ({
	date: TODAY,
	setDate: (date) => set({ date }),
	today: TODAY,
}))
