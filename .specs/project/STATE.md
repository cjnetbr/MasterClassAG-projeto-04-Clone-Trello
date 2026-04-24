# State — SlothuiKanban

_Memória persistente entre sessões: decisões, bloqueadores, lições, TODOs, ideias adiadas._

---

## Decisions

| ID | Decision | Rationale | Date |
|---|---|---|---|
| D-001 | Next.js 15 App Router | Server Components + Server Actions simplificam integração com Supabase sem API routes extras | 2026-04-24 |
| D-002 | @dnd-kit em vez de react-beautiful-dnd | react-beautiful-dnd está deprecated; @dnd-kit é acessível, mantido e mais performático | 2026-04-24 |
| D-003 | Resend para e-mails | API simples, 100 e-mails/dia grátis, integra nativamente com Supabase Edge Functions | 2026-04-24 |
| D-004 | Tailwind CSS v4 + shadcn/ui | Velocidade de desenvolvimento com componentes acessíveis e altamente customizáveis | 2026-04-24 |
| D-005 | Zustand para estado client | Leve, sem boilerplate, fácil de combinar com Server Actions do Next.js | 2026-04-24 |
| D-006 | Email disparado via Supabase Edge Function com trigger em `card_transitions` | Desacopla a lógica de e-mail do frontend; reprocessável; auditável | 2026-04-24 |
| D-007 | Desktop-first (1280px+) para v1 | Design de referência é desktop; responsividade mobile é Phase 2+ | 2026-04-24 |

---

## Blockers

_Nenhum no momento._

---

## Lessons

_Nenhuma registrada ainda._

---

## Preferences

- Respostas concisas, código direto ao ponto
- Uma fase por vez — não implementar além do escopo atual
- Commits atômicos por feature/task
- Tip sobre modelos mais rápidos: registrado — não repetir

---

## Deferred Ideas

| Idea | Reason Deferred |
|---|---|
| Template de e-mail customizável por board | Complexidade de UX — v2 |
| Comentários com @menções | Fora do MVP |
| Real-time colaborativo multi-cursor | Supabase Realtime apenas para sync de status no v1 |
| OAuth (Google/GitHub login) | Fase 5 usa e-mail/senha; OAuth é melhoria futura |

---

## Current Focus

**Phase 2 — Drag-and-Drop, Animacoes e Notas**
Status: READY TO START -> Phase 1 aprovada pelo usuario em 2026-04-24.

## Progress Log

| Date | Phase | Notes |
|---|---|---|
| 2026-04-24 | Phase 1 UI Foundation | Scaffold Next.js 15 + TypeScript + Tailwind v4 criado; shadcn/ui base configurado; `/dashboard` estatico implementado com sidebar, header/tabs, colunas Kanban, cards, tags e avatares; `npm run build` passou. |
| 2026-04-24 | Phase 1 Approval | Usuario aprovou visualmente a Phase 1; projeto liberado para iniciar Phase 2. |
