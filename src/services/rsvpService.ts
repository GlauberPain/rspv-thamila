import type {
	ConfirmationResponse,
	CreateConfirmationPayload,
	CreateConfirmationResponse,
} from "../types/rsvp";

const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

/**
 * Envia os dados de confirmação de presença para a API do Google Apps
 * Script (POST). A API cria a confirmação e retorna `success` e `uuid`.
 */
export async function createConfirmation(
	payload: CreateConfirmationPayload,
): Promise<CreateConfirmationResponse> {
	const response = await fetch(API_URL, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Falha ao confirmar presença (${response.status})`);
	}

	return (await response.json()) as CreateConfirmationResponse;
}

/**
 * Consulta a API do Google Apps Script (GET ?uuid=...) para verificar se
 * uma confirmação já existe para o UUID informado.
 */
export async function getConfirmationByUuid(
	uuid: string,
): Promise<ConfirmationResponse> {
	const url = `${API_URL}?uuid=${encodeURIComponent(uuid)}`;
	const response = await fetch(url, { method: "GET" });

	if (!response.ok) {
		throw new Error(`Falha ao consultar confirmação (${response.status})`);
	}

	return (await response.json()) as ConfirmationResponse;
}
