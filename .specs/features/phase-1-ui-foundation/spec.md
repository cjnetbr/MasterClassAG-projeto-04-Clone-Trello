# Phase 1 — UI Foundation Specification

## Problem Statement

O projeto precisa de uma base visual sólida antes de qualquer lógica de negócio. Construir a UI fiel ao design de referência (slothui Kanban Dashboard) garante que as fases seguintes adicionem comportamento sobre uma casca visual já aprovada, evitando retrabalho de layout.

## Goals

- [ ] Interface estática 1:1 com o screenshot de referência no localhost:3000
- [ ] Projeto Next.js 15 scaffoldado com TypeScript, Tailwind e shadcn/ui prontos para uso
- [ ] Aprovação visual do usuário antes de avançar para Phase 2

## Out of Scope

| Feature | Reason |
|---|---|
| Drag-and-drop funcional | Phase 2 |
| Dados reais ou mock dinâmico | Phase 3 |
| Modal de detalhes do card | Phase 2 |
| Lógica de e-mail | Phase 4 |
| Autenticação | Phase 5 |

---

## User Stories

### P1: Scaffold do Projeto ⭐ MVP

**User Story**: Como desenvolvedor, quero um projeto Next.js configurado para começar a construir, para não perder tempo com setup manual.

**Why P1**: Sem scaffold não há nada para construir.

**Acceptance Criteria**:

1. WHEN o desenvolvedor roda `npm run dev` THEN sistema SHALL servir a app em localhost:3000 sem erros
2. WHEN o desenvolvedor importa um componente shadcn/ui THEN sistema SHALL resolver sem erros de build
3. WHEN o desenvolvedor usa classes Tailwind THEN sistema SHALL aplicar estilos corretamente

**Independent Test**: `npm run dev` → abre localhost:3000 sem erros no console.

---

### P1: Layout Principal (Sidebar + Header) ⭐ MVP

**User Story**: Como usuário, quero ver o layout principal do app ao acessar o dashboard, para navegar entre seções.

**Why P1**: É a estrutura base de toda a interface.

**Acceptance Criteria**:

