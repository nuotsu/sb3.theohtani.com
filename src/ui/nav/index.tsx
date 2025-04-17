import NavItem from './NavItem'
import SportSelector from '@/ui/sport/SportSelector'
import { cn } from '@/lib/utils'

export default function Nav() {
	const buttonClassName = cn`font-dot grow text-center uppercase`

	return (
		<nav
			className={cn(
				'blur-gradient-to-t sticky bottom-0 z-10 mt-auto flex',
				'standalone:pb-4 not-standalone:pb-[env(safe-area-inset-bottom)]',
			)}
		>
			<a className={buttonClassName} href="#scores">
				⚾ Scores
			</a>

			<a className={buttonClassName} href="#standings">
				🏆 Standings
			</a>

			<NavItem label="⚙️ Settings" triggerClassName={buttonClassName}>
				<SportSelector />
			</NavItem>
		</nav>
	)
}
