import { buildInviteEmailHtml } from "./emailTemplate";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

interface SendConfirmationEmailParams {
  toEmail: string;
  guestName: string;
  companions: string[];
}

/**
 * Indica se as credenciais do EmailJS foram configuradas no .env.
 */
export function isEmailServiceConfigured(): boolean {
	const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
	const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
	return !!serviceId && !!templateId && !!publicKey;
}

/**
 * Envia o email de confirmação de presença diretamente do navegador,
 * sem necessidade de backend próprio, usando a API REST do EmailJS.
 *
 * Configuração necessária no .env:
 *  - VITE_EMAILJS_SERVICE_ID
 *  - VITE_EMAILJS_TEMPLATE_ID
 *  - VITE_EMAILJS_PUBLIC_KEY
 *
 * O template do EmailJS deve conter os campos {{to_email}}, {{to_name}}
 * e {{{message_html}}} (com chaves triplas para renderizar HTML puro).
 *
 * Caso as credenciais não estejam configuradas, o envio é simplesmente
 * ignorado (nenhum erro é lançado, mesmo em produção) — apenas um aviso
 * é registrado no console para facilitar o diagnóstico.
 */
export async function sendConfirmationEmail({
	toEmail,
	guestName,
	companions,
}: SendConfirmationEmailParams): Promise<void> {
	const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
	const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

	if (!serviceId || !templateId || !publicKey) {
		console.log(
			"Envio de email de confirmação ignorado: configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID e VITE_EMAILJS_PUBLIC_KEY no .env para habilitar o envio.",
		);
		return;
	}

	const messageHtml = buildInviteEmailHtml({ guestName, companions });

	const response = await fetch(EMAILJS_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			service_id: serviceId,
			template_id: templateId,
			user_id: publicKey,
			template_params: {
				to_email: toEmail,
				to_name: guestName,
				message_html: messageHtml,
				companions_text: companions.join(", "),
			},
		}),
	});

	if (!response.ok) {
		const text = await response.text().catch(() => "");
		throw new Error(`Falha ao enviar email (${response.status}): ${text}`);
	}
}
