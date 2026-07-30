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

export type AppState = "checking" | "rsvp" | "confirmed" | "success";

/** Data e hora do evento, centralizadas para facilitar futuras alterações. */
export const EVENT_DATE = new Date("2026-11-20T20:00:00-03:00");

/** Chave utilizada para persistir o UUID da confirmação no localStorage. */
export const RSVP_UUID_STORAGE_KEY = "rsvp_uuid";

/** Número de WhatsApp (com DDI e DDD) para contato com a Thamila. */
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? "";
