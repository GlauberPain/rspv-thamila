export type GuestStatus = "PENDENTE" | "CONFIRMADO" | "RECUSADO";

export interface Guest {
	nome: string;
	status: GuestStatus;
}

export interface ConfirmationResponse {
	found: boolean;
	uuid: string;
	nome: string;
	email: string;
	telefone: string;
	status: GuestStatus;
	message: string;
	acompanhantes: Guest[];
}

export interface CreateConfirmationPayload {
	nome: string;
	email: string;
	telefone: string;
	acompanhantes: string[];
}

export interface CreateConfirmationResponse {
	success: boolean;
	uuid: string;
}
