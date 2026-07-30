import { useEffect, useState } from "react";
import perfilImage from "./assets/centro.svg";
import esquerdaImage from "./assets/esquerda.svg";
import direitaImage from "./assets/direita.svg";
import { C } from "./components/Constants";
import type { Companion, AppState } from "./components/Constants";
import { Heart, Sparkle, GradCap, Stethoscope, Caduceus, LaurelLeft, LaurelRight, DiplomaIcon } from "./components/Icons";
import { Countdown } from "./components/Countdown";
import { ConfirmationCard } from "./components/ConfirmationCard";
import { capitalizeWords, maskPhone } from "./utils";
import { isEmailServiceConfigured, sendConfirmationEmail } from "./emailService";
import { createConfirmation, getConfirmationByUuid } from "./services/rsvpService";
import { clearRsvpUuid, getSavedRsvpUuid, saveRsvpUuid } from "./services/rsvpStorage";
import type { ConfirmationResponse } from "./types/rsvp";

type EmailStatus = "idle" | "sending" | "success" | "error";

// ─── Photo placeholder ────────────────────────────────────────────────────────

function MainPhotoPlaceholder() {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				maxWidth: 340,
				margin: "0 auto",
			}}
		>
			{/* Grad cap floating above */}
			<div
				style={{
					position: "absolute",
					top: -32,
					right: 24,
					zIndex: 3,
					transform: "rotate(8deg)",
				}}
			>
				<GradCap size={48} />
			</div>

			{/* Pink sparkle top-left */}
			<Sparkle
				size={18}
				color={C.pink}
				style={{ position: "absolute", top: 12, left: -4, zIndex: 3 }}
			/>

			{/* Small heart top-right */}
			<Heart
				size={14}
				color={C.red}
				style={{
					position: "absolute",
					top: 6,
					right: 6,
					zIndex: 3,
					opacity: 0.7,
				}}
			/>

			{/* Main portrait frame */}
			<div
				aria-label="Espaço para foto principal da formanda"
				style={{
					width: "100%",
					paddingBottom: "133%",
					position: "relative",
					borderRadius: "180px 180px 28px 28px",
					background:
						"linear-gradient(170deg, #FCE8EF 0%, #F9DCEA 40%, #F4D2E4 100%)",
					border: `2px solid ${C.pink}`,
					overflow: "hidden",
					boxShadow:
						"8px 16px 48px rgba(153,20,33,0.14), 0 2px 8px rgba(244,126,153,0.2)",
				}}
			>
				<img
					src={perfilImage}
					alt="Foto de perfil"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						position: "absolute",
						top: 0,
						left: 0,
					}}
				/>
				{/* Inner soft vignette */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						background:
							"radial-gradient(ellipse at 50% 85%, rgba(244,126,153,0.12) 0%, transparent 70%)",
						pointerEvents: "none",
					}}
				/>
			</div>

			{/* Secondary photo — sage circle, left */}
			<div
				aria-label="Espaço para foto secundária"
				style={{
					position: "absolute",
					top: 72,
					left: -56,
					width: 88,
					height: 88,
					borderRadius: "50%",
					background: "linear-gradient(135deg, #E3F2ED 0%, #D0EAE2 100%)",
					border: `2.5px solid ${C.sage}`,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "0 4px 18px rgba(50,123,100,0.18)",
					zIndex: 2,
					overflow: "hidden",
				}}
			>
				<img
					src={esquerdaImage}
					alt="Foto secundária esquerda"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			</div>

			{/* Secondary photo — pink rounded square, right, rotated */}
			<div
				aria-label="Espaço para foto secundária"
				style={{
					position: "absolute",
					bottom: 48,
					right: -44,
					width: 76,
					height: 76,
					borderRadius: 14,
					background: "linear-gradient(135deg, #FDE8F0 0%, #FBD8E8 100%)",
					border: `2.5px solid ${C.pink}`,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "0 4px 14px rgba(244,126,153,0.22)",
					transform: "rotate(6deg)",
					zIndex: 2,
					overflow: "hidden",
				}}
			>
				<img
					src={direitaImage}
					alt="Foto secundária direita"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			</div>

			{/* Stethoscope bottom-left */}
			<Stethoscope
				size={28}
				style={{
					position: "absolute",
					bottom: 6,
					left: -12,
					opacity: 0.65,
					zIndex: 3,
				}}
			/>
		</div>
	);
}

