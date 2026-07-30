import { useEffect, useState } from "react";
import { C, EVENT_DATE } from "./Constants";

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

function calculateTimeLeft(): TimeLeft {
	const diff = Math.max(0, EVENT_DATE.getTime() - Date.now());

	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
}

function pad(value: number): string {
	return value.toString().padStart(2, "0");
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				minWidth: 62,
			}}
		>
			<span
				style={{
					fontFamily: "'Bree Serif', serif",
					fontSize: "clamp(1.4rem, 4vw, 2.1rem)",
					color: C.red,
					lineHeight: 1,
				}}
			>
				{pad(value)}
			</span>
			<span
				style={{
					fontFamily: "system-ui, sans-serif",
					fontSize: 11,
					letterSpacing: "0.14em",
					textTransform: "uppercase",
					color: C.muted1,
					marginTop: 6,
				}}
			>
				{label}
			</span>
		</div>
	);
}

export function Countdown() {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
	const [eventStarted, setEventStarted] = useState(
		() => Date.now() >= EVENT_DATE.getTime(),
	);

	useEffect(() => {
		const interval = setInterval(() => {
			const started = Date.now() >= EVENT_DATE.getTime();
			setEventStarted(started);
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	if (eventStarted) {
		return (
			<p
				style={{
					fontFamily: "'Bree Serif', serif",
					fontSize: "clamp(1.1rem, 2.6vw, 1.5rem)",
					color: C.red,
					margin: "0 0 24px",
				}}
			>
				Hoje é o grande dia! 🎓
			</p>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "clamp(10px, 2.5vw, 20px)",
				margin: "0 0 24px",
			}}
		>
			<CountdownUnit value={timeLeft.days} label="dias" />
			<CountdownUnit value={timeLeft.hours} label="horas" />
			<CountdownUnit value={timeLeft.minutes} label="minutos" />
			<CountdownUnit value={timeLeft.seconds} label="segundos" />
		</div>
	);
}
