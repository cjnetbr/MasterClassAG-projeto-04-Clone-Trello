import type { Assignee, CardNote, KanbanCard, KanbanColumn, Priority } from "@/types/kanban";

export const assignees: Record<string, Assignee> = {
  ana: { name: "Ana Ribeiro", initials: "AR", color: "bg-[#FEE2E2] text-[#B91C1C]" },
  bruno: { name: "Bruno Costa", initials: "BC", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  clara: { name: "Clara Dias", initials: "CD", color: "bg-[#DCFCE7] text-[#047857]" },
  diego: { name: "Diego Lima", initials: "DL", color: "bg-[#F3E8FF] text-[#7E22CE]" },
  eva: { name: "Eva Martins", initials: "EM", color: "bg-[#FEF3C7] text-[#B45309]" },
};

const noteDates = [
  "2026-04-24T09:00:00.000Z",
  "2026-04-24T10:20:00.000Z",
  "2026-04-24T11:40:00.000Z",
];

function notes(cardId: string, columnId: string, contents: string[]): CardNote[] {
  return contents.map((content, index) => ({
    id: `${cardId}-note-${index + 1}`,
    cardId,
    columnId,
    content,
    createdAt: noteDates[index] ?? noteDates[0],
    author: index % 2 === 0 ? "Cesar Junior" : "Ana Ribeiro",
  }));
}

function card(
  id: string,
  columnId: string,
  priority: Priority,
  title: string,
  description: string,
  clientEmail: string,
  people: Assignee[],
  noteContents: string[],
  comments: number,
  checks: number,
): KanbanCard {
  return {
    id,
    priority,
    title,
    description,
    clientEmail,
    assignees: people,
    comments,
    checks,
    notes: notes(id, columnId, noteContents),
  };
}

export const initialColumns: KanbanColumn[] = [
  {
    id: "in-progress",
    title: "In Progress",
    count: 3,
    accent: "indigo",
    cards: [
      card(
        "card-1",
        "in-progress",
        "Important",
        "Wireframe do painel e navegação lateral",
        "Definição visual da estrutura principal do painel, com navegação, filtros e visão geral do fluxo.",
        "mariana@studioalfa.com",
        [assignees.ana, assignees.bruno, assignees.clara, assignees.diego],
        [
          "Sidebar aprovada para a primeira revisão visual.",
          "Cliente pediu manter a área principal limpa e com contraste alto.",
          "Próximo passo: validar labels e espaçamentos em desktop.",
        ],
        24,
        18,
      ),
      card(
        "card-2",
        "in-progress",
        "Meh",
        "Visão geral do status dos projetos",
        "Resumo rápido para acompanhar a evolução dos projetos ativos e os próximos pontos de atenção.",
        "renato@northwind.com",
        [assignees.bruno, assignees.eva, assignees.ana],
        [
          "Mapeamos os indicadores principais para a tela inicial.",
          "Falta revisar a ordem dos cards no fluxo do cliente.",
        ],
        108000,
        42,
      ),
      card(
        "card-3",
        "in-progress",
        "OK",
        "Checklist de revisão da campanha",
        "Lista de validação para revisar entregáveis, pendências e aprovações antes da próxima etapa.",
        "",
        [assignees.clara, assignees.diego],
        ["Checklist inicial criado; aguardando e-mail do cliente para notificação automática."],
        12,
        9,
      ),
    ],
  },
  {
    id: "reviewed",
    title: "Reviewed",
    count: 3,
    accent: "amber",
    cards: [
      card(
        "card-4",
        "reviewed",
        "High Priority",
        "Fluxo de aprovação de proposta para clientes",
        "Organização das etapas necessárias para aprovação, ajustes finais e comunicação com o cliente.",
        "patricia@agenciavela.com",
        [assignees.diego, assignees.ana, assignees.eva],
        [
          "Proposta revisada com equipe comercial.",
          "Cliente solicitou destaque para os marcos de entrega.",
        ],
        73,
        31,
      ),
      card(
        "card-5",
        "reviewed",
        "Low Priority",
        "Rascunho dos textos da landing page",
        "Primeira versão dos textos comerciais, com foco em clareza, benefício e chamada para ação.",
        "beatriz@lumina.co",
        [assignees.ana, assignees.bruno],
        [
          "Texto do hero revisado.",
          "CTA principal deve apontar para cadastro quando a autenticação existir.",
        ],
        8,
        4,
      ),
      card(
        "card-6",
        "reviewed",
        "I don't know",
        "Notas sobre tempo de notificação",
        "Regras de tempo para avisos automáticos quando um card muda de etapa no quadro.",
        "ops@contoso.com",
        [assignees.eva, assignees.bruno, assignees.clara, assignees.ana, assignees.diego],
        ["Definido que o preview local deve aparecer imediatamente após a mudança de coluna."],
        19,
        11,
      ),
    ],
  },
  {
    id: "completed",
    title: "Completed",
    count: 2,
    accent: "emerald",
    cards: [
      card(
        "card-7",
        "completed",
        "Maybe important",
        "Exploração das cores da marca",
        "Variações de paleta e contraste para manter o painel consistente com a identidade visual.",
        "marca@orbita.design",
        [assignees.ana, assignees.diego, assignees.clara],
        [
          "Paleta principal validada com roxo e acentos de status.",
          "Contraste dos badges passou na revisão visual.",
        ],
        7,
        16,
      ),
      card(
        "card-8",
        "completed",
        "Not that important",
        "Arquivar exemplos antigos de quadros",
        "Limpeza de exemplos antigos para deixar o ambiente de demonstração mais objetivo.",
        "arquivo@exemplo.com",
        [assignees.clara, assignees.bruno, assignees.eva],
        ["Exemplos antigos removidos do fluxo principal de demonstração."],
        3,
        22,
      ),
    ],
  },
];
