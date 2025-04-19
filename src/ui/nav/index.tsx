import NavItem from './NavItem'
import Standings from '@/ui/standings/Standings'
import SportSelector from '@/ui/sport/SportSelector'
import SpoilerPrevention from '@/ui/spoiler/SpoilerPrevention'
import { cn } from '@/lib/utils'

export default function Nav() {
	const buttonClassName = cn`font-dot standalone:pb-4 not-standalone:pb-[env(safe-area-inset-bottom)] grow text-center uppercase`

	return (
		<nav className="blur-gradient-to-t sticky bottom-0 z-10 mt-auto flex">
			<NavItem label="🏆 Standing" triggerClassName={buttonClassName}>
				<Standings />
			</NavItem>

			<NavItem
				label="⚙️ Settings"
				triggerClassName={buttonClassName}
				className="mx-auto max-w-max"
			>
				<div className="gap-lh p-lh m-auto flex max-w-max flex-col items-center">
					<SportSelector />
					<SpoilerPrevention />
				</div>
			</NavItem>
		</nav>
	)
}
