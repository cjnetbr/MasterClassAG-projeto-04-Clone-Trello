# Phase 4 — Banco de Dados (Supabase) + E-mail Automático Specification

## Problem Statement

Com a UI validada localmente, é hora de conectar persistência real e implementar a regra de negócio principal: ao mover um card, capturar as notas da etapa anterior e disparar um e-mail automático para o cliente. Esta é a feature diferencial do produto.

## Goals

- [ ] CRUD completo de boards/columns/cards/notes persistindo no Supabase
- [ ] Ao mover card para nova coluna, cliente recebe e-mail automático com resumo das notas em < 60 segundos
- [ ] Histórico de transições auditável na tabela `card_transitions`

## Out of Scope

| Feature | Reason |
|---|---|
| Autenticação | Phase 5 (RLS por user_id será adicionado depois) |
| Multi-board por usuário | Depende de auth |
| Template de e-mail customizável | Futuro |

---

## User Stories

### P1: Schema do Banco de Dados ⭐ MVP

**User Story**: Como desenvolvedor, quero as tabelas do Supabase criadas com relacionamentos corretos, para persistir todos os dados do Kanban.

**Acceptance Criteria**:

1. WHEN migração é executada no Supabase THEN sistema SHALL criar tabelas: `boards`, `columns`, `cards`, `assignees`, `notes`, `card_transitions`
2. WHEN card é criado THEN sistema SHALL aceitar: title, description, priority, client_email, position, column_id, board_id
3. WHEN nota é criada THEN sistema SHALL registrar: content, card_id, column_id (etapa em que foi escrita), created_at
4. WHEN card é movido THEN sistema SHALL inserir registro em `card_transitions` com: card_id, from_column_id, to_column_id, email_sent=false, created_at

**Schema detalhado:**
```sql
boards(id uuid PK, name text, created_at timestamptz)
columns(id uuid PK, board_id FK, title text, color text, position int, created_at timestamptz)
cards(id uuid PK, column_id FK, board_id FK, title text, description text, priority text,
      client_email text, position int, created_at timestamptz, updated_at timestamptz)
assignees(id uuid PK, card_id FK, name text, avatar_url text)
notes(id uuid PK, card_id FK, column_id FK, content text, created_at timestamptz)
card_transitions(id uuid PK, card_id FK, from_column_id FK, to_column_id FK,
                 email_sent bool DEFAULT false, error_message text, created_at timestamptz)
```

**Independent Test**: Supabase Table Editor mostra todas as tabelas com dados de seed inseridos.

---

### P1: Integração Supabase no Next.js ⭐ MVP

**User Story**: Como usuário, quero que minhas ações no board persistam no banco de dados, para não perder o trabalho ao recarregar a página.

**Acceptance Criteria**:

1. WHEN usuário cria card THEN sistema SHALL inserir no Supabase via Server Action em < 500ms
2. WHEN usuário move card THEN sistema SHALL: atualizar `column_id` do card E inserir em `card_transitions` atomicamente
3. WHEN usuário adiciona nota THEN sistema SHALL inserir em `notes` com `column_id` atual do card
4. WHEN usuário recarrega a página THEN sistema SHALL restaurar estado completo do banco (não localStorage)
5. WHEN Supabase Realtime detecta mudança em `cards` THEN sistema SHALL atualizar board em outros navegadores abertos

**Independent Test**: Abrir board em duas abas → mover card em uma aba → card aparece na nova coluna na outra aba.

---

### P1: Edge Function — send-transition-email ⭐ MVP (Regra de Negócio Principal)

**User Story**: Como cliente, quero receber um e-mail automático quando meu projeto avança de etapa, com um resumo do que foi feito.

**Why P1**: É o diferencial central do produto.

**Acceptance Criteria**:

1. WHEN INSERT ocorre em `card_transitions` THEN Supabase Database Webhook SHALL invocar a Edge Function `send-transition-email`
2. WHEN Edge Function executa THEN sistema SHALL buscar notas do card onde `column_id = from_column_id`
3. WHEN Edge Function formata e-mail THEN sistema SHALL incluir: assunto "Atualização: [título do card] avançou para [coluna destino]", corpo com lista de notas (conteúdo + data), rodapé padrão
4. WHEN Resend API retorna sucesso THEN sistema SHALL atualizar `card_transitions` SET email_sent=true
5. WHEN Resend API retorna erro THEN sistema SHALL atualizar `card_transitions` SET email_sent=false, error_message=[mensagem]
6. WHEN card não tem notas na etapa anterior THEN sistema SHALL enviar e-mail com corpo: "Nenhuma nota foi registrada durante a etapa [nome da coluna]."
7. WHEN client_email está vazio no card THEN sistema SHALL NÃO disparar e-mail e registrar error_message="client_email_missing"

**Independent Test**: Mover card real no board → em < 60s, e-mail chega na caixa do cliente com resumo das notas.

---

### P2: Painel de Auditoria de Transições

**User Story**: Como usuário, quero ver o histórico de movimentações de um card, para auditar o progresso do projeto.

**Acceptance Criteria**:

1. WHEN usuário abre modal do card THEN sistema SHALL exibir aba "Histórico" com lista de transições: de qual coluna, para qual coluna, data, status do e-mail (enviado/falhou)
2. WHEN transição tem email_sent=false e error_message THEN sistema SHALL exibir ícone de aviso com tooltip do erro

---

## Edge Cases

- WHEN mesmo card é movido 2x rapidamente THEN sistema SHALL processar ambas as transições em ordem (não race condition)
- WHEN Edge Function falha por timeout THEN sistema SHALL ter retry automático após 60s (Supabase webhook retry)
- WHEN e-mail do cliente é inválido (formato) THEN sistema SHALL registrar erro sem travar o sistema
- WHEN Resend rate limit é atingido THEN sistema SHALL registrar erro e o usuário pode reenviar manualmente

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| DB-01 | P1: Schema — tabelas e relações | Tasks | Pending |
| DB-02 | P1: Integração — criar card | Tasks | Pending |
| DB-03 | P1: Integração — mover card + transição | Tasks | Pending |
| DB-04 | P1: Integração — adicionar nota | Tasks | Pending |
| DB-05 | P1: Integração — Realtime sync | Tasks | Pending |
| DB-06 | P1: Edge Function — trigger webhook | Tasks | Pending |
| DB-07 | P1: Edge Function — buscar notas | Tasks | Pending |
| DB-08 | P1: Edge Function — enviar e-mail Resend | Tasks | Pending |
| DB-09 | P1: Edge Function — registrar resultado | Tasks | Pending |
| DB-10 | P2: Histórico de transições no modal | Tasks | Pending |

**Coverage:** 10 total, 0 mapeados para tasks, 10 não mapeados ⚠️

---

## Success Criteria

- [ ] Card movido no board → e-mail chega na caixa em < 60s com conteúdo correto
- [ ] Recarregar página → estado do board preservado do banco
- [ ] `card_transitions` registra todas as movimentações com email_sent corretamente
- [ ] Zero dados perdidos em refresh ou navegação
