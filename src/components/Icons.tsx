import { C } from "./Constants";

export function Heart({
	size = 20,
	color = C.pink,
	style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={color}
			style={style}
			aria-hidden="true"
		>
			<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
		</svg>
	);
}

export function Sparkle({
	size = 16,
	color = C.red,
	style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={color}
			style={style}
			aria-hidden="true"
		>
			<path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" />
		</svg>
	);
}

export function GradCap({
	size = 40,
	style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 48 44"
			fill="none"
			style={style}
			aria-hidden="true"
		>
			<path d="M24 6L4 18L24 30L44 18L24 6Z" fill={C.black} />
			<path d="M24 30V40" stroke={C.black} strokeWidth="2.5" strokeLinecap="round" />
			<path d="M44 18V28" stroke={C.black} strokeWidth="2.5" strokeLinecap="round" />
			<circle cx="44" cy="29" r="2.5" fill={C.black} />
			<path
				d="M12 24V33C12 33 17 38 24 38C31 38 36 33 36 33V24"
				fill={C.muted1}
				opacity="0.25"
			/>
		</svg>
	);
}

export function Stethoscope({
	size = 28,
	style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 32 34"
			fill="none"
			stroke={C.sage}
			strokeWidth="2"
			strokeLinecap="round"
			style={style}
			aria-hidden="true"
		>
			<circle cx="10" cy="6" r="3" />
			<circle cx="22" cy="6" r="3" />
			<path d="M10 9C10 9 10 16 16 16C22 16 22 9 22 9" />
			<line x1="16" y1="16" x2="16" y2="26" />
			<circle cx="16" cy="29" r="3" fill={C.sage} stroke="none" />
		</svg>
	);
}

export function Caduceus({
	size = 22,
	style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 28"
			fill="none"
			stroke={C.sage}
			strokeWidth="1.5"
			strokeLinecap="round"
			style={style}
			aria-hidden="true"
		>
			<line x1="12" y1="2" x2="12" y2="26" />
			<path d="M7 6C7 6 4 8 4 11C4 13 6 14 8 13.5C10 13 11 11 11 11" />
			<path d="M17 6C17 6 20 8 20 11C20 13 18 14 16 13.5C14 13 13 11 13 11" />
			<path d="M7 14C7 14 4 16 5 19C6 21 9 21 10 19.5" />
			<path d="M17 14C17 14 20 16 19 19C18 21 15 21 14 19.5" />
		</svg>
	);
}

export function LaurelLeft({
	size = 48,
	style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
	return (
		<svg
			width={size}
			height={size / 2}
			viewBox="0 0 48 24"
			fill="none"
			style={style}
			aria-hidden="true"
		>
			<path
				d="M24 12C21 10 16 8 11 9C15 9.5 19 11 24 12Z"
				fill={C.sage}
				opacity="0.8"
			/>
			<path
				d="M24 12C20 9 15 5 9 5C14 6 19 8 24 12Z"
				fill={C.sage}
				opacity="0.55"
			/>
			<path
				d="M24 12C21 14 16 16 11 15C15 14.5 19 13 24 12Z"
				fill={C.sage}
				opacity="0.8"
			/>
		</svg>
	);
}

export function LaurelRight({
	size = 48,
	style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
	return (
		<svg
			width={size}
			height={size / 2}
			viewBox="0 0 48 24"
			fill="none"
			style={style}
			aria-hidden="true"
		>
			<path
				d="M24 12C27 10 32 8 37 9C33 9.5 29 11 24 12Z"
				fill={C.sage}
				opacity="0.8"
			/>
			<path
				d="M24 12C28 9 33 5 39 5C34 6 29 8 24 12Z"
				fill={C.sage}
				opacity="0.55"
			/>
			<path
				d="M24 12C27 14 32 16 37 15C33 14.5 29 13 24 12Z"
				fill={C.sage}
				opacity="0.8"
			/>
		</svg>
	);
}

export function DiplomaIcon({
	size = 26,
	style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 28 28"
			fill="none"
			style={style}
			aria-hidden="true"
		>
			<rect
				x="3"
				y="4"
				width="22"
				height="18"
				rx="2"
				fill={C.muted1}
				opacity="0.15"
				stroke={C.muted1}
				strokeWidth="1.4"
			/>
			<path
				d="M3 8h22"
				stroke={C.muted1}
				strokeWidth="1"
				opacity="0.35"
			/>
			<path
				d="M8 12h12M8 15h9M8 18h6"
				stroke={C.muted1}
				strokeWidth="1.2"
				strokeLinecap="round"
				opacity="0.4"
			/>
			<rect x="11" y="20" width="6" height="5" rx="1.5" fill={C.muted2} opacity="0.4" />
		</svg>
	);
}
