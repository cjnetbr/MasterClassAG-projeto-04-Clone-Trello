# Phase 6 — Deploy na Vercel Specification

## Problem Statement

O app precisa estar acessível publicamente com deploy automático via git push para suportar iterações rápidas e entregar o produto.

## Goals

- [ ] App em produção com URL pública estável
- [ ] Deploy automático em cada push para main
- [ ] Variáveis de ambiente seguras configuradas

## Out of Scope

| Feature | Reason |
|---|---|
| Domínio custom pago | Opcional — vercel.app é suficiente para v1 |
| CDN avançado / edge config | Over-engineering para v1 |

---

## User Stories

### P1: Deploy Inicial na Vercel ⭐ MVP

**Acceptance Criteria**:

1. WHEN `git push origin main` ocorre THEN Vercel SHALL iniciar build automático
2. WHEN build completa THEN sistema SHALL estar acessível em URL pública vercel.app
3. WHEN variáveis de ambiente estão configuradas no painel Vercel THEN app SHALL conectar ao Supabase de produção

**Variáveis obrigatórias:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

---

### P1: Headers de Segurança ⭐ MVP

**Acceptance Criteria**:

1. WHEN next.config.js tem security headers THEN sistema SHALL retornar: X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin

---

### P2: Preview Deployments

**Acceptance Criteria**:

1. WHEN PR é aberto THEN Vercel SHALL criar preview deployment com URL única para review

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| DEPLOY-01 | P1: Configuração Vercel + env vars | Tasks | Pending |
| DEPLOY-02 | P1: Security headers | Tasks | Pending |
| DEPLOY-03 | P2: Preview deployments | Tasks | Pending |

**Coverage:** 3 total, 0 mapeados para tasks, 3 não mapeados ⚠️

---

## Success Criteria

- [ ] URL de produção acessível publicamente
- [ ] Build time < 3 minutos
- [ ] Fluxo completo (login → board → mover card → receber e-mail) funciona em produção
