# Phase 2 — Drag-and-Drop, Animações e Notas Specification

## Problem Statement

Com a UI estática aprovada, precisamos tornar o board interativo. O drag-and-drop é o coração da experiência Kanban, e o sistema de notas por card é o que alimenta a regra de negócio principal (envio de e-mail com resumo da etapa).

## Goals

- [ ] Usuário consegue arrastar cards entre colunas e dentro da mesma coluna com animação suave
- [ ] Modal de detalhes do card permite adicionar notas vinculadas à etapa atual
- [ ] Feedback visual claro ao mover card (toast + animação) prepara o usuário para o e-mail automático

## Out of Scope

| Feature | Reason |
|---|---|
| Envio real de e-mail | Phase 4 (Edge Function) |
| Persistência no banco | Phase 4 |
| Autenticação | Phase 5 |

---

## User Stories

### P1: Drag-and-Drop entre Colunas ⭐ MVP

**User Story**: Como usuário, quero arrastar um card de uma coluna para outra, para atualizar o status do projeto.

**Why P1**: É a interação central do Kanban.

**Acceptance Criteria**:

1. WHEN usuário inicia drag de um card THEN sistema SHALL elevar o card (shadow aumentada, opacity 0.8, scale 1.02) e mostrar drop zones destacadas
2. WHEN usuário arrasta card sobre outra coluna THEN sistema SHALL destacar a coluna de destino com borda pulsante
3. WHEN usuário solta card em outra coluna THEN sistema SHALL mover o card com animação de 200ms ease-out e atualizar Zustand store
4. WHEN usuário solta card fora de qualquer coluna válida THEN sistema SHALL retornar card à posição original com snap-back animation
5. WHEN card é movido para nova coluna THEN sistema SHALL atualizar o badge counter de ambas as colunas imediatamente

**Independent Test**: Arrastar card de "In Progress" para "Reviewed" — card aparece em Reviewed, counter atualiza, card desaparece de In Progress.

---

### P1: Reordenação dentro da Mesma Coluna ⭐ MVP

**User Story**: Como usuário, quero reordenar cards dentro da mesma coluna, para priorizar visualmente os projetos.

**Why P1**: Sem reordenação, a posição dos cards é imutável e inútil.

**Acceptance Criteria**:

1. WHEN usuário arrasta card dentro da mesma coluna THEN sistema SHALL mostrar indicador de posição (linha azul entre cards)
2. WHEN usuário solta card dentro da mesma coluna THEN sistema SHALL reposicionar com animação de reordenação
3. WHEN reordenação ocorre THEN sistema SHALL preservar posição após soltar

**Independent Test**: Arrastar segundo card para primeiro lugar — cards reordenam com animação suave.

---

### P1: Toast de Feedback ao Mover Card ⭐ MVP

**User Story**: Como usuário, quero receber um feedback visual ao mover um card, para saber que a ação foi registrada e que um e-mail será enviado.

**Why P1**: Conecta a ação de drag com a regra de negócio principal — o usuário precisa saber que o e-mail será disparado.

**Acceptance Criteria**:

1. WHEN card é movido para uma coluna diferente THEN sistema SHALL exibir toast no canto inferior direito: "Card movido para [Coluna Destino] · E-mail será enviado para [cliente@email.com]"
2. WHEN toast aparece THEN sistema SHALL auto-desaparecer após 4 segundos com fade-out
3. WHEN card é reordenado dentro da mesma coluna THEN sistema SHALL NÃO exibir toast (sem mudança de etapa)

**Independent Test**: Mover card → toast aparece com nome da coluna destino e e-mail do cliente.

---

### P1: Modal de Detalhes do Card ⭐ MVP

**User Story**: Como usuário, quero abrir o detalhes de um card e ver/adicionar informações, para gerenciar o projeto.

**Why P1**: Sem modal não é possível adicionar notas que alimentam o e-mail automático.

**Acceptance Criteria**:

