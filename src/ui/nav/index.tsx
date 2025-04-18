import NavItem from './NavItem'
import SportSelector from '@/ui/sport/SportSelector'
import Standings from '@/ui/standings/Standings'
import { cn } from '@/lib/utils'

export default function Nav() {
	const buttonClassName = cn`font-dot standalone:pb-4 not-standalone:pb-[env(safe-area-inset-bottom)] grow text-center uppercase`

	return (
		<nav className="blur-gradient-to-t sticky bottom-0 z-10 mt-auto flex">
			<NavItem label="🏆 Standing" triggerClassName={buttonClassName}>
				<Standings />
			</NavItem>

			<NavItem label="⚙️ Settings" triggerClassName={buttonClassName}>
				<div className="m-auto max-w-max">
					<SportSelector />
				</div>
			</NavItem>
		</nav>
	)
}
