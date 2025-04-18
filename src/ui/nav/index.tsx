import NavItem from './NavItem'
import Standings from '@/ui/standings/Standings'
import SportSelector from '@/ui/sport/SportSelector'
import SpoilerProtection from '@/ui/spoiler/SpoilerProtection'
import { cn } from '@/lib/utils'

export default function Nav() {
	const buttonClassName = cn`font-dot standalone:[--pb:1rem] not-standalone:[--pb:env(safe-area-inset-bottom)] grow p-2 pb-[max(0.5rem,var(--pb))] text-center uppercase`

	return (
		<nav className="blur-gradient-to-t sticky bottom-0 z-10 mt-auto flex">
			<NavItem label="🏆 Standings" triggerClassName={buttonClassName}>
				<Standings />
			</NavItem>

			<NavItem label="⚙️ Settings" triggerClassName={buttonClassName}>
				<div className="gap-lh p-lh flex flex-col text-center">
					<div>
						<SportSelector />
					</div>

					<SpoilerProtection />
				</div>
			</NavItem>
		</nav>
	)
}
