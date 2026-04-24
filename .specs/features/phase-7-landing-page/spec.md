# Phase 7 — Testes Finais e Landing Page Specification

## Problem Statement

Com o produto funcional em produção, precisamos validar tudo end-to-end no ambiente real e criar uma landing page que converta visitantes em usuários cadastrados.

## Goals

- [ ] Todos os fluxos P1 verificados em produção com dados reais
- [ ] Landing page publicada que converte visitantes em cadastros
- [ ] E-mail automático testado com Resend em modo real (não simulado)

## Out of Scope

| Feature | Reason |
|---|---|
| A/B testing da landing page | V2 |
| Analytics avançado (Mixpanel etc) | V2 |
| Blog ou conteúdo de SEO | Futuro |

---

## User Stories

### P1: Testes Finais em Produção ⭐ MVP

**Acceptance Criteria**:

1. WHEN QA checklist de produção é executado THEN todos os fluxos P1 SHALL passar sem erros
2. WHEN card é movido em produção THEN e-mail real SHALL chegar na caixa do cliente em < 60s
3. WHEN dois usuários distintos estão logados THEN sistema SHALL manter isolamento de dados (RLS verificado)

---

### P1: Landing Page ⭐ MVP

**Acceptance Criteria**:

1. WHEN visitante acessa / (root) THEN sistema SHALL exibir landing page (não o dashboard)
2. WHEN landing page renderiza THEN sistema SHALL incluir: Hero (título, subtítulo, CTA "Começar grátis" → /signup), Features (3 diferenciais: Kanban visual, Notas por etapa, E-mail automático), Screenshot/demo do produto, Pricing (Free + Go Pro), Footer com links
3. WHEN visitante clica "Começar grátis" THEN sistema SHALL redirecionar para /signup
4. WHEN usuário já está logado e acessa / THEN sistema SHALL redirecionar para /dashboard

---

### P2: Otimização de Performance (Core Web Vitals)

**Acceptance Criteria**:

1. WHEN Lighthouse roda na landing page THEN sistema SHALL atingir score ≥ 90 em Performance, Accessibility, Best Practices

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| LAND-01 | P1: QA produção — fluxo e-mail | Tasks | Pending |
| LAND-02 | P1: Landing page — Hero + CTA | Tasks | Pending |
| LAND-03 | P1: Landing page — Features + Screenshot | Tasks | Pending |
| LAND-04 | P1: Landing page — Pricing + Footer | Tasks | Pending |
| LAND-05 | P1: Redirect / → /dashboard (autenticado) | Tasks | Pending |
| LAND-06 | P2: Core Web Vitals ≥ 90 | Tasks | Pending |

**Coverage:** 6 total, 0 mapeados para tasks, 6 não mapeados ⚠️

---

## Success Criteria

- [ ] E-mail automático funciona em produção com Resend real
- [ ] Landing page converte: botão CTA → /signup → usuário criado → acesso ao board
- [ ] Lighthouse Performance ≥ 85 na landing page
- [ ] Checklist QA completo aprovado pelo usuário — projeto concluído ✅
