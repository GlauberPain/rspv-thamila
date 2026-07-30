import type {
	ConfirmationResponse,
	CreateConfirmationPayload,
	CreateConfirmationResponse,
} from "../types/rsvp";

const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

/**
 * Envia os dados de confirmação de presença para a API do Google Apps
 * Script (POST). A API cria a confirmação e retorna `success` e `uuid`.
 *
 * IMPORTANTE: propositalmente NÃO definimos o header `Content-Type` (nem
 * qualquer outro header customizado). Isso faz o navegador tratar a
 * requisição como uma "simple request" (CORS-safelisted), evitando o
 * preflight `OPTIONS` — que o Web App do Google Apps Script não sabe
 * responder e faz a chamada falhar em produção. O corpo continua sendo
 * uma string JSON; o navegador só define o Content-Type efetivo como
 * `text/plain;charset=UTF-8`, e o Apps Script deve ler `e.postData.contents`
 * e fazer `JSON.parse` independentemente do Content-Type recebido.
 */
export async function createConfirmation(
	payload: CreateConfirmationPayload,
): Promise<CreateConfirmationResponse> {
	const response = await fetch(API_URL, {
		method: "POST",
		body: JSON.stringify(payload),
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
