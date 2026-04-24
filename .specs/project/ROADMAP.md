# Roadmap — SlothuiKanban

**Current Milestone:** Phase 2 — Animações e Funcionalidades (DnD + Notas)
**Status:** Phase 1 approved; Phase 2 ready to start

---

## Phase 1 — UI Foundation (Design Fiel ao Screenshot)

**Goal:** Interface estática fiel ao design de referência rodando no localhost. Nenhuma funcionalidade real — apenas a casca visual perfeita.
**Target:** Sessão 1 completa e aprovada visualmente antes de avançar

### Features

**Scaffold do Projeto Next.js** — DONE

- Inicializar projeto Next.js 15 com TypeScript + Tailwind CSS v4
- Configurar shadcn/ui com tema base
- Estrutura de pastas definida (app/, components/, lib/, types/)
- Git commit inicial da estrutura

**Layout Principal (Sidebar + Main Area)** — DONE

- Sidebar esquerda: logo "S slothui", search input, nav items (Home, Tasks, Users, APIs, Subscription, Settings, Help & Support), badge de contagem, "Go Pro" CTA, perfil do usuário com botão logout
- Paleta de cores: roxo/azul dominante (#5B5FEF range), fundo branco puro no conteúdo
- Header da área principal: título "Kanban Dashboard" + ícone, botões Share/Export/Add, tabs de filtro (By Status, By Total Tasks, Tasks Due, Extra Tasks, Tasks Completed), Sort By dropdown

**Cards Kanban Estáticos** — DONE

- Coluna "In Progress" (roxo/azul, counter badge, botão +)
- Coluna "Reviewed" (laranja/amarelo, counter badge, botão +)
- Coluna "Completed" (verde, counter badge, botão +)
- Card com: tag de prioridade colorida, título bold, descrição lorem ipsum, avatares de assignees sobrepostos (+N), ícone de comentários + contagem, ícone de check + contagem
- Variações de tag: Important (azul), Meh (roxo claro), OK (verde), High Priority (vermelho), Low Priority (verde), I don't know (laranja), Maybe important (cinza), Not that important (laranja claro)

**Responsividade Base** — DONE

- Layout funcional em 1280px+ (desktop-first)
- Sidebar colapsável em breakpoints menores

---

## Phase 2 — Animações e Funcionalidades (DnD + Notas)

**Goal:** Board totalmente interativo com drag-and-drop, modais de card, sistema de notas e transições visuais fluidas.
**Target:** Todas as interações funcionando com dados mock antes de conectar banco

### Features

**Drag-and-Drop com @dnd-kit** — PLANNED

- Arrastar cards entre colunas com animação suave
- Reordenar cards dentro da mesma coluna
- Indicador visual de drop zone ativo
- Snap back animado se drop inválido
- Estado do board atualizado no Zustand após cada drop

**Modal de Detalhes do Card** — PLANNED

- Abrir card ao clicar → modal/drawer lateral
- Campos editáveis: título, descrição, prioridade, assignees, e-mail do cliente
- Aba de notas: lista de notas cronológicas por etapa (com timestamp e autor)
- Botão "Adicionar nota" com textarea
- Indicador da coluna atual do card

**Feedback Visual de Transição de Coluna** — PLANNED

- Toast notification ao mover card ("Card movido para Reviewed → E-mail será enviado ao cliente")
- Animação de pulse na coluna de destino ao receber card
- Badge do counter animado (incremento/decremento)

**Estado Global com Zustand** — PLANNED

- Store: boards, columns, cards, notes
- Actions: moveCard, addNote, updateCard, addCard, removeCard
- Persistência em localStorage para testes locais

---

## Phase 3 — Teste Local com Mock Data

**Goal:** App 100% funcional no localhost com dados fictícios realistas. Validação completa de todos os fluxos antes de tocar em banco de dados real.
**Target:** Demo end-to-end do fluxo principal: criar card → adicionar nota → mover → ver "e-mail simulado"

### Features

**Mock Data Realista** — PLANNED

- Seed de dados: 3 colunas padrão, 8-10 cards com dados variados
- Clientes fictícios com e-mails válidos de formato
- Notas de exemplo por card

**Simulador de E-mail (Dev Mode)** — PLANNED

- Ao mover card, exibir modal/drawer com preview do e-mail que seria enviado
- Mostrar: destinatário, assunto, corpo com resumo das notas
- Console.log detalhado do evento para debug
- Flag `NEXT_PUBLIC_EMAIL_MOCK=true` para ativar modo simulação

**Validação de Fluxo Completo** — PLANNED

- Checklist de QA manual documentado
- Todos os casos de uso P1 verificados
- Performance: FCP < 2s, sem layout shifts visíveis

---

## Phase 4 — Banco de Dados (Supabase)

**Goal:** Persistência real no Supabase com as tabelas definidas. App mantém estado entre reloads.
**Target:** CRUD completo de boards/columns/cards/notes funcionando via Supabase

### Features

**Schema do Banco de Dados** — PLANNED

- Tabela `boards`: id, name, user_id, created_at
- Tabela `columns`: id, board_id, title, color, position, created_at
- Tabela `cards`: id, column_id, board_id, title, description, priority, client_email, position, created_at, updated_at
- Tabela `assignees`: id, card_id, name, avatar_url
- Tabela `notes`: id, card_id, column_id (etapa), content, author_id, created_at
- Tabela `card_transitions`: id, card_id, from_column_id, to_column_id, email_sent, created_at
- RLS policies por user_id

**Integração Supabase no Next.js** — PLANNED

- Server Actions para CRUD de cards/notas
- Supabase Realtime para atualizar board em tempo real
- Migrar Zustand store para fonte de verdade via Supabase

**Edge Function: send-transition-email** — PLANNED

- Trigger: INSERT em `card_transitions`
- Busca notas da etapa anterior (from_column_id)
- Formata e-mail com resumo das notas
- Envia via Resend API
- Registra resultado (email_sent=true/false, error_message)

---

## Phase 5 — Autenticação

**Goal:** Sistema de login seguro com Supabase Auth. Dados isolados por usuário.
**Target:** Fluxo completo: cadastro → login → board pessoal → logout

### Features

**Auth Flow com Supabase Auth** — PLANNED

- Página de login (/login) e cadastro (/signup)
- E-mail + senha como método principal
- Middleware Next.js protegendo rotas autenticadas
- Redirect automático: não-autenticado → /login, autenticado → /dashboard

**Isolamento de Dados por Usuário** — PLANNED

- RLS policies ativas: user só vê seus próprios boards/cards
- `user_id` em todas as tabelas principais
- Perfil de usuário básico (nome, avatar)

---

## Phase 6 — Deploy na Vercel

**Goal:** App em produção, acessível por URL pública, com deploy automático via git push.
**Target:** URL de produção funcionando com todas as fases anteriores

### Features

**Configuração Vercel** — PLANNED

- Variáveis de ambiente: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY
- Build command e output directory configurados
- Preview deployments para PRs

**Domínio e SSL** — PLANNED

- Domínio custom ou vercel.app configurado
- Headers de segurança (CSP, HSTS) via next.config.js

---

## Phase 7 — Testes Finais e Landing Page

**Goal:** App production-ready com landing page de apresentação convertendo visitantes em usuários.
**Target:** Landing page publicada, todos os fluxos P1 verificados em produção

### Features

**Testes Finais em Produção** — PLANNED

- Checklist QA completo no ambiente de produção
- Teste do fluxo de e-mail com Resend em modo real
- Verificação de RLS e isolamento de dados

**Landing Page** — PLANNED

- Hero section: título, subtítulo, CTA "Começar grátis"
- Features section: 3 diferenciais principais
- Demo/screenshot animado do produto
- Pricing section (Go Pro CTA)
- Footer

---

## Future Considerations

- Múltiplos workspaces e times por conta
- Customização de template de e-mail por board
- Webhooks para integrações externas (Zapier, Slack)
- App mobile (React Native + Expo)
- Analytics de board (tempo médio por coluna, throughput)
- Comentários em cards com menções (@usuario)
