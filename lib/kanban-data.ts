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
        title: "Dashboard wireframe and sidebar navigation system",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae risus at augue aliquet.",
        clientEmail: "ana.client@example.com",
        assignees: [assignees.ana, assignees.bruno, assignees.clara, assignees.diego],
        comments: 24,
        checks: 18,
        notes: [
          {
            id: "note-1",
            cardId: "card-1",
            columnId: "in-progress",
            content: "Sidebar visual approved for the first review pass.",
            createdAt: "2026-04-24T12:00:00.000Z",
            author: "Cesar Junior",
          },
        ],
      },
      {
        id: "card-2",
        priority: "Meh",
        title: "Client project status overview",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
        clientEmail: "status.client@example.com",
        assignees: [assignees.bruno, assignees.eva],
        comments: 108000,
        checks: 42,
        notes: [],
      },
      {
        id: "card-3",
        priority: "OK",
        title: "Campaign task review checklist",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
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
        title: "Proposal approval flow for agency clients",
        description:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        clientEmail: "proposal.client@example.com",
        assignees: [assignees.diego, assignees.ana, assignees.eva],
        comments: 73,
        checks: 31,
        notes: [],
      },
      {
        id: "card-5",
        priority: "Low Priority",
        title: "Landing copy draft",
        description:
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.",
        clientEmail: "copy.client@example.com",
        assignees: [],
        comments: 8,
        checks: 4,
        notes: [],
      },
      {
        id: "card-6",
        priority: "I don't know",
        title: "Notification timing notes",
        description:
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
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
        title: "Brand color exploration",
        description:
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        clientEmail: "brand.client@example.com",
        assignees: [assignees.ana, assignees.diego],
        comments: 7,
        checks: 16,
        notes: [],
      },
      {
        id: "card-8",
        priority: "Not that important",
        title: "Archive old board examples",
        description:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
        clientEmail: "archive.client@example.com",
        assignees: [assignees.clara, assignees.bruno, assignees.eva],
        comments: 3,
        checks: 22,
        notes: [],
      },
    ],
  },
];
