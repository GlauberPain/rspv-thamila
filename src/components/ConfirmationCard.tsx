import { Heart, Sparkle } from "./Icons";
import { C, WHATSAPP_NUMBER } from "./Constants";
import { StatusBadge } from "./StatusBadge";
import type { ConfirmationResponse } from "../types/rsvp";

function buildWhatsAppLink(uuid: string): string {
	const message = `Olá! Encontrei minha confirmação de presença com o código ${uuid} e gostaria de conversar sobre ela.`;
	const base = WHATSAPP_NUMBER
		? `https://wa.me/${WHATSAPP_NUMBER}`
		: "https://wa.me/";
	return `${base}?text=${encodeURIComponent(message)}`;
}

function GuestRow({ nome, status }: { nome: string; status: ConfirmationResponse["status"] }) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 12,
				padding: "12px 16px",
				background: C.white,
				border: "2px solid #F0DEE4",
				borderRadius: 10,
			}}
		>
			<span
				style={{
					fontFamily: "system-ui, sans-serif",
					fontSize: 14,
					color: C.black,
				}}
			>
				{nome}
			</span>
			<StatusBadge status={status} />
		</div>
	);
}

export function ConfirmationCard({ data, onOk }: { data: ConfirmationResponse; onOk: () => void }) {
	return (
		<section
			style={{
				padding: "clamp(60px, 8vw, 88px) clamp(20px, 6vw, 72px)",
				background: C.white,
			}}
		>
			<div style={{ maxWidth: 580, margin: "0 auto" }}>
				{/* Section header */}
				<div style={{ textAlign: "center", marginBottom: 36 }}>
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: 10,
							marginBottom: 12,
						}}
					>
						<Heart size={13} color={C.pink} />
						<p
							style={{
								fontFamily: "system-ui, sans-serif",
								fontSize: 10,
								letterSpacing: "0.22em",
								textTransform: "uppercase",
								color: C.red,
							}}
						>
							RSVP
						</p>
						<Heart size={13} color={C.pink} />
					</div>
					<h2
						style={{
							fontFamily: "'Bree Serif', serif",
							fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
							color: C.black,
							marginBottom: 10,
						}}
					>
						Você já confirmou sua presença!
					</h2>
					<p
						style={{
							fontFamily: "system-ui, sans-serif",
							fontSize: 15,
							color: C.muted1,
						}}
					>
						Encontramos uma confirmação neste dispositivo.
					</p>
				</div>

				{/* Guest list */}
				<div
					style={{
						background: C.pinkSoft,
						border: `2px solid ${C.pinkLight}`,
						borderRadius: 16,
						padding: "24px 22px",
						marginBottom: 24,
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: 16,
						}}
					>
						<h3
							style={{
								fontFamily: "'Bree Serif', serif",
								fontSize: 16,
								color: C.black,
							}}
						>
							Convidados
						</h3>
						<Sparkle size={16} color={C.pink} style={{ opacity: 0.65 }} />
					</div>

					<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
						<GuestRow nome={data.nome} status={data.status} />
						{data.acompanhantes.map((guest, i) => (
							<GuestRow key={`${guest.nome}-${i}`} nome={guest.nome} status={guest.status} />
						))}
					</div>
				</div>

				{/* API message */}
				<p
					style={{
						textAlign: "center",
						fontFamily: "system-ui, sans-serif",
						fontSize: 14,
						color: C.muted1,
						lineHeight: 1.6,
						marginBottom: 32,
					}}
				>
					{data.message}
				</p>

				{/* Buttons */}
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: 12,
						justifyContent: "center",
					}}
				>
					<button
						type="button"
						onClick={onOk}
						style={{
							minWidth: 160,
							padding: "15px 32px",
							background: C.red,
							color: C.white,
							border: "none",
							borderRadius: 12,
							fontFamily: "'Bree Serif', serif",
							fontSize: 16,
							cursor: "pointer",
							boxShadow: "0 4px 20px rgba(153,20,33,0.3)",
						}}
					>
						OK
					</button>
					<a
						href={buildWhatsAppLink(data.uuid)}
						target="_blank"
						rel="noopener noreferrer"
						style={{
							minWidth: 160,
							padding: "15px 32px",
							background: "transparent",
							color: C.sage,
							border: `2px solid ${C.sage}`,
							borderRadius: 12,
							fontFamily: "'Bree Serif', serif",
							fontSize: 16,
							textAlign: "center",
							textDecoration: "none",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						Conversar com Thamila
					</a>
				</div>
			</div>
		</section>
	);
}
