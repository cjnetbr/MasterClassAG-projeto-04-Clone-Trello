# Phase 3 QA Checklist — Mock Data

Use este checklist no localhost antes de avançar para a Phase 4.

## Setup

- [ ] Rodar `npm install` quando houver dependências novas
- [ ] Confirmar `NEXT_PUBLIC_EMAIL_MOCK=true`
- [ ] Rodar `npm run dev`
- [ ] Abrir `http://127.0.0.1:3000/dashboard`

## Phase 1 — UI Foundation

- [ ] Sidebar renderiza em PT-BR sem APIs, Subscription ou Help & Support
- [ ] Header, ações e abas aparecem em PT-BR
- [ ] As 3 colunas aparecem com cores corretas e counters coerentes
- [ ] Cards exibem prioridade, título, descrição, e-mail, responsáveis e contadores

## Phase 2 — Interações

- [ ] Card pode ser arrastado entre colunas
- [ ] Card pode ser reordenado dentro da mesma coluna
- [ ] Counter das colunas muda após movimentação
- [ ] Drawer do card abre ao clicar
- [ ] Nota pode ser adicionada e permanece ao reabrir o card

## Phase 3 — Mock Data e E-mail Simulado

- [ ] Board inicia com 8 cards realistas distribuídos em 3 colunas
- [ ] Todos os cards têm 2-5 responsáveis
- [ ] Todos os cards têm 1-3 notas pré-existentes
- [ ] Botão Adicionar cria um novo card e abre seus detalhes
- [ ] Botão + da coluna cria card na coluna correta
- [ ] Ao mover card entre colunas, o modal "Preview de E-mail" abre
- [ ] Preview mostra Para, Assunto e Corpo formatado com notas da etapa anterior
- [ ] Card sem e-mail exibe aviso de e-mail não configurado
- [ ] Card sem notas na etapa anterior exibe "Nenhuma nota registrada nesta etapa."
- [ ] Console não exibe erros durante o fluxo completo
