# Phase 3 — Teste Local com Mock Data Specification

## Problem Statement

Antes de conectar qualquer banco de dados real, o app precisa rodar com dados fictícios realistas para validar todos os fluxos end-to-end. Isso inclui simular o disparo de e-mail para verificar o formato e conteúdo antes de integrar o serviço real.

## Goals

- [ ] App 100% funcional no localhost com seed de dados realistas
- [ ] Fluxo completo validado: criar card → adicionar notas → mover → ver preview do e-mail simulado
- [ ] QA manual checklist documentado e aprovado

## Out of Scope

| Feature | Reason |
|---|---|
| Envio real de e-mail | Phase 4 |
| Banco de dados | Phase 4 |
| Autenticação real | Phase 5 |

---

## User Stories

### P1: Seed de Mock Data ⭐ MVP

**User Story**: Como desenvolvedor, quero dados fictícios realistas carregados ao iniciar o app, para testar todos os fluxos sem criar dados manualmente.

**Acceptance Criteria**:

1. WHEN app inicia em dev mode THEN sistema SHALL carregar seed com: 1 board, 3 colunas (In Progress/Reviewed/Completed), 8 cards distribuídos com dados variados
2. WHEN seed carrega THEN sistema SHALL incluir cards com: título realista, prioridades variadas, 2-5 assignees com avatares de placeholder, e-mail de cliente fictício (ex: cliente@empresa.com), 1-3 notas pré-existentes por card
3. WHEN seed carrega THEN sistema SHALL refletir visualmente os counters corretos por coluna

**Independent Test**: `npm run dev` → board aparece com dados sem intervenção manual.

---

### P1: Simulador de E-mail (Dev Mode) ⭐ MVP

**User Story**: Como desenvolvedor, quero ver um preview do e-mail que seria enviado ao mover um card, para validar o conteúdo antes de conectar o serviço real.

**Acceptance Criteria**:

1. WHEN `NEXT_PUBLIC_EMAIL_MOCK=true` está setado THEN sistema SHALL interceptar o evento de transição de coluna
2. WHEN card é movido com mock mode ativo THEN sistema SHALL exibir modal "Preview de E-mail" com: Para: [email do cliente], Assunto: "Atualização do projeto: [título do card]", Corpo: resumo formatado das notas da etapa anterior
3. WHEN modal de preview está aberto THEN sistema SHALL exibir botão "Fechar (simulado)" e NÃO enviar e-mail real
4. WHEN não há notas na etapa anterior THEN sistema SHALL exibir preview com corpo: "Nenhuma nota registrada nesta etapa."

**Independent Test**: Mover card com NEXT_PUBLIC_EMAIL_MOCK=true → modal abre com e-mail formatado corretamente.

---

### P1: Validação de Fluxo Completo ⭐ MVP

**User Story**: Como PO, quero validar manualmente todos os fluxos P1 antes de avançar para o banco de dados, para não carregar bugs para as próximas fases.

**Acceptance Criteria**:

1. WHEN QA checklist é executado THEN todos os itens P1 das Phases 1 e 2 SHALL passar
2. WHEN board tem mock data THEN sistema SHALL completar o fluxo: criar card → adicionar nota → mover card → ver preview e-mail sem erros no console

**Independent Test**: Executar checklist.md completo sem nenhum ❌.

---

### P2: Performance Baseline

**Acceptance Criteria**:

1. WHEN app carrega THEN sistema SHALL atingir FCP (First Contentful Paint) < 2s em localhost
2. WHEN card é movido THEN sistema SHALL atualizar UI em < 100ms (sem lag perceptível)

---

## Edge Cases

- WHEN card sem e-mail de cliente é movido THEN sistema SHALL exibir aviso no preview: "E-mail do cliente não configurado"
- WHEN card sem notas da etapa anterior é movido THEN sistema SHALL gerar preview com mensagem default
- WHEN usuário move card de volta para coluna anterior THEN sistema SHALL tratar como nova transição

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| MOCK-01 | P1: Seed de dados | Tasks | Pending |
| MOCK-02 | P1: Simulador e-mail — intercepção | Tasks | Pending |
| MOCK-03 | P1: Simulador e-mail — modal preview | Tasks | Pending |
| MOCK-04 | P1: QA checklist | - | Pending |
| MOCK-05 | P2: Performance baseline | - | Pending |

**Coverage:** 5 total, 0 mapeados para tasks, 5 não mapeados ⚠️

---

## Success Criteria

- [ ] Todos os fluxos P1 das Phases 1+2+3 validados manualmente
- [ ] Preview de e-mail exibe conteúdo correto com notas formatadas
- [ ] Zero erros no console do browser durante o fluxo completo
- [ ] Aprovação explícita do usuário antes de iniciar Phase 4