1. WHEN usuário acessa /dashboard THEN sistema SHALL exibir sidebar esquerda com fundo roxo/azul (#5B5FEF), largura ~280px
2. WHEN sidebar renderiza THEN sistema SHALL mostrar: logo "S slothui", campo de busca, itens de navegação (Home com badge 10, Tasks, Users com badge 2, APIs, Subscription, Settings, Help & Support), bloco "Go Pro" com ícone de estrela, perfil do usuário com nome e role
3. WHEN header renderiza THEN sistema SHALL mostrar: título "Kanban Dashboard" com emoji, ícone de busca, botões Share/Export/Add no canto direito
4. WHEN tabs de filtro renderizam THEN sistema SHALL mostrar: By Status, By Total Tasks (active, badge 12), Tasks Due, Extra Tasks, Tasks Completed, Sort By dropdown

**Independent Test**: Navegar para /dashboard e comparar visualmente com o screenshot — sidebar roxa, header branco, tabs com underline azul.

---

### P1: Colunas Kanban Estáticas ⭐ MVP

**User Story**: Como usuário, quero ver as três colunas do Kanban com seus cards, para ter uma visão geral do status dos projetos.

**Why P1**: É o conteúdo principal da tela — sem isso o app não tem propósito visual.

**Acceptance Criteria**:

1. WHEN a área principal renderiza THEN sistema SHALL exibir 3 colunas lado a lado com scroll horizontal implícito
2. WHEN coluna "In Progress" renderiza THEN sistema SHALL ter fundo azul/roxo (#5B5FEF), badge counter "25", botão "+"
3. WHEN coluna "Reviewed" renderiza THEN sistema SHALL ter fundo laranja/amarelo (#F59E0B range), badge counter "8", botão "+"
4. WHEN coluna "Completed" renderiza THEN sistema SHALL ter fundo verde (#10B981 range), badge counter "2", botão "+"
5. WHEN cards renderizam dentro das colunas THEN sistema SHALL exibir: tag de prioridade colorida, título bold, descrição em cinza, avatares sobrepostos (+N quando mais de 3), ícone comentários + número, ícone check + número

**Independent Test**: Comparar screenshot — 3 colunas com cores corretas, cards com todas as partes visuais presentes.

---

### P1: Tags de Prioridade Coloridas ⭐ MVP

**User Story**: Como usuário, quero identificar rapidamente a prioridade de cada card pela tag colorida, para priorizar meu trabalho.

**Why P1**: É um elemento visual central de cada card.

**Acceptance Criteria**:

1. WHEN tag "Important" renderiza THEN sistema SHALL exibir fundo azul claro com texto azul
2. WHEN tag "High Priority" renderiza THEN sistema SHALL exibir fundo vermelho claro com texto vermelho
3. WHEN tag "Low Priority" renderiza THEN sistema SHALL exibir fundo verde claro com texto verde
4. WHEN tag "Meh" renderiza THEN sistema SHALL exibir fundo roxo claro com texto roxo
5. WHEN tag "OK" renderiza THEN sistema SHALL exibir fundo amarelo/laranja claro com texto laranja
6. WHEN tag "I don't know" renderiza THEN sistema SHALL exibir fundo laranja claro com texto laranja
7. WHEN tag "Maybe important" renderiza THEN sistema SHALL exibir fundo cinza claro com texto cinza
8. WHEN tag "Not that important" renderiza THEN sistema SHALL exibir fundo laranja claro com texto laranja

**Independent Test**: Comparar cada variação de tag com o screenshot de referência.

---

### P2: Avatares de Assignees com Overflow

**User Story**: Como usuário, quero ver quem está atribuído a cada card, para saber quem está trabalhando no quê.

**Why P2**: Detalhe visual importante mas cards sem assignees ainda são funcionais.

**Acceptance Criteria**:

1. WHEN card tem ≤ 3 assignees THEN sistema SHALL exibir avatares circulares sobrepostos (overlap ~8px)
2. WHEN card tem > 3 assignees THEN sistema SHALL exibir primeiros 3 avatares + badge "+N" com fundo roxo claro
3. WHEN avatar não tem imagem THEN sistema SHALL exibir iniciais do nome com fundo gerado por cor

**Independent Test**: Cards com 1, 2, 3 e 4+ assignees renderizando corretamente.

---

### P2: Responsividade Base (1280px+)

**User Story**: Como usuário em desktop, quero que o layout se adapte sem quebrar, para ter boa experiência.

**Why P2**: Desktop-first para v1; mobile é futuro.

**Acceptance Criteria**:

1. WHEN viewport é ≥ 1280px THEN sistema SHALL exibir sidebar + colunas sem overflow indesejado
2. WHEN viewport é < 1024px THEN sistema SHALL ocultar sidebar ou reduzi-la a ícones

**Independent Test**: Redimensionar browser — sem horizontal scroll indesejado em 1280px.

---

## Edge Cases

- WHEN card não tem assignees THEN sistema SHALL exibir área de avatares vazia sem quebrar layout
- WHEN título do card é muito longo THEN sistema SHALL truncar com ellipsis em 2 linhas
- WHEN contador de comentários ou checks é >= 1000 THEN sistema SHALL exibir "1K+" format (ex: 108k, 87.2k)
- WHEN coluna está vazia THEN sistema SHALL exibir área com altura mínima e mensagem placeholder

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| UI-01 | P1: Scaffold | Design | Done |
| UI-02 | P1: Layout Principal — Sidebar | Design | Done |
| UI-03 | P1: Layout Principal — Header + Tabs | Design | Done |
| UI-04 | P1: Colunas Kanban — In Progress | Design | Done |
| UI-05 | P1: Colunas Kanban — Reviewed | Design | Done |
| UI-06 | P1: Colunas Kanban — Completed | Design | Done |
| UI-07 | P1: Card — Tag de Prioridade | Design | Done |
| UI-08 | P1: Card — Avatares + Stats | Design | Done |
| UI-09 | P2: Avatares Overflow (+N) | Design | Done |
| UI-10 | P2: Responsividade 1280px+ | Design | Done |

**Coverage:** 10 total, 10 implementados na Phase 1 UI Foundation.

---

## Success Criteria

- [ ] Screenshot side-by-side com a referência mostra fidelidade visual de ≥ 95%
- [x] `npm run build` sem erros ou warnings críticos
- [x] Aprovação explícita do usuário antes de iniciar Phase 2

## Approval

| Date | Status | Notes |
|---|---|---|
| 2026-04-24 | Approved | Phase 1 aprovada pelo usuário; liberado avançar para Phase 2. |
