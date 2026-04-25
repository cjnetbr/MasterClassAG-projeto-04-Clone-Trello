"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialColumns } from "@/lib/kanban-data";
import type { KanbanCard, KanbanColumn, NewKanbanCardInput, Priority } from "@/types/kanban";

type MoveResult = {
  moved: boolean;
  changedColumn: boolean;
  fromColumnId?: string;
  fromColumnTitle?: string;
  toColumnId?: string;
  toColumnTitle?: string;
  clientEmail?: string;
  cardTitle?: string;
  notesFromPreviousStage?: KanbanCard["notes"];
};

type CardPatch = {
  title?: string;
  description?: string;
  priority?: Priority;
  clientEmail?: string;
};

type KanbanState = {
  columns: KanbanColumn[];
  moveCard: (activeId: string, overId: string) => MoveResult;
  addCard: (input: NewKanbanCardInput) => string;
  addNote: (cardId: string, columnId: string, content: string) => void;
  updateCard: (cardId: string, patch: CardPatch) => void;
  findCard: (cardId: string) => { card: KanbanCard; column: KanbanColumn } | null;
};

function cloneInitialColumns() {
  return structuredClone(initialColumns);
}

function findColumnByCard(columns: KanbanColumn[], cardId: string) {
  return columns.find((column) => column.cards.some((card) => card.id === cardId));
}

function findColumnByOverId(columns: KanbanColumn[], overId: string) {
  return (
    columns.find((column) => column.id === overId) ??
    columns.find((column) => column.cards.some((card) => card.id === overId))
  );
}

function recount(column: KanbanColumn) {
  return {
    ...column,
    count: column.cards.length,
  };
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      columns: cloneInitialColumns(),
      addCard: (input) => {
        const cardId = crypto.randomUUID();
        const now = new Date().toISOString();
        const newCard: KanbanCard = {
          id: cardId,
          priority: input.priority,
          title: input.title.trim() || "Novo projeto",
          description: input.description.trim() || "Sem descrição informada.",
          clientEmail: input.clientEmail.trim(),
          assignees: input.assignees,
          comments: 0,
          checks: 0,
          notes: [
            {
              id: crypto.randomUUID(),
              cardId,
              columnId: input.columnId,
              content: "Card criado durante a validação local do fluxo.",
              createdAt: now,
              author: "Cesar Junior",
            },
          ],
        };

        set({
          columns: get().columns.map((column) =>
            column.id === input.columnId
              ? recount({ ...column, cards: [newCard, ...column.cards] })
              : column,
          ),
        });

        return cardId;
      },
      moveCard: (activeId, overId) => {
        const columns = get().columns;
        const fromColumn = findColumnByCard(columns, activeId);
        const toColumn = findColumnByOverId(columns, overId);

        if (!fromColumn || !toColumn) {
          return { moved: false, changedColumn: false };
        }

        const activeCard = fromColumn.cards.find((card) => card.id === activeId);
        if (!activeCard) {
          return { moved: false, changedColumn: false };
        }

        const fromIndex = fromColumn.cards.findIndex((card) => card.id === activeId);
        const overCardIndex = toColumn.cards.findIndex((card) => card.id === overId);
        const toIndex = overCardIndex >= 0 ? overCardIndex : toColumn.cards.length;

        if (fromColumn.id === toColumn.id) {
          if (fromIndex === toIndex || fromIndex < 0) {
            return { moved: false, changedColumn: false };
          }

          set({
            columns: columns.map((column) =>
              column.id === fromColumn.id
                ? recount({ ...column, cards: arrayMove(column.cards, fromIndex, toIndex) })
                : column,
            ),
          });

          return { moved: true, changedColumn: false, cardTitle: activeCard.title };
        }

        set({
          columns: columns.map((column) => {
            if (column.id === fromColumn.id) {
              return recount({
                ...column,
                cards: column.cards.filter((card) => card.id !== activeId),
              });
            }

            if (column.id === toColumn.id) {
              const nextCards = [...column.cards];
              nextCards.splice(toIndex, 0, activeCard);
              return recount({ ...column, cards: nextCards });
            }

            return column;
          }),
        });

        return {
          moved: true,
          changedColumn: true,
          fromColumnId: fromColumn.id,
          fromColumnTitle: fromColumn.title,
          toColumnId: toColumn.id,
          toColumnTitle: toColumn.title,
          clientEmail: activeCard.clientEmail,
          cardTitle: activeCard.title,
          notesFromPreviousStage: activeCard.notes.filter(
            (note) => note.columnId === fromColumn.id,
          ),
        };
      },
      addNote: (cardId, columnId, content) => {
        const text = content.trim();
        if (!text) return;

        set({
          columns: get().columns.map((column) => ({
            ...column,
            cards: column.cards.map((card) =>
              card.id === cardId
                ? {
                    ...card,
                    notes: [
                      ...card.notes,
                      {
                        id: crypto.randomUUID(),
                        cardId,
                        columnId,
                        content: text,
                        createdAt: new Date().toISOString(),
                        author: "Cesar Junior",
                      },
                    ],
                  }
                : card,
            ),
          })),
        });
      },
      updateCard: (cardId, patch) => {
        set({
          columns: get().columns.map((column) => ({
            ...column,
            cards: column.cards.map((card) =>
              card.id === cardId ? { ...card, ...patch } : card,
            ),
          })),
        });
      },
      findCard: (cardId) => {
        for (const column of get().columns) {
          const card = column.cards.find((item) => item.id === cardId);
          if (card) return { card, column };
        }

        return null;
      },
    }),
    {
      name: "slothui-kanban-board-phase-3",
      partialize: (state) => ({ columns: state.columns }),
    },
  ),
);
