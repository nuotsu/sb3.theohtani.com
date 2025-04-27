import NavItem from './NavItem'
import Leaderboard from '@/ui/stats/Leaderboard'
import Standings from '@/ui/standings/Standings'
import SportSelector from '@/ui/sport/SportSelector'
import SpoilerProtection from '@/ui/spoiler/SpoilerProtection'
import { cn } from '@/lib/utils'

export default function Nav() {
	const navItemClassName = cn`font-dot standalone:[--pb:1rem] not-standalone:[--pb:env(safe-area-inset-bottom)] grow p-2 pb-[max(0.5rem,var(--pb))] text-center uppercase`

	return (
		<nav className="blur-gradient-to-t sticky bottom-0 z-10 mt-auto flex">
			<NavItem label="🥇 Stats" triggerClassName={navItemClassName}>
				<Leaderboard />
			</NavItem>

			<NavItem label="🏆 Standings" triggerClassName={navItemClassName}>
				<Standings />
			</NavItem>

			<NavItem label="⚙️ Settings" triggerClassName={navItemClassName}>
				<div className="gap-lh p-lh flex flex-col items-center text-center">
					<SportSelector className="text-fg bg-transparent" />

					<label className="flex items-center gap-[.5ch]">
						<input id="show-top-performers" type="checkbox" />
						Show top performers
					</label>

					<SpoilerProtection />
				</div>
			</NavItem>
		</nav>
	)
}
