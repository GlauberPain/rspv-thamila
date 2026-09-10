// Réplica em HTML/CSS (inline, compatível com clientes de email) do convite
// exibido na landing page, usada para o email de confirmação de presença.

interface InviteEmailData {
  guestName: string;
  companions: string[];
}

export function buildInviteEmailHtml({ guestName, companions }: InviteEmailData): string {
	const companionsHtml =
    companions.length > 0
    	? `
        <tr>
          <td style="padding: 0 32px 28px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF0F5;border:2px solid #FCE8EF;border-radius:16px;">
              <tr>
                <td style="padding:20px 22px;">
                  <p style="margin:0 0 10px 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#000000;">
                    Acompanhante${companions.length > 1 ? "s" : ""}
                  </p>
                  ${companions
		.map(
			(name, i) => `
                  <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#867E7A;">
                    ${i + 1}. ${name}
                  </p>`,
		)
		.join("")}
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    	: "";

	return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmação de presença</title>
  </head>
  <body style="margin:0;padding:0;background:#FFF5F7;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF5F7;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#FFFFFF;border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(153,20,33,0.12);">
            <!-- Header -->
            <tr>
              <td align="center" style="background:linear-gradient(170deg,#FCE8EF 0%,#F9DCEA 40%,#F4D2E4 100%);padding:40px 32px 28px 32px;">
                <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#991421;">
                  Formatura de Medicina
                </p>
                <h1 style="margin:0 0 6px 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;color:#991421;">
                  Thamila Oliveira da Silva
                </h1>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#867E7A;">
                  Presença confirmada com sucesso! 🎓💕
                </p>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:32px 32px 8px 32px;">
                <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#F47E99;">
                  Convidado(a)
                </p>
                <h2 style="margin:0 0 4px 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#000000;">
                  ${guestName}
                </h2>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#867E7A;">
                  Ficamos muito felizes com sua confirmação! Este email é o seu convite oficial para a festa. 💌
                </p>
              </td>
            </tr>

            <!-- Companions -->
            ${companionsHtml}

            <!-- Event details -->
            <tr>
              <td style="padding:${companions.length > 0 ? "0" : "16px"} 32px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px 0;border-top:1px solid #FCE8EF;">
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#867E7A;">
                        📅 <strong style="color:#000000;">Data</strong> — 20 de novembro de 2026 (Sábado)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-top:1px solid #FCE8EF;">
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#867E7A;">
                        🕖 <strong style="color:#000000;">Horário</strong> — 20h (abertura dos portões)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-top:1px solid #FCE8EF;">
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#867E7A;">
                        📍 <strong style="color:#000000;">Local</strong> — Canto do Vinho, R. Monte Alegre, 2655 - Vila Planalto
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#991421;padding:22px 32px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#FCE8EF;">
                  Com carinho, Thamila &amp; família 💕
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
