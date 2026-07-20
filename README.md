# Landing Page de RSVP - Formatura de Medicina

Esta é uma aplicação React desenvolvida para a confirmação de presença (RSVP) em uma formatura de medicina, com identidade visual personalizada, premium e responsiva.

## 🚀 Tecnologias

- **React** (v19)
- **TypeScript**
- **Vite**
- **Tailwind CSS** (para estilização)

## 🎨 Identidade Visual (Design System)

A interface foi projetada com base nos seguintes princípios:

### Cores
| Cor | Hex | Uso |
| :--- | :--- | :--- |
| Primary | `#991421` | Títulos, Botão Principal |
| Black | `#000000` | Textos, Detalhes |
| Pink | `#F47E99` | Destaques, Decorativo |
| Gray | `#867E7A` | Textos secundários |
| Sage | `#327B64` | Detalhes |
| Dusty Rose | `#9D7980` | Detalhes |
| White | `#FFFFFF` | Fundo principal |

### Tipografia
- **Corpo:** 'Bree Serif'
- **Títulos/Destaques:** 'Great Vibes' (utilizada como alternativa premium à "Buffalo")

## 🏗️ Estrutura de Componentes

O projeto é organizado de forma modular em `src/components/`:

- **`rsvp/`**: Componentes específicos da página de RSVP.
    - `HeroSection.tsx`: Seção de introdução e destaque.
    - `EventInfo.tsx`: Informações sobre data, local e horário.
    - `RSVPForm.tsx`: Formulário de confirmação com gerenciamento de acompanhantes.
    - `ConfirmationScreen.tsx`: Tela exibida após o envio bem-sucedido.
    - `DecorativeElements.tsx`: Ícones e elementos visuais de decoração.
- **`ui/`**: Componentes reutilizáveis do sistema de design.
    - `Button.tsx`: Botão estilizado com variantes.
    - `Input.tsx`: Campo de entrada estilizado com label.
- **`styles/`**:
    - `theme.ts`: Centralização de cores e fontes para o design system.

## 📧 Email de Confirmação (sem backend)

Os campos de email e telefone do formulário são **opcionais**. Se o convidado preencher o email, é enviado automaticamente um email de confirmação — uma réplica do convite em HTML/CSS (`src/emailTemplate.ts`) com o nome principal e a lista de acompanhantes — usando a API do [EmailJS](https://www.emailjs.com/), que permite disparar emails diretamente do navegador, sem precisar manter um servidor de backend.

Se o email não for preenchido, nenhuma tentativa de envio é feita. Da mesma forma, se as credenciais do EmailJS não estiverem configuradas no `.env`, o envio é ignorado silenciosamente — nenhum erro é exibido ao usuário nem lançado em produção, apenas um aviso é registrado no console do navegador (`console.log`).

### Configuração
1. Crie uma conta gratuita em [emailjs.com](https://www.emailjs.com/).
2. Em **Email Services**, conecte o provedor desejado (Gmail, Outlook, SMTP, etc.) e anote o `Service ID`.
3. Em **Email Templates**, crie um template com os seguintes campos (variáveis do EmailJS):
   - `{{to_email}}` — destinatário
   - `{{to_name}}` — nome do convidado
   - `{{{message_html}}}` — conteúdo do email (use chaves triplas para renderizar HTML puro)
   - `{{companions_text}}` — lista de acompanhantes em texto (opcional)
4. Em **Account > Security**, habilite a opção **"Allow EmailJS API for non-browser applications"** (necessária pois o envio é feito via `fetch` direto na API REST).
5. Copie o `Public Key` (Account) e preencha o arquivo `.env` (veja `.env.example`):
   ```
   VITE_EMAILJS_SERVICE_ID=seu_service_id
   VITE_EMAILJS_TEMPLATE_ID=seu_template_id
   VITE_EMAILJS_PUBLIC_KEY=sua_public_key
   ```

### Feedback visual
Após a confirmação, a tela de sucesso exibe o status do envio do email: "Enviando o convite por email...", "✅ Convite enviado para seu email!" ou "⚠️ Não foi possível enviar o email do convite." (caso ocorra algum erro, a confirmação de presença em si não é afetada).

## ⚙️ Como Executar

### Pré-requisitos
- Node.js instalado.
- `npm` (ou gerenciador de pacotes equivalente).

### Passos
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse a aplicação na URL indicada pelo terminal (geralmente `http://localhost:5173`).

## 📦 Publicando no GitHub Pages

O projeto já está configurado para publicação no [GitHub Pages](https://pages.github.com/) usando o pacote [`gh-pages`](https://www.npmjs.com/package/gh-pages).

### Passos
1. Crie um repositório no GitHub e configure-o como `remote` do projeto (`git remote add origin <url-do-repositorio>`).
2. Rode o script de deploy:
   ```bash
   npm run deploy
   ```
   Esse comando executa automaticamente `npm run build` (via `predeploy`) e publica o conteúdo da pasta `dist/` na branch `gh-pages` do repositório.
3. No GitHub, acesse **Settings > Pages** do repositório e selecione a branch `gh-pages` (pasta `/ (root)`) como fonte de publicação, caso ainda não esteja configurada automaticamente.
4. Acesse a URL fornecida pelo GitHub Pages (geralmente `https://<usuario>.github.io/<repositorio>/`).

> O `base` do Vite (`vite.config.ts`) já está definido como caminho relativo (`./`) no build de produção, então o site funciona corretamente independentemente do nome do repositório/subdiretório.

### Domínio customizado (CNAME)

O projeto está configurado para responder pelos seguintes domínios customizados no GitHub Pages:
- `rspv.thamilaoliveiradasilva.med.br`
- `rspv-thamila.gandrei.dev.br`

Esses domínios estão listados no arquivo `public/CNAME`, que é copiado automaticamente para `dist/CNAME` durante o build (`npm run build`). Como reforço, o script `predeploy` (executado antes de `npm run deploy`) também regrava o `dist/CNAME` com os mesmos domínios, garantindo que o arquivo sempre seja publicado corretamente na branch `gh-pages`.

Lembre-se de configurar os registros DNS (`CNAME`/`ALIAS`) de cada domínio apontando para `<usuario>.github.io`, e de configurar o domínio customizado em **Settings > Pages** do repositório no GitHub.

---
*Projeto desenvolvido seguindo as premissas de um convite premium, descontraído e moderno.*