1. WHEN usuário clica em um card THEN sistema SHALL abrir modal/drawer lateral com 480px de largura com animação slide-in
2. WHEN modal abre THEN sistema SHALL exibir: título (editável), descrição (editável), tag de prioridade (dropdown), e-mail do cliente (editável), assignees, etapa atual (coluna)
3. WHEN modal exibe aba de notas THEN sistema SHALL listar notas em ordem cronológica com: conteúdo, timestamp relativo ("há 2 horas"), identificador da etapa em que foi criada
4. WHEN usuário clica "Adicionar nota" THEN sistema SHALL exibir textarea + botão salvar
5. WHEN usuário salva nota THEN sistema SHALL adicionar à lista com timestamp atual e etapa atual (coluna do card)
6. WHEN usuário fecha modal THEN sistema SHALL fechar com slide-out animation sem perder dados

**Independent Test**: Abrir card → adicionar nota → fechar → reabrir → nota ainda aparece.

---

### P2: Estado Global com Zustand

**User Story**: Como desenvolvedor, quero um estado global consistente para o board, para que todas as operações de DnD e notas reflitam imediatamente na UI.

**Why P2**: Fundação técnica necessária mas transparente ao usuário final.

**Acceptance Criteria**:

1. WHEN card é movido THEN sistema SHALL atualizar `column_id` do card no Zustand store em < 16ms (1 frame)
2. WHEN nota é adicionada THEN sistema SHALL atualizar a lista de notas do card no Zustand store
3. WHEN página recarrega THEN sistema SHALL restaurar estado do localStorage (persistência local)

**Independent Test**: Mover card, recarregar página → card ainda na posição correta.

---

### P3: Animação de Pulse na Coluna Receptora

**User Story**: Como usuário, quero um feedback visual na coluna quando um card é solto, para confirmar que a ação foi bem-sucedida.

**Acceptance Criteria**:

1. WHEN card é solto em uma coluna THEN sistema SHALL animar o header da coluna com pulse de 600ms

---

## Edge Cases

- WHEN board tem apenas 1 card THEN sistema SHALL permitir drag sem erros
- WHEN coluna está vazia e card é arrastado para ela THEN sistema SHALL aceitar o card e exibir na posição 0
- WHEN usuário abre modal e arrasta card simultaneamente THEN sistema SHALL priorizar fechar o modal
- WHEN nota tem mais de 500 caracteres THEN sistema SHALL mostrar contador e permitir salvar
- WHEN e-mail do cliente está vazio no card THEN sistema SHALL exibir toast com aviso: "Sem e-mail do cliente — atualizar antes de mover"

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| DND-01 | P1: Drag entre colunas — início drag | Tasks | Done |
| DND-02 | P1: Drag entre colunas — drop válido | Tasks | Done |
| DND-03 | P1: Drag entre colunas — drop inválido | Tasks | Done |
| DND-04 | P1: Reordenação intra-coluna | Tasks | Done |
| DND-05 | P1: Toast de feedback | Tasks | Done |
| DND-06 | P1: Modal — abertura e campos | Tasks | Done |
| DND-07 | P1: Modal — sistema de notas | Tasks | Done |
| DND-08 | P2: Zustand store | Tasks | Done |
| DND-09 | P3: Animação pulse coluna | Tasks | Done |

**Coverage:** 9 total, 9 implementados na Phase 2 DnD Interactions.

---

## Success Criteria

- [x] Drag-and-drop fluido sem jank em validação local de build
- [x] Notas persistem em localStorage entre reloads via Zustand persist
- [x] Toast aparece ao mover card para coluna diferente (não na mesma)
- [x] Modal abre com animação em < 200ms

## Implementation Notes

| Date | Status | Notes |
|---|---|---|
| 2026-04-24 | Implemented | Dashboard convertido para client component com `@dnd-kit`; Zustand persistido em localStorage; drawer de detalhes com edição e notas; toast e pulse de coluna ao mover cards. |
| 2026-04-24 | Approved | Phase 2 validada pelo usuário; liberado avançar para Phase 3. |