// ─── Input field ──────────────────────────────────────────────────────────────

function InputField({
	label,
	type = "text",
	required = false,
	placeholder,
	value,
	onChange,
}: {
	label: string;
	type?: string;
	required?: boolean;
	placeholder?: string;
	value: string;
	onChange: (v: string) => void;
}) {
	const [focused, setFocused] = useState(false);
	const id = `f-${label.toLowerCase().replace(/\s+/g, "-")}`;
	return (
		<div>
			<label
				htmlFor={id}
				style={{
					display: "block",
					fontFamily: "'Bree Serif', serif",
					fontSize: 13,
					color: C.black,
					marginBottom: 8,
				}}
			>
				{label}
				{required && (
					<span style={{ color: C.red, marginLeft: 3 }}>*</span>
				)}
			</label>
			<input
				id={id}
				type={type}
				required={required}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				style={{
					width: "100%",
					padding: "13px 16px",
					background: C.white,
					border: `2px solid ${focused ? C.red : "#E8DEE0"}`,
					borderRadius: 10,
					fontFamily: "system-ui, sans-serif",
					fontSize: 15,
					color: C.black,
					outline: "none",
					transition: "border-color 0.18s ease, box-shadow 0.18s ease",
					boxShadow: focused
						? "0 0 0 4px rgba(153,20,33,0.08)"
						: "0 1px 3px rgba(0,0,0,0.05)",
				}}
			/>
		</div>
	);
}

// ─── Companion field ──────────────────────────────────────────────────────────

function CompanionField({
	index,
	value,
	onChange,
	onRemove,
}: {
	index: number;
	value: string;
	onChange: (v: string) => void;
	onRemove: () => void;
}) {
	const [focused, setFocused] = useState(false);
	return (
		<div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
			<div style={{ flex: 1 }}>
				<label
					style={{
						display: "block",
						fontFamily: "'Bree Serif', serif",
						fontSize: 12,
						color: C.muted1,
						marginBottom: 6,
					}}
				>
					Acompanhante {index}
				</label>
				<input
					type="text"
					placeholder="Nome completo"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					style={{
						width: "100%",
						padding: "11px 14px",
						background: C.white,
						border: `2px solid ${focused ? C.pink : "#F0DEE4"}`,
						borderRadius: 8,
						fontFamily: "system-ui, sans-serif",
						fontSize: 14,
						color: C.black,
						outline: "none",
						transition: "border-color 0.15s ease",
					}}
				/>
			</div>
			<button
				type="button"
				onClick={onRemove}
				aria-label={`Remover acompanhante ${index}`}
				style={{
					width: 40,
					height: 40,
					border: "2px solid #F0DEE4",
					borderRadius: 8,
					background: "transparent",
					color: C.muted1,
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					transition: "all 0.15s",
					flexShrink: 0,
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.borderColor = "#FFBBBB";
					e.currentTarget.style.color = "#CC2222";
					e.currentTarget.style.background = "#FFF5F5";
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.borderColor = "#F0DEE4";
					e.currentTarget.style.color = C.muted1;
					e.currentTarget.style.background = "transparent";
				}}
			>
				<svg
					width="11"
					height="11"
					viewBox="0 0 11 11"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<path d="M1 1L10 10M10 1L1 10" />
				</svg>
			</button>
		</div>
	);
}

// ─── Hero section ─────────────────────────────────────────────────────────────

