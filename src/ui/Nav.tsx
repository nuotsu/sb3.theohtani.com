import { cn } from '@/lib/utils'

export default function Nav() {
	return (
		<nav
			className={cn(
				'blur-gradient-to-t font-dot sticky bottom-0 z-10 mt-auto flex text-center text-xl uppercase *:grow',
				'standalone:pb-4 not-standalone:pb-[env(safe-area-inset-bottom)]',
			)}
		>
			<a href="#scores">⚾ Scores</a>
			<a href="#standings">🏆 Standings</a>
		</nav>
	)
}
