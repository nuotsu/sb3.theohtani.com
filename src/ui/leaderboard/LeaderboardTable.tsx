export default function LeaderboardTable({
	head,
	children,
}: { head: React.ReactNode } & React.ComponentProps<'tbody'>) {
	return (
		<table className="min-w-full table-fixed text-center whitespace-nowrap">
			<thead className="bg-bg/50 sticky top-0 z-1 backdrop-blur">
				<tr className="text-sm text-current/25 *:min-w-[3ch]">{head}</tr>
			</thead>

			<tbody className="tabular-nums">{children}</tbody>
		</table>
	)
}
