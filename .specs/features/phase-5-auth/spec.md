# Phase 5 — Autenticação Specification

## Problem Statement

Com o board funcional e persistente, precisamos isolar os dados por usuário. Sem autenticação, qualquer pessoa acessa os dados de todos. O Supabase Auth com RLS garante que cada usuário veja apenas seus próprios boards e cards.

## Goals

- [ ] Usuário consegue se cadastrar e fazer login por e-mail/senha
- [ ] Dados isolados por usuário via Supabase RLS
- [ ] Rotas protegidas redirecionam não-autenticados para /login

## Out of Scope

| Feature | Reason |
|---|---|
| OAuth (Google/GitHub) | Melhoria futura |
| Recuperação de senha | Nice-to-have para v1.1 |
| Multi-workspace/times | V2 |

---

## User Stories

### P1: Cadastro e Login ⭐ MVP

**Acceptance Criteria**:

1. WHEN usuário acessa /signup THEN sistema SHALL exibir formulário: nome, e-mail, senha (min 8 chars), confirmar senha
2. WHEN usuário envia formulário válido THEN sistema SHALL criar conta via Supabase Auth e redirecionar para /dashboard
3. WHEN usuário acessa /login THEN sistema SHALL exibir formulário: e-mail, senha
4. WHEN credenciais são válidas THEN sistema SHALL criar sessão e redirecionar para /dashboard
5. WHEN credenciais são inválidas THEN sistema SHALL exibir mensagem de erro sem revelar qual campo está errado

**Independent Test**: Criar conta → fazer logout → fazer login → chegar no dashboard.

---

### P1: Proteção de Rotas ⭐ MVP

**Acceptance Criteria**:

1. WHEN usuário não autenticado acessa /dashboard THEN sistema SHALL redirecionar para /login via middleware Next.js
2. WHEN usuário autenticado acessa /login THEN sistema SHALL redirecionar para /dashboard
3. WHEN sessão expira THEN sistema SHALL redirecionar para /login na próxima navegação

---

### P1: Isolamento de Dados via RLS ⭐ MVP

**Acceptance Criteria**:

1. WHEN usuário A está logado THEN sistema SHALL retornar apenas boards/cards onde user_id = auth.uid()
2. WHEN usuário A tenta acessar card de usuário B diretamente THEN sistema SHALL retornar erro 404 ou conjunto vazio
3. WHEN novo card é criado THEN sistema SHALL automaticamente setar user_id = auth.uid()

**Independent Test**: Criar dois usuários, cada um com boards próprios — nenhum vê os dados do outro.

---

### P2: Perfil do Usuário

**Acceptance Criteria**:

1. WHEN usuário acessa perfil THEN sistema SHALL exibir nome e e-mail editáveis
2. WHEN usuário faz logout THEN sistema SHALL limpar sessão e redirecionar para /login

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| AUTH-01 | P1: Cadastro | Tasks | Pending |
| AUTH-02 | P1: Login | Tasks | Pending |
| AUTH-03 | P1: Proteção de rotas — middleware | Tasks | Pending |
| AUTH-04 | P1: RLS policies | Tasks | Pending |
| AUTH-05 | P2: Perfil + logout | Tasks | Pending |

**Coverage:** 5 total, 0 mapeados para tasks, 5 não mapeados ⚠️

---

## Success Criteria

- [ ] Usuário não autenticado não consegue acessar /dashboard
- [ ] Dois usuários distintos não veem os dados um do outro
- [ ] Fluxo completo signup → login → usar board → logout funciona sem erros
