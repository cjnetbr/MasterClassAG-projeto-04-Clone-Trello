# SlothuiKanban — Gerenciador de Projetos Kanban com Notificações Automáticas

**Vision:** Plataforma Kanban onde cada card representa um projeto de cliente. Ao mover um card entre colunas, o sistema captura as notas da etapa anterior e dispara um e-mail automático de atualização para o cliente vinculado ao card.

**For:** Freelancers, agências e times de serviço que precisam manter clientes informados sobre o progresso dos projetos sem esforço manual.

**Solves:** A comunicação fragmentada entre prestadores de serviço e clientes — elimina o trabalho manual de enviar updates periódicos por e-mail resumindo o que foi feito em cada etapa.

---

## Goals

- [ ] Usuário consegue criar boards, colunas e cards Kanban e movê-los com drag-and-drop em < 3 segundos de resposta
- [ ] Ao mover um card para a próxima coluna, o cliente vinculado recebe um e-mail automático com o resumo das notas da etapa concluída em < 60 segundos
- [ ] Sistema de autenticação seguro permite múltiplos usuários isolados por workspace
- [ ] App deployado na Vercel com uptime > 99%

---

## Tech Stack

**Core:**

- Framework: Next.js 15 (App Router)
- Language: TypeScript 5
- Database: Supabase (PostgreSQL + Realtime + Auth)
- Styling: Tailwind CSS v4

**Key dependencies:**

- `@dnd-kit/core` + `@dnd-kit/sortable` — drag-and-drop acessível e performático
- `@supabase/ssr` — integração Supabase com Next.js SSR
- `resend` — envio de e-mails transacionais via Supabase Edge Functions
- `shadcn/ui` — componentes base acessíveis e estilizáveis
- `zustand` — estado client-side para o board Kanban

---

## Scope

**v1 includes:**

- Board Kanban com colunas personalizáveis e cards arrastáveis
- Cada card com: título, descrição, prioridade (tag colorida), assignees (avatares), e-mail do cliente, notas por etapa
- Ao mover card → captura de notas → disparo de e-mail automático para o cliente
- Sidebar de navegação fiel ao design de referência (Slothui)
- Autenticação por e-mail/senha via Supabase Auth
- Deploy contínuo na Vercel com variáveis de ambiente seguras
- Landing page de apresentação do produto

**Explicitly out of scope:**

| Feature | Reason |
|---|---|
| Mobile app nativo | Foco em web responsiva para v1 |
| Múltiplos workspaces por usuário | Complexidade de multi-tenancy para v2 |
| Integrações externas (Slack, Jira) | Fora do MVP |
| Editor de e-mail customizável | Template fixo por ora |
| Real-time colaborativo (multi-cursor) | Supabase Realtime para atualização de status apenas |

---

## Constraints

- Timeline: Vibe Coding Loop — uma fase por vez, validação local antes de avançar
- Technical: Stack 100% serverless (Next.js + Supabase + Vercel) — sem backend separado
- Resources: Desenvolvedor solo, iterações curtas e verificáveis
- Design: Fidelidade máxima ao screenshot de referência (slothui Kanban Dashboard)