function HeroSection() {
	return (
		<section
			style={{
				background: C.white,
				padding:
					"clamp(56px, 8vw, 96px) clamp(20px, 6vw, 72px) 0",
				position: "relative",
				overflow: "visible",
			}}
		>
			{/* Dot pattern — top right */}
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					top: 0,
					right: 0,
					width: 220,
					height: 220,
					backgroundImage: `radial-gradient(circle, ${C.pink} 1.5px, transparent 1.5px)`,
					backgroundSize: "18px 18px",
					opacity: 0.18,
					pointerEvents: "none",
				}}
			/>

			{/* Dot pattern — bottom left */}
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					bottom: 40,
					left: 0,
					width: 160,
					height: 160,
					backgroundImage: `radial-gradient(circle, ${C.red} 1.5px, transparent 1.5px)`,
					backgroundSize: "16px 16px",
					opacity: 0.07,
					pointerEvents: "none",
				}}
			/>

			<div
				style={{
					maxWidth: 1160,
					margin: "0 auto",
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
					gap: "48px 72px",
					alignItems: "flex-end",
				}}
			>
				{/* LEFT: Text content */}
				<div style={{ paddingBottom: 64 }}>
					{/* É OFICIAL eyebrow */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
							marginBottom: 14,
						}}
					>
						<Heart size={15} color={C.pink} />
						<Heart size={20} color={C.red} />
						<p
							style={{
								fontFamily: "'Bree Serif', serif",
								fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
								color: C.red,
								letterSpacing: "0.05em",
								textTransform: "uppercase",
							}}
						>
							É OFICIAL
						</p>
						<Heart size={15} color={C.pink} />
					</div>

					{/* Main title — Buffalo style via Lilita One */}
					<div style={{ position: "relative", marginBottom: 6 }}>
						<Sparkle
							size={20}
							color={C.red}
							style={{ position: "absolute", top: -16, left: -6 }}
						/>
						<Sparkle
							size={13}
							color={C.pink}
							style={{ position: "absolute", top: 2, right: -22 }}
						/>
						<h1
							className="font-buffalo text-[9rem] font-normal text-black m-0 tracking-[-0.01em]"
							style={{ fontFamily: "'Buffalo', cursive", fontSize: '9rem', lineHeight: 0.75, margin: 0 }}
						>
							Vou{" "}
							<span style={{ color: C.red }}>Formar!!</span>
						</h1>
					</div>

					{/* Countdown */}
					<Countdown />

					{/* Subtitle */}
					<p
						style={{
							fontFamily: "'Bree Serif', serif",
							fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
							color: C.muted1,
							margin: "18px 0 36px",
						}}
					>
						Bora comemorar comigo?
					</p>

					{/* Name with laurels */}
					<div
						style={{
							display: "inline-flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginBottom: 20,
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: 0 }}>
							<LaurelLeft size={56} />
							<p
								style={{
									fontFamily: "'Bree Serif', serif",
									fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
									color: C.red,
									lineHeight: 1.1,
									margin: "0 10px",
								}}
							>
								Thamila Oliveira da Silva
							</p>
							<LaurelRight size={56} />
						</div>
						<p
							style={{
								fontFamily: "system-ui, sans-serif",
								fontSize: 10,
								color: C.muted1,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								marginTop: 6,
								marginLeft: 56,
							}}
						>
							Médica · CRM em andamento
						</p>
					</div>

					{/* Emotional text */}
					<p
						style={{
							fontFamily: "system-ui, sans-serif",
							fontSize: "clamp(14px, 1.6vw, 16px)",
							color: C.muted1,
							lineHeight: 1.72,
							maxWidth: 440,
							fontWeight: 400,
						}}
					>
						Seis anos de dedicação, madrugadas de estudo e muita superação
						chegaram ao fim. Agora é hora de celebrar com as pessoas que eu
						mais amo.{" "}
						<span style={{ color: C.pink }}>♡</span>
					</p>

					{/* Medical icon strip */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							marginTop: 36,
							opacity: 0.55,
						}}
					>
						<div
							style={{
								height: 2,
								width: 36,
								background: C.red,
								borderRadius: 1,
							}}
						/>
						<Caduceus size={18} />
						<DiplomaIcon size={18} />
						<Stethoscope size={18} />
						<div
							style={{
								height: 2,
								flex: 1,
								background: `linear-gradient(to right, rgba(153,20,33,0.5), transparent)`,
								borderRadius: 1,
							}}
						/>
					</div>
				</div>

				{/* RIGHT: Photo */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "flex-end",
						padding: "0 clamp(0px, 3vw, 24px)",
					}}
				>
					<MainPhotoPlaceholder />
				</div>
			</div>
		</section>
	);
}

// ─── Event info section ───────────────────────────────────────────────────────

