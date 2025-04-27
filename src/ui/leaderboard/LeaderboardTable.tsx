export default function LeaderboardTable({
	head,
	children,
}: { head: React.ReactNode } & React.ComponentProps<'tbody'>) {
	return (
		<table className="w-full table-fixed">
			<thead className="sticky top-0 z-1">
				<tr className="text-sm text-current/25 *:p-[.5ch] [&_th]:backdrop-blur">
					<td></td>
					{head}
				</tr>
			</thead>

			<tbody className="text-center">{children}</tbody>
		</table>
	)
}
