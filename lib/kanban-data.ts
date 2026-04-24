import type { Assignee, KanbanColumn } from "@/types/kanban";

export const assignees: Record<string, Assignee> = {
  ana: { name: "Ana Ribeiro", initials: "AR", color: "bg-[#FEE2E2] text-[#B91C1C]" },
  bruno: { name: "Bruno Costa", initials: "BC", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  clara: { name: "Clara Dias", initials: "CD", color: "bg-[#DCFCE7] text-[#047857]" },
  diego: { name: "Diego Lima", initials: "DL", color: "bg-[#F3E8FF] text-[#7E22CE]" },
  eva: { name: "Eva Martins", initials: "EM", color: "bg-[#FEF3C7] text-[#B45309]" },
};

export const initialColumns: KanbanColumn[] = [
  {
    id: "in-progress",
    title: "In Progress",
    count: 25,
    accent: "indigo",
    cards: [
      {
        id: "card-1",
        priority: "Important",
        title: "Wireframe do painel e navegação lateral",
        description:
          "Definição visual da estrutura principal do painel, com navegação, filtros e visão geral do fluxo.",
        clientEmail: "ana.client@example.com",
        assignees: [assignees.ana, assignees.bruno, assignees.clara, assignees.diego],
        comments: 24,
        checks: 18,
        notes: [
          {
            id: "note-1",
            cardId: "card-1",
            columnId: "in-progress",
            content: "Visual da sidebar aprovado para a primeira revisão.",
            createdAt: "2026-04-24T12:00:00.000Z",
            author: "Cesar Junior",
          },
        ],
      },
      {
        id: "card-2",
        priority: "Meh",
        title: "Visão geral do status dos projetos",
        description:
          "Resumo rápido para acompanhar a evolução dos projetos ativos e os próximos pontos de atenção.",
        clientEmail: "status.client@example.com",
        assignees: [assignees.bruno, assignees.eva],
        comments: 108000,
        checks: 42,
        notes: [],
      },
      {
        id: "card-3",
        priority: "OK",
        title: "Checklist de revisão da campanha",
        description:
          "Lista de validação para revisar entregáveis, pendências e aprovações antes da próxima etapa.",
        clientEmail: "",
        assignees: [assignees.clara],
        comments: 12,
        checks: 9,
        notes: [],
      },
    ],
  },
  {
    id: "reviewed",
    title: "Reviewed",
    count: 8,
    accent: "amber",
    cards: [
      {
        id: "card-4",
        priority: "High Priority",
        title: "Fluxo de aprovação de proposta para clientes",
        description:
          "Organização das etapas necessárias para aprovação, ajustes finais e comunicação com o cliente.",
        clientEmail: "proposal.client@example.com",
        assignees: [assignees.diego, assignees.ana, assignees.eva],
        comments: 73,
        checks: 31,
        notes: [],
      },
      {
        id: "card-5",
        priority: "Low Priority",
        title: "Rascunho dos textos da landing page",
        description:
          "Primeira versão dos textos comerciais, com foco em clareza, benefício e chamada para ação.",
        clientEmail: "copy.client@example.com",
        assignees: [],
        comments: 8,
        checks: 4,
        notes: [],
      },
      {
        id: "card-6",
        priority: "I don't know",
        title: "Notas sobre tempo de notificação",
        description:
          "Regras de tempo para avisos automáticos quando um card muda de etapa no quadro.",
        clientEmail: "ops.client@example.com",
        assignees: [assignees.eva, assignees.bruno, assignees.clara, assignees.ana],
        comments: 19,
        checks: 11,
        notes: [],
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    count: 2,
    accent: "emerald",
    cards: [
      {
        id: "card-7",
        priority: "Maybe important",
        title: "Exploração das cores da marca",
        description:
          "Variações de paleta e contraste para manter o painel consistente com a identidade visual.",
        clientEmail: "brand.client@example.com",
        assignees: [assignees.ana, assignees.diego],
        comments: 7,
        checks: 16,
        notes: [],
      },
      {
        id: "card-8",
        priority: "Not that important",
        title: "Arquivar exemplos antigos de quadros",
        description:
          "Limpeza de exemplos antigos para deixar o ambiente de demonstração mais objetivo.",
        clientEmail: "archive.client@example.com",
        assignees: [assignees.clara, assignees.bruno, assignees.eva],
        comments: 3,
        checks: 22,
        notes: [],
      },
    ],
  },
];
