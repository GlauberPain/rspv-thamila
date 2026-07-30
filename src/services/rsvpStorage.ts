import { RSVP_UUID_STORAGE_KEY } from "../components/Constants";

/**
 * Encapsula o acesso ao localStorage para o UUID de confirmação de RSVP.
 */
export function getSavedRsvpUuid(): string | null {
	return localStorage.getItem(RSVP_UUID_STORAGE_KEY);
}

export function saveRsvpUuid(uuid: string): void {
	localStorage.setItem(RSVP_UUID_STORAGE_KEY, uuid);
}

export function clearRsvpUuid(): void {
	localStorage.removeItem(RSVP_UUID_STORAGE_KEY);
}
