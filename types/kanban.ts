export type Priority =
  | "Important"
  | "Meh"
  | "OK"
  | "High Priority"
  | "Low Priority"
  | "I don't know"
  | "Maybe important"
  | "Not that important";

export type Assignee = {
  name: string;
  initials: string;
  color: string;
};

export type KanbanCard = {
  id: string;
  priority: Priority;
  title: string;
  description: string;
  assignees: Assignee[];
  comments: number;
  checks: number;
};

export type KanbanColumn = {
  id: string;
  title: string;
  count: number;
  accent: "indigo" | "amber" | "emerald";
  cards: KanbanCard[];
};
