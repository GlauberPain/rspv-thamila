import type { GuestStatus } from "../types/rsvp";

const STATUS_STYLES: Record<GuestStatus, { bg: string; color: string; border: string }> = {
	PENDENTE: { bg: "#FFF6DE", color: "#8A6D1D", border: "#F2D889" },
	CONFIRMADO: { bg: "#E7F5EE", color: "#327B64", border: "#A6D9C4" },
	RECUSADO: { bg: "#FBE6E7", color: "#991421", border: "#F0AEB3" },
};

export function StatusBadge({ status }: { status: GuestStatus }) {
	const style = STATUS_STYLES[status];

	return (
		<span
			style={{
				display: "inline-block",
				padding: "4px 12px",
				borderRadius: 999,
				fontFamily: "system-ui, sans-serif",
				fontSize: 11,
				fontWeight: 600,
				letterSpacing: "0.04em",
				textTransform: "uppercase",
				background: style.bg,
				color: style.color,
				border: `1px solid ${style.border}`,
				whiteSpace: "nowrap",
			}}
		>
			{status}
		</span>
	);
}
