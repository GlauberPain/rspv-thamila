export const C = {
	red: "#991421",
	redDeep: "#6B0E17",
	black: "#000000",
	pink: "#F47E99",
	pinkLight: "#FCE8EF",
	pinkSoft: "#FFF0F5",
	sage: "#327B64",
	muted1: "#867E7A",
	muted2: "#9D7980",
	white: "#FFFFFF",
	blush: "#FFF5F7",
} as const;

export interface Companion {
  id: string;
  name: string;
}

export type AppState = "rsvp" | "success";