function EventSection() {
	const cards = [
		{
			emoji: "📅",
			label: "Data",
			value: "20 de novembro de 2026",
			sub: "Sábado",
		},
		{
			emoji: "🕖",
			label: "Horário",
			value: "20h",
			sub: "Abertura dos portões",
		},
		{
			emoji: "📍",
			label: "Local",
			value: "Canto do Vinho",
			sub: "R. Monte Alegre, 2655 - Vila Planalto",
		},
	];

	return (
		<section
			style={{
				padding: "clamp(60px, 8vw, 88px) clamp(20px, 6vw, 72px)",
				background: C.blush,
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Dot accent — bottom-left */}
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					bottom: -24,
					left: -24,
					width: 200,
					height: 200,
					backgroundImage: `radial-gradient(circle, ${C.red} 1.5px, transparent 1.5px)`,
					backgroundSize: "18px 18px",
					opacity: 0.07,
					pointerEvents: "none",
				}}
			/>

			<div style={{ maxWidth: 920, margin: "0 auto" }}>
				{/* Header */}
				<div style={{ textAlign: "center", marginBottom: 48 }}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							gap: 10,
							marginBottom: 10,
						}}
					>
						<Sparkle size={14} color={C.pink} />
						<Sparkle size={10} color={C.red} style={{ marginTop: 4 }} />
						<Sparkle size={14} color={C.pink} />
					</div>
					<h2
						style={{
							fontFamily: "'Bree Serif', serif",
							fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
							color: C.black,
							marginBottom: 8,
						}}
					>
						Detalhes da festa
					</h2>
					<p
						style={{
							fontFamily: "system-ui, sans-serif",
							fontSize: 15,
							color: C.muted1,
						}}
					>
						Anote na agenda. Você não pode faltar!
					</p>
				</div>

				{/* Cards */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
						gap: 20,
					}}
				>
					{cards.map((card) => (
						<div
							key={card.label}
							style={{
								background: C.white,
								borderRadius: 18,
								padding: "28px 22px",
								textAlign: "center",
								position: "relative",
								overflow: "hidden",
								boxShadow:
									"0 2px 20px rgba(153,20,33,0.07), 0 1px 4px rgba(153,20,33,0.04)",
							}}
						>
							{/* Top gradient accent */}
							<div
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									height: 4,
									background: `linear-gradient(to right, ${C.red}, ${C.pink})`,
									borderRadius: "18px 18px 0 0",
								}}
							/>
							<div style={{ fontSize: 30, marginBottom: 14 }}>
								{card.emoji}
							</div>
							<p
								style={{
									fontFamily: "system-ui, sans-serif",
									fontSize: 10,
									letterSpacing: "0.18em",
									textTransform: "uppercase",
									color: C.muted1,
									marginBottom: 8,
								}}
							>
								{card.label}
							</p>
							<p
								style={{
									fontFamily: "'Bree Serif', serif",
									fontSize: 18,
									color: C.black,
									lineHeight: 1.3,
									marginBottom: 5,
								}}
							>
								{card.value}
							</p>
							<p
								style={{
									fontFamily: "system-ui, sans-serif",
									fontSize: 12,
									color: C.muted2,
								}}
							>
								{card.sub}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── RSVP form section ────────────────────────────────────────────────────────

function RSVPSection({
						 onSuccess,
					 }: {
	onSuccess: (data: {
		guestName: string;
		companions: string[];
		email: string;
		uuid: string;
	}) => void;
}) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [companions, setCompanions] = useState<Companion[]>([]);
	const [submitting, setSubmitting] = useState(false);
	const [addHovered, setAddHovered] = useState(false);

	function addCompanion() {
		setCompanions((prev) => [
			...prev,
			{ id: `${Date.now()}-${Math.random()}`, name: "" },
		]);
	}

	function removeCompanion(id: string) {
		setCompanions((prev) => prev.filter((c) => c.id !== id));
	}

	function updateCompanion(id: string, name: string) {
		setCompanions((prev) =>
			prev.map((c) => (c.id === id ? { ...c, name } : c)),
		);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);

		const guestName = capitalizeWords(name);
		const guestCompanions = companions.map((c) => capitalizeWords(c.name));

		const payload = {
			nome: guestName,
			email,
			telefone: maskPhone(phone),
			acompanhantes: guestCompanions,
			enviarEmail: !!email,
		};

		try {
			const result = await createConfirmation(payload);
			if (result.uuid) {
				saveRsvpUuid(result.uuid);
			}
			onSuccess({ guestName, companions: guestCompanions, email, uuid: result.uuid });
		} catch (err) {
			console.error(err);
			alert("Erro ao confirmar presença. Tente novamente.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<section
			style={{
				padding: "clamp(60px, 8vw, 88px) clamp(20px, 6vw, 72px)",
				background: C.white,
			}}
		>
			<div style={{ maxWidth: 580, margin: "0 auto" }}>
				{/* Section header */}
				<div style={{ textAlign: "center", marginBottom: 44 }}>
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
						Confirme sua presença
					</h2>
					<p
						style={{
							fontFamily: "system-ui, sans-serif",
							fontSize: 15,
							color: C.muted1,
						}}
					>
						Preencha os dados abaixo para confirmar sua presença.
					</p>
				</div>

				<form onSubmit={handleSubmit} noValidate>
					{/* Guest fields */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 18,
							marginBottom: 28,
						}}
					>
						<InputField
							label="Nome completo"
							required
							placeholder="Seu nome completo"
							value={name}
							onChange={setName}
						/>
						<InputField
							label="Email"
							type="email"
							placeholder="seu@email.com"
							value={email}
							onChange={setEmail}
						/>
						<InputField
							label="Telefone"
							type="tel"
							placeholder="(00) 00000-0000"
							value={phone}
							onChange={(v) => setPhone(maskPhone(v))}
						/>
					</div>

					{/* Companions block */}
					<div
						style={{
							background: C.pinkSoft,
							border: `2px solid ${C.pinkLight}`,
							borderRadius: 16,
							padding: "24px 22px",
							marginBottom: 28,
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "flex-start",
								justifyContent: "space-between",
								marginBottom: companions.length > 0 ? 20 : 16,
							}}
						>
							<div>
								<h3
									style={{
										fontFamily: "'Bree Serif', serif",
										fontSize: 18,
										color: C.black,
										marginBottom: 4,
									}}
								>
									Acompanhantes
								</h3>
								<p
									style={{
										fontFamily: "system-ui, sans-serif",
										fontSize: 12,
										color: C.muted2,
									}}
								>
									{companions.length === 0
										? "Nenhum acompanhante ainda"
										: `${companions.length} acompanhante${companions.length > 1 ? "s" : ""} adicionado${companions.length > 1 ? "s" : ""}`}
								</p>
							</div>
							<Heart size={18} color={C.pink} style={{ opacity: 0.65 }} />
						</div>

						{companions.length > 0 && (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 12,
									marginBottom: 14,
								}}
							>
								{companions.map((c, i) => (
									<CompanionField
										key={c.id}
										index={i + 1}
										value={c.name}
										onChange={(v) => updateCompanion(c.id, v)}
										onRemove={() => removeCompanion(c.id)}
									/>
								))}
							</div>
						)}

						<button
							type="button"
							onClick={addCompanion}
							onMouseEnter={() => setAddHovered(true)}
							onMouseLeave={() => setAddHovered(false)}
							style={{
								width: "100%",
								padding: "12px",
								border: `2px dashed ${addHovered ? C.pink : "#F0C4CF"}`,
								borderRadius: 10,
								background: addHovered
									? "rgba(244,126,153,0.07)"
									: "transparent",
								color: addHovered ? C.red : C.muted2,
								fontFamily: "'Bree Serif', serif",
								fontSize: 14,
								cursor: "pointer",
								transition: "all 0.15s ease",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 8,
							}}
						>
							<span
								style={{
									fontSize: 18,
									lineHeight: 1,
									fontFamily: "system-ui",
									color: C.pink,
								}}
							>
                +
							</span>
							Adicionar acompanhante
						</button>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={submitting}
						style={{
							width: "100%",
							padding: "17px",
							background: submitting ? "#7A1019" : C.red,
							color: C.white,
							border: "none",
							borderRadius: 12,
							fontFamily: "'Bree Serif', serif",
							fontSize: 18,
							cursor: submitting ? "not-allowed" : "pointer",
							transition: "background 0.2s ease",
							letterSpacing: "0.01em",
							boxShadow: submitting
								? "none"
								: "0 4px 20px rgba(153,20,33,0.3)",
							opacity: submitting ? 0.8 : 1,
						}}
						onMouseEnter={(e) => {
							if (!submitting) e.currentTarget.style.background = C.redDeep;
						}}
						onMouseLeave={(e) => {
							if (!submitting) e.currentTarget.style.background = C.red;
						}}
					>
						{submitting ? "Confirmando..." : "Confirmar presença"}
					</button>

					<p
						style={{
							textAlign: "center",
							marginTop: 12,
							fontFamily: "system-ui, sans-serif",
							fontSize: 12,
							color: C.muted1,
						}}
					>
						Campos com <span style={{ color: C.red }}>*</span> são
						obrigatórios
					</p>
				</form>
			</div>
		</section>
	);
}

// ─── Success page ─────────────────────────────────────────────────────────────

function SuccessPage({
						 onBack,
						 emailStatus,
						 hasEmail,
					 }: {
	onBack: () => void;
	emailStatus: EmailStatus;
	hasEmail: boolean;
}) {
	const [hovered, setHovered] = useState(false);
	return (
		<div
			style={{
				minHeight: "100vh",
				background: C.white,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "60px 24px",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Dot bg */}
			<div
				aria-hidden="true"
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage: `radial-gradient(circle, ${C.pink} 1.5px, transparent 1.5px)`,
					backgroundSize: "24px 24px",
					opacity: 0.1,
					pointerEvents: "none",
				}}
			/>

			{/* Scattered hearts */}
			<Heart
				size={36}
				color={C.pink}
				style={{
					position: "absolute",
					top: "12%",
					left: "8%",
					opacity: 0.28,
					transform: "rotate(-18deg)",
				}}
			/>
			<Heart
				size={22}
				color={C.red}
				style={{
					position: "absolute",
					top: "22%",
					right: "10%",
					opacity: 0.22,
					transform: "rotate(12deg)",
				}}
			/>
			<Heart
				size={18}
				color={C.pink}
				style={{
					position: "absolute",
					bottom: "18%",
					left: "14%",
					opacity: 0.28,
				}}
			/>
			<Sparkle
				size={26}
				color={C.red}
				style={{
					position: "absolute",
					top: "10%",
					right: "22%",
					opacity: 0.18,
				}}
			/>
			<Sparkle
				size={18}
				color={C.pink}
				style={{
					position: "absolute",
					bottom: "28%",
					right: "9%",
					opacity: 0.22,
				}}
			/>
			<GradCap
				size={44}
				style={{
					position: "absolute",
					bottom: "15%",
					right: "16%",
					opacity: 0.14,
				}}
			/>

			<div
				style={{
					textAlign: "center",
					maxWidth: 480,
					position: "relative",
					zIndex: 1,
				}}
			>
				{/* Check circle */}
				<div
					style={{
						width: 90,
						height: 90,
						borderRadius: "50%",
						background: `linear-gradient(135deg, ${C.red} 0%, #CC2030 100%)`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0 auto 32px",
						boxShadow: "0 8px 32px rgba(153,20,33,0.28)",
					}}
				>
					<svg
						width="36"
						height="36"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="M20 6L9 17L4 12" />
					</svg>
				</div>

				{/* Decoration row */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						gap: 10,
						marginBottom: 10,
					}}
				>
					<Heart size={16} color={C.pink} />
					<Sparkle size={14} color={C.red} />
					<Heart size={16} color={C.pink} />
				</div>

				<h1
					style={{
						fontFamily: "'Bree Serif', serif",
						fontSize: "clamp(1.9rem, 5.5vw, 2.8rem)",
						color: C.black,
						marginBottom: 16,
					}}
				>
					✔ Presença confirmada!
				</h1>

				<p
					style={{
						fontFamily: "system-ui, sans-serif",
						fontSize: "clamp(15px, 1.8vw, 16px)",
						color: C.muted1,
						lineHeight: 1.7,
						marginBottom: 40,
					}}
				>
					Obrigado por confirmar sua presença.
					<br />
					Estamos ansiosos para celebrar esse momento especial com você!
				</p>

				{/* Event reminder */}
				<div
					style={{
						padding: "20px 28px",
						background: C.blush,
						border: `2px solid ${C.pinkLight}`,
						borderRadius: 16,
						marginBottom: 36,
					}}
				>
					<p
						style={{
							fontFamily: "'Bree Serif', serif",
							fontSize: 17,
							color: C.red,
							marginBottom: 5,
						}}
					>
						20 de novembro · 20h
					</p>
					<p
						style={{
							fontFamily: "system-ui, sans-serif",
							fontSize: 13,
							color: C.muted1,
						}}
					>
						Canto do Vinho
					</p>
				</div>

				<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

				{/* Email feedback + botão de voltar, lado a lado */}
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						alignItems: "center",
						justifyContent: "center",
						gap: 4
					}}
				>
					{hasEmail && (
						<div
							style={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								boxSizing: "border-box",
								minHeight: 52,
								padding: 16,
								borderRadius: 12,
								fontFamily: "system-ui, sans-serif",
								fontSize: 14,
								...(emailStatus === "sending" && {
									background: C.pinkSoft,
									color: C.red,
									border: `2px solid ${C.pinkLight}`,
								}),
								...(emailStatus === "success" && {
									background: "#E7F5EE",
									color: C.sage,
									border: `2px solid ${C.sage}`,
								}),
								...(emailStatus === "error" && {
									background: C.blush,
									color: C.red,
									border: `2px solid ${C.red}`,
								}),
							}}
						>
							{emailStatus === "sending" && (
								<>
									<span
										aria-hidden="true"
										style={{
											width: 14,
											height: 14,
											borderRadius: "50%",
											border: `2px solid ${C.red}`,
											borderTopColor: "transparent",
											animation: "spin 0.8s linear infinite",
										}}
									/>
									Enviando o convite por email...
								</>
							)}
							{emailStatus === "success" && (
								<>✅ Convite enviado para seu email!</>
							)}
							{emailStatus === "error" && (
								<>⚠️ Não foi possível enviar o email do convite.</>
							)}
						</div>
					)}

					<button
						onClick={onBack}
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						style={{
							display: "inline-block",
							boxSizing: "border-box",
							minWidth: 220,
							minHeight: 56,
							padding: "18px 48px",
							border: `2px solid ${C.red}`,
							borderRadius: 12,
							background: hovered ? C.red : "transparent",
							color: hovered ? C.white : C.red,
							fontFamily: "'Bree Serif', serif",
							fontSize: 16,
							lineHeight: 1.2,
							cursor: "pointer",
							transition: "all 0.18s ease",
						}}
					>
						Voltar ao início
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
	return (
		<footer
			style={{
				padding: "40px 24px",
				background: C.black,
				textAlign: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: 12,
					marginBottom: 16,
				}}
			>
				<Heart size={12} color={C.pink} style={{ opacity: 0.55 }} />
				<Sparkle size={10} color={C.red} style={{ opacity: 0.45 }} />
				<Heart size={12} color={C.pink} style={{ opacity: 0.55 }} />
			</div>
			<p
				style={{
					fontFamily: "'Bree Serif', serif",
					fontSize: 13,
					color: "rgba(255,255,255,0.35)",
					letterSpacing: "0.06em",
				}}
			>
				Formatura de Medicina · Thamila Oliveira da Silva · 2026
			</p>
		</footer>
	);
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
	const [appState, setAppState] = useState<AppState>(() =>
		getSavedRsvpUuid() ? "checking" : "rsvp",
	);
	const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
	const [hasEmail, setHasEmail] = useState(false);
	const [confirmation, setConfirmation] = useState<ConfirmationResponse | null>(null);

	useEffect(() => {
		const savedUuid = getSavedRsvpUuid();

		if (!savedUuid) {
			return;
		}

		let cancelled = false;

		getConfirmationByUuid(savedUuid)
			.then((response) => {
				if (cancelled) return;

				if (!response.found) {
					clearRsvpUuid();
					setAppState("rsvp");
					return;
				}

				setConfirmation(response);
				setAppState("confirmed");
			})
			.catch((err) => {
				console.error(err);
				if (!cancelled) setAppState("rsvp");
			});

		return () => {
			cancelled = true;
		};
	}, []);

	async function handleRsvpSuccess({
										 guestName,
										 companions,
										 email,
									 }: {
		guestName: string;
		companions: string[];
		email: string;
		uuid: string;
	}) {
		setAppState("success");

		if (!email) {
			setHasEmail(false);
			return;
		}

		if (!isEmailServiceConfigured()) {
			console.log(
				"Envio de email de confirmação ignorado: configure as credenciais do EmailJS no .env.",
			);
			setHasEmail(false);
			return;
		}

		setHasEmail(true);
		setEmailStatus("sending");
		try {
			await sendConfirmationEmail({ toEmail: email, guestName, companions });
			setEmailStatus("success");
		} catch (err) {
			console.error(err);
			setEmailStatus("error");
		}
	}

	if (appState === "success") {
		return (
			<SuccessPage
				onBack={() => setAppState("rsvp")}
				emailStatus={emailStatus}
				hasEmail={hasEmail}
			/>
		);
	}

	return (
		<div>
			<HeroSection />
			<EventSection />
			{appState === "confirmed" && confirmation ? (
				<ConfirmationCard
					data={confirmation}
					onOk={() => setAppState("rsvp")}
				/>
			) : appState === "rsvp" ? (
				<RSVPSection onSuccess={handleRsvpSuccess} />
			) : null}
			<Footer />
		</div>
	);
}
